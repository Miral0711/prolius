import { useEffect, useRef, useState, useMemo } from 'react';
import {
  Search,
  Send,
  Smile,
  Paperclip,
  Phone,
  Video,
  User,
  Users,
  Bus,
  MapPin,
  Clock,
  Shield,
  FileText,
  Check,
  CheckCheck,
  Filter,
  Settings,
  Info,
  ExternalLink,
  Plus,
  Bell,
} from 'lucide-react';
import { PageShell } from '@/components/ui/page-shell';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toAbsoluteUrl } from '@/lib/helpers';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PageSurface } from '@/components/layout';

/* ═══════════════════════════════════════════════════════════════
   1. TYPES & MOCK DATA
   ═══════════════════════════════════════════════════════════════ */

type MessageType = 'text' | 'file' | 'image' | 'system';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  type: MessageType;
  status: 'sent' | 'delivered' | 'read';
  isMe: boolean;
  fileName?: string;
  fileSize?: string;
  imageUrl?: string;
  context?: {
    vehicle?: string;
    route?: string;
    alert?: string;
    shift?: string;
  };
}

interface Participant {
  id: string;
  name: string;
  role: 'Driver' | 'Dispatcher' | 'Manager' | 'System';
  avatar?: string;
  status: 'Online' | 'Offline' | 'On Route' | 'Resting';
  vehicle?: string;
  route?: string;
  lastSeen?: string;
  phone?: string;
  email?: string;
}

interface Chat {
  id: string;
  name: string;
  type: 'individual' | 'group';
  participants: Participant[];
  lastMessage?: string;
  lastTime?: string;
  unreadCount: number;
  avatar?: string;
  status?: string;
}

const MOCK_PARTICIPANTS: Record<string, Participant> = {
  '1': { id: '1', name: 'Zaid Al-Habibi', role: 'Driver', status: 'On Route', vehicle: 'KSA-1029', route: 'R-402 (Main Port)', phone: '+966 50 123 4567', lastSeen: 'Active now' },
  '2': { id: '2', name: 'Omar Farooq', role: 'Dispatcher', status: 'Online', lastSeen: 'Active now' },
  '3': { id: '3', name: 'Sarah Mitchell', role: 'Driver', status: 'Resting', vehicle: 'KSA-5562', lastSeen: '12m ago' },
  '4': { id: '4', name: 'Fleet Ops Central', role: 'System', status: 'Online' },
  '5': { id: '5', name: 'Ahmed Hassan', role: 'Driver', status: 'On Route', vehicle: 'KSA-2041', route: 'R-101 (Airport)', phone: '+966 50 987 6543', lastSeen: 'Active now' },
  '6': { id: '6', name: 'Fatima Noor', role: 'Manager', status: 'Online', lastSeen: 'Active now' },
  '7': { id: '7', name: 'Kevin Durant', role: 'Driver', status: 'Offline', vehicle: 'KSA-9912', lastSeen: '1h ago' },
  '8': { id: '8', name: 'Marcus Wong', role: 'Driver', status: 'On Route', vehicle: 'KSA-7723', route: 'R-305 (Industrial)', lastSeen: '5m ago' },
  '9': { id: '9', name: 'Leila Sadat', role: 'Dispatcher', status: 'Online', lastSeen: 'Active now' },
  '10': { id: '10', name: 'John Doe', role: 'Driver', status: 'Resting', vehicle: 'KSA-1122', lastSeen: '3h ago' },
};

const MOCK_CHATS: Chat[] = [
  {
    id: 'c1',
    name: 'Zaid Al-Habibi',
    type: 'individual',
    participants: [MOCK_PARTICIPANTS['1']],
    lastMessage: 'I have arrived at the checkpoint.',
    lastTime: '10:45 AM',
    unreadCount: 2,
    avatar: '/media/avatars/300-1.png',
  },
  {
    id: 'c2',
    name: 'Morning Shift Ops',
    type: 'group',
    participants: [MOCK_PARTICIPANTS['1'], MOCK_PARTICIPANTS['2'], MOCK_PARTICIPANTS['3']],
    lastMessage: 'All drivers check in before 08:00.',
    lastTime: '08:12 AM',
    unreadCount: 0,
    status: '12 Members',
  },
  {
    id: 'c5',
    name: 'Ahmed Hassan',
    type: 'individual',
    participants: [MOCK_PARTICIPANTS['5']],
    lastMessage: 'Fueling station 4 is currently closed.',
    lastTime: '11:55 AM',
    unreadCount: 1,
    avatar: '/media/avatars/300-4.png',
  },
  {
    id: 'c6',
    name: 'Technical Support',
    type: 'group',
    participants: [MOCK_PARTICIPANTS['2'], MOCK_PARTICIPANTS['4']],
    lastMessage: 'Update: Server maintenance at 02:00 AM.',
    lastTime: '12:30 PM',
    unreadCount: 0,
    status: '5 Members',
  },
  {
    id: 'c3',
    name: 'Sarah Mitchell',
    type: 'individual',
    participants: [MOCK_PARTICIPANTS['3']],
    lastMessage: 'Vehicle inspection complete.',
    lastTime: 'Yesterday',
    unreadCount: 0,
    avatar: '/media/avatars/300-2.png',
  },
  {
    id: 'c4',
    name: 'Emergency Dispatch',
    type: 'group',
    participants: [MOCK_PARTICIPANTS['2'], MOCK_PARTICIPANTS['4']],
    lastMessage: 'System: Heavy traffic on King Fahd Hwy.',
    lastTime: '2h ago',
    unreadCount: 5,
  },
  {
    id: 'c7',
    name: 'Fatima Noor',
    type: 'individual',
    participants: [MOCK_PARTICIPANTS['6']],
    lastMessage: 'Please review the weekly shift schedule.',
    lastTime: '09:15 AM',
    unreadCount: 0,
    avatar: '/media/avatars/300-6.png',
  },
  {
    id: 'c8',
    name: 'Marcus Wong',
    type: 'individual',
    participants: [MOCK_PARTICIPANTS['8']],
    lastMessage: 'Tire pressure is low on KSA-7723.',
    lastTime: '10:10 AM',
    unreadCount: 3,
    avatar: '/media/avatars/300-11.png',
  },
  {
    id: 'c9',
    name: 'Depot Gamma Ops',
    type: 'group',
    participants: [MOCK_PARTICIPANTS['9'], MOCK_PARTICIPANTS['10']],
    lastMessage: 'New route assignments are live.',
    lastTime: '11:05 AM',
    unreadCount: 0,
    status: '24 Members',
  },
  {
    id: 'c10',
    name: 'Leila Sadat',
    type: 'individual',
    participants: [MOCK_PARTICIPANTS['9']],
    lastMessage: 'R-305 tracking is now active.',
    lastTime: '12:15 PM',
    unreadCount: 0,
    avatar: '/media/avatars/300-9.png',
  },
  {
    id: 'c11',
    name: 'Kevin Durant',
    type: 'individual',
    participants: [MOCK_PARTICIPANTS['7']],
    lastMessage: 'Off-duty for the next 48 hours.',
    lastTime: '3h ago',
    unreadCount: 0,
    avatar: '/media/avatars/300-20.png',
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  'c1': [
    { id: 'm1', senderId: '1', senderName: 'Zaid Al-Habibi', text: 'Good morning. Starting route R-402 now.', time: '09:12 AM', type: 'text', status: 'read', isMe: false },
    { id: 'm2', senderId: 'me', senderName: 'Admin', text: 'Acknowleged. Traffic is light on the bridge.', time: '09:15 AM', type: 'text', status: 'read', isMe: true },
    { id: 'm3', senderId: '1', senderName: 'Zaid Al-Habibi', text: 'Checking fuel level...', time: '09:45 AM', type: 'text', status: 'read', isMe: false },
    { id: 'm4', senderId: '1', senderName: 'Zaid Al-Habibi', text: 'fuel_report_ksa1029.pdf', time: '09:46 AM', type: 'file', status: 'read', isMe: false, fileName: 'fuel_report_ksa1029.pdf', fileSize: '1.2 MB' },
    { id: 's1', senderId: 'system', senderName: 'System', text: 'Vehicle KSA-1029 entered geofence: Port Area', time: '10:05 AM', type: 'system', status: 'read', isMe: false },
    { id: 'm5', senderId: '1', senderName: 'Zaid Al-Habibi', text: 'I have arrived at the checkpoint.', time: '10:45 AM', type: 'text', status: 'delivered', isMe: false, context: { vehicle: 'KSA-1029', route: 'R-402' } },
  ],
  'c2': [
    { id: 'm1', senderId: '2', senderName: 'Omar Farooq', text: 'Morning everyone. Weather is clear for shifts.', time: '07:30 AM', type: 'text', status: 'read', isMe: false, context: { shift: 'Day' } },
    { id: 'm2', senderId: '3', senderName: 'Sarah Mitchell', text: 'KSA-5562 ready at depot.', time: '07:45 AM', type: 'text', status: 'read', isMe: false, context: { vehicle: 'KSA-5562' } },
    { id: 'm3', senderId: '2', senderName: 'Omar Farooq', text: 'All drivers check in before 08:00.', time: '08:12 AM', type: 'text', status: 'read', isMe: false },
  ]
};

/* ═══════════════════════════════════════════════════════════════
   2. REUSABLE SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function PanelHeader({ title, icon: Icon, action }: { title: string; icon?: any; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-blue-500" />}
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{title}</h3>
      </div>
      {action}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   3. MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ChatPage() {
  const [activeChatId, setActiveChatId] = useState<string>('c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = useMemo(() => MOCK_CHATS.find(c => c.id === activeChatId), [activeChatId]);
  const messages = useMemo(() => MOCK_MESSAGES[activeChatId] || [], [activeChatId]);
  
  const filteredChats = useMemo(() => {
    return MOCK_CHATS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChatId, messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setMessageInput('');
  };

  return (
    <PageShell
      title="Chat Interface"
      hideTitle={true}
      className="max-w-none flex h-full min-h-0 flex-1 flex-col space-y-0 overflow-hidden 2xl:max-w-none pt-0 pb-0"
      contentWrapperClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-0"
    >
      <PageSurface padding="md" fill sectionGap="md">
        <PageSurface.Body className="min-h-0 flex-1 overflow-hidden">
      <div className={cn(
        "grid h-full min-h-0 flex-1 gap-4 overflow-hidden transition-all duration-300",
        rightPanelVisible ? "grid-cols-[270px_1fr_300px]" : "grid-cols-[270px_1fr]"
      )}>
        
        {/* ── LEFT PANEL: CONVERSATIONS ───────────────────────────── */}
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden p-0 border border-slate-200 shadow-sm bg-white rounded-xl">
            {/* Search & Tabs */}
            <div className="p-2 border-b border-slate-100 bg-white/40">
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Search..."
                  className="w-full h-8 pl-8 pr-8 bg-white/50 border-slate-100/60 rounded-lg focus:ring-1 focus:ring-blue-100 shadow-none transition-all text-xs font-semibold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors">
                  <Filter className="h-3 w-3" />
                </button>
              </div>
              
              <div className="flex gap-1 p-1 bg-slate-900/5 rounded-md overflow-x-auto scrollbar-none">
                {['All', 'Unread', 'Drivers', 'Fleet Ops'].map((tab) => (
                  <button
                    key={tab}
                    className={cn(
                      "px-2 py-1 text-[9px] font-semibold uppercase tracking-wider rounded-lg transition-all flex-1 whitespace-nowrap",
                      tab === 'All' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:bg-white/40"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin hover:scrollbar-thumb-slate-200 transition-colors px-1 py-1">
              <div className="space-y-0.5">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={cn(
                      "group w-full flex items-center gap-2 px-2 py-1 rounded-lg transition-all relative overflow-hidden",
                      activeChatId === chat.id 
                        ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-slate-100" 
                        : "hover:bg-white/40 text-slate-700"
                    )}
                  >
                    {/* Active Highlight Border */}
                    {activeChatId === chat.id && (
                      <div className="absolute top-2 bottom-2 left-0 w-1 bg-blue-600 rounded-r-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                    )}
 
                    <div className="relative shrink-0">
                      <div className={cn(
                        "h-8.5 w-8.5 rounded-lg flex items-center justify-center border overflow-hidden bg-slate-100",
                        activeChatId === chat.id ? "border-blue-100" : "border-white"
                      )}>
                        {chat.avatar ? (
                          <img src={toAbsoluteUrl(chat.avatar)} className="h-full w-full object-cover" alt="" />
                        ) : (
                          chat.type === 'group' ? <Users className="h-4 w-4 text-slate-400" /> : <User className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      {chat.participants[0]?.status === 'Online' && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-white shadow-sm" />
                      )}
                    </div>
 
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col min-w-0">
                          <span className={cn(
                            "text-[11px] font-semibold truncate leading-tight",
                            activeChatId === chat.id ? "text-blue-700" : "text-slate-800"
                          )}>{chat.name}</span>
                          <span className="text-[7.5px] font-semibold text-slate-400 uppercase tracking-tighter leading-none">
                            {chat.type === 'group' ? 'Operations' : chat.participants[0]?.role}
                          </span>
                        </div>
                        <span className="text-[7.5px] font-semibold text-slate-300 uppercase tracking-tighter shrink-0 mt-0.5">
                          {chat.lastTime}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span className={cn(
                          "text-[9.5px] font-medium truncate leading-none max-w-[140px]",
                          activeChatId === chat.id ? "text-blue-600/80" : "text-slate-500"
                        )}>
                          {chat.lastMessage}
                        </span>
                        {chat.unreadCount > 0 && (
                          <span className="bg-blue-600 text-white text-[7px] font-semibold h-3 min-w-[12px] px-1 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-3 bg-white/10 border-t border-white/40">
              <Button variant="ghost" className="w-full bg-white/40 hover:bg-white text-blue-600 border border-white/60 rounded-sm h-8 font-semibold uppercase tracking-wider text-[9px] shadow-sm gap-2 transition-all">
                <Plus className="h-3 w-3" />
                New Conversation
              </Button>
            </div>
          </div>
        </div>

        {/* ── CENTER PANEL: MESSAGING ──────────────────────────────── */}
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden p-0 border border-slate-200 shadow-sm relative bg-white rounded-xl">
            
            {/* Chat Header */}
            <div className="px-4 py-1.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-8.5 w-8.5 rounded-lg bg-white flex items-center justify-center border border-slate-100 shrink-0 shadow-sm relative overflow-hidden">
                  {activeChat?.avatar ? (
                    <img src={toAbsoluteUrl(activeChat.avatar)} className="h-full w-full object-cover" alt="" />
                  ) : (
                    activeChat?.type === 'group' ? <Users className="h-4.5 w-4.5 text-blue-500" /> : <User className="h-4.5 w-4.5 text-blue-500" />
                  )}
                  {activeChat?.type !== 'group' && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-[13px] font-semibold text-slate-800 uppercase tracking-wide leading-none">{activeChat?.name}</h4>
                    <div className="flex items-center gap-1">
                      {activeChat?.type === 'group' ? (
                        <>
                          <span className="px-1.5 py-0.5 bg-blue-50/50 text-blue-600 text-[8px] font-semibold rounded border border-blue-100 uppercase tracking-widest leading-none">DRIVERS: 12</span>
                          <span className="px-1.5 py-0.5 bg-emerald-50/50 text-emerald-600 text-[8px] font-semibold rounded border border-emerald-100 uppercase tracking-widest leading-none">ACTIVE: 9</span>
                        </>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-emerald-50/50 text-emerald-600 text-[8px] font-semibold rounded border border-emerald-100 uppercase tracking-widest leading-none">ON ROUTE</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-semibold text-slate-400/80 uppercase tracking-tighter flex items-center gap-1.5">
                      {activeChat?.type === 'group' ? (
                         <>
                           <Shield className="h-3 w-3 text-slate-400" /> 
                           Shift: 06:00 - 14:00 • Central Ops
                         </>
                      ) : (
                         <>
                           <Bus className="h-3 w-3 text-slate-400" /> 
                           Vehicle: {activeChat?.participants[0]?.vehicle} • Route: {activeChat?.participants[0]?.route?.split(' ')[0]}
                         </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2">
                <TooltipProvider>
                  {[
                    { icon: Phone, color: 'blue', label: 'Call' },
                    { icon: Video, color: 'emerald', label: 'Video' },
                    { icon: Search, color: 'slate', label: 'Search' },
                  ].map((btn, i) => (
                    <Tooltip key={i} delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className={cn(
                          "h-8.5 w-8.5 rounded-lg transition-all",
                          btn.color === 'blue' && "text-blue-600 hover:bg-blue-50 hover:border-blue-100",
                          btn.color === 'emerald' && "text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100",
                          btn.color === 'slate' && "text-slate-500 hover:bg-slate-100 hover:border-slate-200",
                        )}>
                          <btn.icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="font-medium text-[10px] bg-slate-900 border-none capitalize">{btn.label}</TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
                <div className="h-6 w-px bg-slate-200 mx-1" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-8.5 w-8.5 rounded-lg text-slate-500 transition-all", !rightPanelVisible ? "bg-slate-100 text-blue-600 border-slate-200" : "hover:bg-slate-50")}
                  onClick={() => setRightPanelVisible(!rightPanelVisible)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-slate-200"
            >
              {messages.map((msg, idx) => {
                const prevMsg = idx > 0 ? messages[idx - 1] : null;
                const isSameSender = prevMsg?.senderId === msg.senderId;
                
                if (msg.type === 'system') {
                  return (
                    <div key={msg.id} className="flex justify-center my-4">
                      <div className="px-3 py-1 bg-slate-100/50 backdrop-blur-md rounded-full border border-slate-200/30">
                         <span className="text-[7.5px] font-semibold text-slate-400 uppercase tracking-[0.2em]">{msg.text} • {msg.time}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={cn(
                    "flex gap-2 max-w-[70%] group animate-in fade-in slide-in-from-bottom-1 duration-300",
                    msg.isMe ? "ml-auto flex-row-reverse" : "flex-row",
                    isSameSender ? "mt-0.5" : "mt-2.5"
                  )}>
                    {/* Message Avatar (Incoming Cluster) */}
                    {!msg.isMe && (
                      <div className={cn(
                        "h-7.5 w-7.5 rounded-lg border border-white bg-white shadow-sm shrink-0 mt-auto overflow-hidden",
                        isSameSender ? "opacity-0" : "opacity-100"
                      )}>
                         {activeChat?.participants.find(p => p.id === msg.senderId)?.avatar ? (
                            <img src={toAbsoluteUrl(activeChat?.participants.find(p => p.id === msg.senderId)?.avatar || '')} alt="" className="h-full w-full object-cover" />
                         ) : (
                            <div className="h-full w-full bg-blue-50 flex items-center justify-center text-[9px] font-semibold text-blue-500 uppercase">{msg.senderName.slice(0,2)}</div>
                         )}
                      </div>
                    )}

                    <div className={cn(
                      "flex flex-col min-w-0",
                      msg.isMe ? "items-end" : "items-start"
                    )}>
                      {/* Sender Name & Details (Group Chat) */}
                      {!msg.isMe && activeChat?.type === 'group' && (
                        <div className="flex items-center gap-2 ml-1 mb-1">
                          <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-tighter">{msg.senderName}</span>
                          <span className="text-[8px] font-medium text-slate-400 uppercase tracking-widest">{activeChat?.participants.find(p => p.id === msg.senderId)?.role}</span>
                        </div>
                      )}

                      {/* Context Chips (Fleet Context) */}
                      {msg.context && (
                        <div className="flex flex-wrap gap-1 mb-1.5 ml-0.5">
                           {msg.context.vehicle && (
                             <span className="px-2 py-0.5 bg-blue-600/5 text-blue-600 text-[8px] font-semibold border border-blue-600/10 rounded-md uppercase tracking-tight shadow-sm flex items-center gap-1">
                               <Bus className="h-2.5 w-2.5" /> {msg.context.vehicle}
                             </span>
                           )}
                           {msg.context.shift && (
                             <span className="px-2 py-0.5 bg-emerald-600/5 text-emerald-600 text-[8px] font-semibold border border-emerald-600/10 rounded-md uppercase tracking-tight shadow-sm flex items-center gap-1">
                               <Clock className="h-2.5 w-2.5" /> {msg.context.shift} SHIFT
                             </span>
                           )}
                        </div>
                      )}

                      <div className={cn(
                        "relative px-3 py-2 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md",
                        msg.isMe 
                          ? "bg-blue-600/10 border-blue-500/20 text-slate-800 rounded-tr-sm" 
                          : "bg-white border-slate-100/80 text-slate-700 rounded-tl-sm shadow-black/5"
                      )}>
                        {/* Message Content */}
                        {msg.type === 'text' && (
                          <p className="text-[13px] font-medium leading-[1.6] antialiased">{msg.text}</p>
                        )}

                        {msg.type === 'file' && (
                          <div className="flex items-center gap-4 py-0.5 min-w-[200px]">
                            <div className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border",
                              msg.isMe ? "bg-blue-600/10 border-blue-200/20 text-blue-600" : "bg-slate-50 border-slate-100 text-slate-500"
                            )}>
                               <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="text-[12px] font-semibold truncate text-slate-800">{msg.fileName}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-medium text-slate-400 uppercase">{msg.fileSize}</span>
                                <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                                <span className="text-[9px] font-medium text-blue-600 uppercase cursor-pointer hover:underline">Download</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0 text-slate-400 hover:text-blue-600 hover:bg-white transition-all">
                               <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        {/* Details Row */}
                        <div className={cn(
                          "mt-1.5 flex items-center gap-1.5",
                          msg.isMe ? "justify-end" : "justify-start"
                        )}>
                          <span className={cn(
                            "text-[8px] font-semibold uppercase tracking-widest opacity-60",
                            msg.isMe ? "text-blue-600" : "text-slate-400"
                          )}>{msg.time}</span>
                          {msg.isMe && (
                            <div className="flex items-center">
                              {msg.status === 'read' 
                                ? <CheckCheck className="h-3 w-3 text-blue-600" /> 
                                : <Check className="h-3 w-3 text-blue-400" />
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="p-2 bg-white border-t border-slate-200 relative z-20">
              <div className="relative group">
                <div className="flex-1 flex items-center gap-1.5 bg-white border border-slate-200 shadow-md rounded-md overflow-hidden p-1.5 min-h-0">
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm text-slate-400 hover:bg-white hover:text-blue-600 transition-all shrink-0">
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                  <Input 
                    placeholder={`Write a message...`}
                    className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 placeholder:text-slate-400 font-normal text-[12px] h-7"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <div className="flex items-center gap-0.5 shrink-0 pr-0.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm text-slate-400 hover:bg-white hover:text-blue-600 transition-all">
                      <Smile className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm text-slate-400 hover:bg-white hover:text-blue-600 transition-all">
                      <Paperclip className="h-3.5 w-3.5" />
                    </Button>
                    <div className="w-px h-3.5 bg-slate-200 mx-1" />
                    <Button 
                      onClick={handleSendMessage}
                      size="sm"
                      className="h-7 px-4 rounded-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 text-[11px] font-medium gap-2"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Quick Fleet Actions Strip */}
              <div className="flex items-center gap-1.5 mt-2 px-0.5 overflow-x-auto scrollbar-none">
                {[
                  { label: 'Location', icon: MapPin },
                  { label: 'Fuel Request', icon: Bus },
                  { label: 'Share Route', icon: ExternalLink },
                  { label: 'Alert Ops', icon: Bell }
                ].map((act, i) => (
                  <button key={i} className="flex items-center gap-1 px-2 py-0.5 bg-white/60 hover:bg-white rounded-md border border-slate-100 text-[7.5px] font-semibold uppercase tracking-widest text-slate-500 transition-all whitespace-nowrap shadow-sm">
                    <act.icon className="h-2 w-2 text-blue-500" />
                    {act.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          </div>
        </div>

        {/* ── RIGHT PANEL: DETAILS ───────────────────────────────── */}
        {rightPanelVisible && (
          <div className="flex flex-col h-full overflow-hidden animate-in slide-in-from-right-4 duration-300 bg-white border border-slate-200 shadow-sm rounded-xl">
            <div className="flex flex-col h-full">
              
              {/* Top Section */}
              <div className="space-y-4 shrink-0">
                {/* Profile Card Section */}
                <div className="p-4 relative border-b border-slate-100">
                  <div className="absolute -top-10 -right-10 h-32 w-32 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="relative mb-3">
                      <div className="h-14 w-14 rounded-lg border border-slate-100 p-0.5 shadow-sm bg-white">
                        {activeChat?.avatar ? (
                          <img src={toAbsoluteUrl(activeChat.avatar)} className="h-full w-full rounded-lg object-cover" alt="" />
                        ) : (
                          <div className="h-full w-full rounded-lg bg-slate-50 flex items-center justify-center">
                            <User className="h-6 w-6 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-slate-800 leading-tight mb-1 uppercase tracking-tight">{activeChat?.name}</h3>
                    <div className="flex flex-col items-center gap-0.5 mb-4">
                      <span className="text-[9px] font-semibold text-blue-600 uppercase tracking-widest">{activeChat?.participants[0]?.role || 'Operations'}</span>
                      <span className="text-[8px] font-medium text-slate-500 tracking-tight">{activeChat?.participants[0]?.lastSeen || 'Active Now'}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 w-full">
                      {[
                        { icon: Phone, label: 'Call', color: 'blue' },
                        { icon: Video, label: 'Video', color: 'emerald' },
                        { icon: MapPin, label: 'Track', color: 'rose' },
                        { icon: Settings, label: 'Ops', color: 'slate' }
                      ].map((btn, i) => (
                        <button key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all active:scale-95 group">
                          <btn.icon className={cn(
                            "h-3.5 w-3.5 transition-colors",
                            btn.color === 'blue' && "text-blue-500",
                            btn.color === 'emerald' && "text-emerald-500",
                            btn.color === 'rose' && "text-rose-500",
                            btn.color === 'slate' && "text-slate-500",
                          )} />
                          <span className="text-[7.5px] font-semibold uppercase tracking-tighter text-slate-500 group-hover:text-slate-800">{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fleet Context Section (Expanding) */}
              <div className="flex-1 min-h-0 p-4 border-b border-slate-100">
                <PanelHeader title="Fleet Context" icon={Shield} />
                <div className="space-y-3 mt-1">
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-50 text-center">
                    <div className="flex flex-col">
                      <span className="text-[7px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Asset</span>
                      <div className="flex items-center justify-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100">
                        <Bus className="h-3 w-3 text-blue-500" />
                        <span className="text-[10px] font-semibold text-slate-800 leading-none">{activeChat?.participants[0]?.vehicle || 'HQ-01'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col border-s border-slate-100 pl-3">
                      <span className="text-[7px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Status</span>
                      <div className="inline-flex items-center justify-center px-2 py-1 rounded-lg text-[9px] font-semibold uppercase leading-none bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                        {activeChat?.participants[0]?.status === 'On Route' ? 'ACTIVE' : 'ON-DUTY'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-[7px] font-semibold text-slate-500 uppercase tracking-widest mb-2 px-1">Current Assignment</span>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-sm transition-all">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-sm flex items-center justify-center text-blue-600 bg-white border border-slate-100 shadow-sm">
                          <MapPin className="h-3 w-3" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-semibold text-slate-800 leading-none mb-1 truncate">{activeChat?.participants[0]?.route || 'Admin Depot'}</span>
                          <span className="text-[8px] font-medium text-slate-500 tracking-tight leading-none">ETA: 8m</span>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Command Center (Bottom Section) */}
              <div className="mt-auto p-4 shrink-0 bg-slate-50/30">
                <PanelHeader title="Command Center" icon={Settings} />
                <div className="space-y-3 mt-3">
                  {[
                    { label: 'Live Tracking', icon: MapPin, color: 'blue' },
                    { label: 'Assign Task', icon: Shield, color: 'emerald' },
                    { label: 'Broadcast Alert', icon: Bell, color: 'rose' }
                  ].map((btn, i) => (
                    <Button key={i} variant="ghost" className="w-full justify-start gap-3 h-11 px-3 rounded-lg border border-transparent hover:border-slate-100 hover:bg-white text-[10px] font-semibold uppercase tracking-tight text-slate-600 transition-all group shadow-sm">
                      <btn.icon className={cn(
                        "h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100",
                        btn.color === 'blue' && "text-blue-600",
                        btn.color === 'emerald' && "text-emerald-700",
                        btn.color === 'rose' && "text-rose-600",
                      )} />
                      {btn.label}
                    </Button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
