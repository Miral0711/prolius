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
import { typography } from '@/lib/typography';
import { toAbsoluteUrl } from '@/lib/helpers';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';

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
        {Icon && <Icon className="h-4 w-4 text-[#2e5f8a]" />}
        <h3 className={typography.sectionTitle}>{title}</h3>
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
      <PageSurface padding={PAGE_SURFACE_FOOTER_PADDING} fill sectionGap="none">
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
                  className={cn(
                    'h-8 w-full rounded-lg border-slate-100/60 bg-white/50 pl-8 pr-8 shadow-none transition-all placeholder:text-gray-400 focus:ring-1 focus:ring-blue-100',
                    typography.chatComposerInput,
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2e5f8a] transition-colors">
                  <Filter className="h-3 w-3" />
                </button>
              </div>
              
              <div className="flex gap-1 p-1 bg-slate-900/5 rounded-md overflow-x-auto scrollbar-none">
                {['All', 'Unread', 'Drivers', 'Fleet Ops'].map((tab) => (
                  <button
                    key={tab}
                    className={cn(
                      'flex-1 whitespace-nowrap rounded-lg px-2 py-1 transition-all',
                      typography.chatActionLabel,
                      tab === 'All' ? 'bg-white text-[#2e5f8a] shadow-sm' : 'text-gray-500 hover:bg-white/40',
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
                        : "hover:bg-white/40 text-gray-600"
                    )}
                  >
                    {/* Active Highlight Border */}
                    {activeChatId === chat.id && (
                      <div className="absolute top-2 bottom-2 left-0 w-1 bg-[#2e5f8a] rounded-r-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                    )}
 
                    <div className="relative shrink-0">
                      <div className={cn(
                        "h-8.5 w-8.5 rounded-lg flex items-center justify-center border overflow-hidden bg-slate-100",
                        activeChatId === chat.id ? "border-[#dcedf8]" : "border-white"
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
                        <div className="flex min-w-0 flex-col">
                          <span
                            className={cn(typography.chatConversationName, 'truncate')}
                          >
                            {chat.name}
                          </span>
                          <span
                            className={cn(
                              typography.chatRoleLabel,
                              'uppercase leading-none',
                            )}
                          >
                            {chat.type === 'group'
                              ? 'Operations'
                              : chat.participants[0]?.role}
                          </span>
                        </div>
                        <span
                          className={cn(
                            typography.chatTimestamp,
                            'mt-0.5 shrink-0',
                          )}
                        >
                          {chat.lastTime}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            typography.chatSidebarPreview,
                            'max-w-[140px] truncate',
                          )}
                        >
                          {chat.lastMessage}
                        </span>
                        {chat.unreadCount > 0 && (
                          <span className="flex h-3 min-w-[12px] shrink-0 items-center justify-center rounded-full bg-[#2e5f8a] px-1 text-xs font-normal tabular-nums text-white shadow-sm shadow-[#2e5f8a]/20">
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
              <Button
                variant="ghost"
                className={cn(
                  'h-8 w-full gap-2 rounded-sm border border-white/60 bg-white/40 text-[#2e5f8a] shadow-sm transition-all hover:bg-white',
                  typography.chatActionLabel,
                )}
              >
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
                    activeChat?.type === 'group' ? <Users className="h-4.5 w-4.5 text-[#2e5f8a]" /> : <User className="h-4.5 w-4.5 text-[#2e5f8a]" />
                  )}
                  {activeChat?.type !== 'group' && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  )}
                </div>
                <div>
                  <div className="mb-0.5 flex items-center gap-2">
                    <h4 className={cn(typography.chatConversationName, 'truncate')}>
                      {activeChat?.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      {activeChat?.type === 'group' ? (
                        <>
                          <span
                            className={cn(
                              typography.chatTag,
                              'rounded border border-[#dcedf8] bg-[#e8f0f8]/50 px-1.5 py-0.5 uppercase leading-none text-[#2e5f8a]',
                            )}
                          >
                            Drivers: 12
                          </span>
                          <span
                            className={cn(
                              typography.chatTag,
                              'rounded border border-emerald-100 bg-emerald-50/50 px-1.5 py-0.5 uppercase leading-none text-emerald-600',
                            )}
                          >
                            Active: 9
                          </span>
                        </>
                      ) : (
                        <span
                          className={cn(
                            typography.chatTag,
                            'rounded border border-emerald-100 bg-emerald-50/50 px-1.5 py-0.5 uppercase leading-none text-emerald-600',
                          )}
                        >
                          On route
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={cn(
                        typography.chatRoleLabel,
                        'flex items-center gap-1.5 normal-case',
                      )}
                    >
                      {activeChat?.type === 'group' ? (
                         <>
                           <Shield className="h-3 w-3 shrink-0 text-gray-400" />
                           Shift: 06:00 - 14:00 • Central Ops
                         </>
                      ) : (
                         <>
                           <Bus className="h-3 w-3 shrink-0 text-gray-400" />
                           Vehicle: {activeChat?.participants[0]?.vehicle} • Route:{' '}
                           {activeChat?.participants[0]?.route?.split(' ')[0]}
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
                          btn.color === 'blue' && "text-[#2e5f8a] hover:bg-[#e8f0f8] hover:border-[#dcedf8]",
                          btn.color === 'emerald' && "text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100",
                          btn.color === 'slate' && "text-slate-500 hover:bg-slate-100 hover:border-slate-200",
                        )}>
                          <btn.icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        className={cn(
                          'border-none bg-slate-900 capitalize',
                          typography.chatActionLabel,
                          'text-white',
                        )}
                      >
                        {btn.label}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
                <div className="h-6 w-px bg-slate-200 mx-1" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-8.5 w-8.5 rounded-lg text-slate-500 transition-all", !rightPanelVisible ? "bg-slate-100 text-[#2e5f8a] border-slate-200" : "hover:bg-slate-50")}
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
                    <div key={msg.id} className="my-4 flex justify-center">
                      <div className="flex flex-wrap items-center justify-center gap-x-1 rounded-full border border-slate-200/30 bg-slate-100/50 px-3 py-1 text-center backdrop-blur-md">
                        <span className={typography.chatMessageBody}>{msg.text}</span>
                        <span className={typography.chatTimestamp}>• {msg.time}</span>
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
                            <div
                              className={cn(
                                'flex h-full w-full items-center justify-center bg-[#e8f0f8] uppercase text-[#2e5f8a]',
                                typography.chatActionLabel,
                              )}
                            >
                              {msg.senderName.slice(0, 2)}
                            </div>
                         )}
                      </div>
                    )}

                    <div className={cn(
                      "flex flex-col min-w-0",
                      msg.isMe ? "items-end" : "items-start"
                    )}>
                      {/* Sender Name & Details (Group Chat) */}
                      {!msg.isMe && activeChat?.type === 'group' && (
                        <div className="mb-1 ml-1 flex items-center gap-2">
                          <span className={typography.chatConversationName}>
                            {msg.senderName}
                          </span>
                          <span
                            className={cn(typography.chatRoleLabel, 'uppercase')}
                          >
                            {activeChat?.participants.find((p) => p.id === msg.senderId)?.role}
                          </span>
                        </div>
                      )}

                      {/* Context Chips (Fleet Context) */}
                      {msg.context && (
                        <div className="flex flex-wrap gap-1 mb-1.5 ml-0.5">
                           {msg.context.vehicle && (
                             <span
                               className={cn(
                                 typography.chatTag,
                                 'flex items-center gap-1 rounded-md border border-[#2e5f8a]/10 bg-[#2e5f8a]/5 px-2 py-0.5 uppercase text-[#2e5f8a] shadow-sm',
                               )}
                             >
                               <Bus className="h-2.5 w-2.5" /> {msg.context.vehicle}
                             </span>
                           )}
                           {msg.context.shift && (
                             <span
                               className={cn(
                                 typography.chatTag,
                                 'flex items-center gap-1 rounded-md border border-emerald-600/10 bg-emerald-600/5 px-2 py-0.5 uppercase text-emerald-600 shadow-sm',
                               )}
                             >
                               <Clock className="h-2.5 w-2.5" /> {msg.context.shift} Shift
                             </span>
                           )}
                        </div>
                      )}

                      <div className={cn(
                        "relative px-3 py-2 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md",
                        msg.isMe 
                          ? "bg-[#2e5f8a]/10 border-[#2e5f8a]/20 text-slate-800 rounded-tr-sm" 
                          : "bg-white border-slate-100/80 text-slate-700 rounded-tl-sm shadow-black/5"
                      )}>
                        {/* Message Content */}
                        {msg.type === 'text' && (
                          <p className={typography.chatMessageBody}>{msg.text}</p>
                        )}

                        {msg.type === 'file' && (
                          <div className="flex items-center gap-4 py-0.5 min-w-[200px]">
                            <div className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border",
                              msg.isMe ? "bg-[#2e5f8a]/10 border-[#d0e2f0]/20 text-[#2e5f8a]" : "bg-[#f4f8fb] border-slate-100 text-slate-500"
                            )}>
                               <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col">
                              <span
                                className={cn(
                                  typography.chatSidebarPreview,
                                  'truncate',
                                )}
                              >
                                {msg.fileName}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className={typography.chatTimestamp}>
                                  {msg.fileSize}
                                </span>
                                <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                                <button
                                  type="button"
                                  className={cn(
                                    typography.chatActionLabel,
                                    'cursor-pointer text-[#2e5f8a] hover:underline',
                                  )}
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0 text-slate-400 hover:text-[#2e5f8a] hover:bg-white transition-all">
                               <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        {/* Details Row */}
                        <div className={cn(
                          "mt-1.5 flex items-center gap-1.5",
                          msg.isMe ? "justify-end" : "justify-start"
                        )}>
                          <span className={typography.chatTimestamp}>
                            {msg.time}
                          </span>
                          {msg.isMe && (
                            <div className="flex items-center">
                              {msg.status === 'read' 
                                ? <CheckCheck className="h-3 w-3 text-[#2e5f8a]" /> 
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
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm text-slate-400 hover:bg-white hover:text-[#2e5f8a] transition-all shrink-0">
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                  <Input
                    placeholder="Write a message..."
                    className={cn(
                      'h-7 flex-1 border-none bg-transparent shadow-none placeholder:text-gray-400 focus-visible:ring-0',
                      typography.chatComposerInput,
                    )}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <div className="flex items-center gap-0.5 shrink-0 pr-0.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm text-slate-400 hover:bg-white hover:text-[#2e5f8a] transition-all">
                      <Smile className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm text-slate-400 hover:bg-white hover:text-[#2e5f8a] transition-all">
                      <Paperclip className="h-3.5 w-3.5" />
                    </Button>
                    <div className="w-px h-3.5 bg-slate-200 mx-1" />
                    <Button
                      onClick={handleSendMessage}
                      size="sm"
                      className={cn(
                        'h-7 gap-2 rounded-sm bg-[#2e5f8a] px-4 text-white shadow-md shadow-[#2e5f8a]/20 hover:bg-blue-700',
                        typography.chatActionLabel,
                      )}
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
                  <button
                    key={i}
                    className={cn(
                      'flex items-center gap-1 whitespace-nowrap rounded-md border border-slate-100 bg-white/60 px-2 py-0.5 text-gray-500 shadow-sm transition-all hover:bg-white',
                      typography.chatActionLabel,
                    )}
                  >
                    <act.icon className="h-2 w-2 text-[#2e5f8a]" />
                    {act.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2e5f8a]/5 rounded-full blur-[120px] pointer-events-none" />
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
                  <div className="absolute -top-10 -right-10 h-32 w-32 bg-[#2e5f8a]/5 rounded-full blur-3xl opacity-50" />
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="relative mb-3">
                      <div className="h-14 w-14 rounded-lg border border-slate-100 p-0.5 shadow-sm bg-white">
                        {activeChat?.avatar ? (
                          <img src={toAbsoluteUrl(activeChat.avatar)} className="h-full w-full rounded-lg object-cover" alt="" />
                        ) : (
                          <div className="h-full w-full rounded-lg bg-[#f4f8fb] flex items-center justify-center">
                            <User className="h-6 w-6 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                    </div>
                    <h3 className={cn(typography.chatConversationName, 'mb-1 truncate text-center')}>
                      {activeChat?.name}
                    </h3>
                    <div className="mb-4 flex flex-col items-center gap-0.5">
                      <span className={cn(typography.chatRoleLabel, 'uppercase')}>
                        {activeChat?.participants[0]?.role || 'Operations'}
                      </span>
                      <span className={typography.chatTimestamp}>
                        {activeChat?.participants[0]?.lastSeen || 'Active now'}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 w-full">
                      {[
                        { icon: Phone, label: 'Call', color: 'blue' },
                        { icon: Video, label: 'Video', color: 'emerald' },
                        { icon: MapPin, label: 'Track', color: 'rose' },
                        { icon: Settings, label: 'Ops', color: 'slate' }
                      ].map((btn, i) => (
                        <button key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-[#f4f8fb] border border-slate-100 hover:bg-white hover:shadow-md transition-all active:scale-95 group">
                          <btn.icon className={cn(
                            "h-3.5 w-3.5 transition-colors",
                            btn.color === 'blue' && "text-[#2e5f8a]",
                            btn.color === 'emerald' && "text-emerald-500",
                            btn.color === 'rose' && "text-rose-500",
                            btn.color === 'slate' && "text-slate-500",
                          )} />
                          <span
                            className={cn(
                              typography.chatActionLabel,
                              'uppercase text-gray-500 group-hover:text-gray-800',
                            )}
                          >
                            {btn.label}
                          </span>
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
                  <div className="grid grid-cols-2 gap-3 border-b border-slate-50 pb-3 text-center">
                    <div className="flex flex-col">
                      <span className={cn(typography.chatFieldLabel, 'mb-1.5')}>
                        Asset
                      </span>
                      <div className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-100 bg-[#f4f8fb] px-2 py-1">
                        <Bus className="h-3 w-3 text-[#2e5f8a]" />
                        <span className={cn(typography.chatSidebarPreview, 'leading-none')}>
                          {activeChat?.participants[0]?.vehicle || 'HQ-01'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col border-s border-slate-100 pl-3">
                      <span className={cn(typography.chatFieldLabel, 'mb-1.5')}>
                        Status
                      </span>
                      <div
                        className={cn(
                          typography.chatTag,
                          'inline-flex items-center justify-center rounded-lg border border-emerald-100/50 bg-emerald-50 px-2 py-1 uppercase leading-none text-emerald-700',
                        )}
                      >
                        {activeChat?.participants[0]?.status === 'On Route'
                          ? 'Active'
                          : 'On-duty'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className={cn(typography.sectionTitle, 'mb-2 px-1')}>
                      Current Assignment
                    </span>
                    <div className="group flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 bg-[#f4f8fb] p-2 transition-all hover:bg-white hover:shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-slate-100 bg-white text-[#2e5f8a] shadow-sm">
                          <MapPin className="h-3 w-3" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span
                            className={cn(
                              typography.chatSidebarPreview,
                              'mb-1 truncate leading-none',
                            )}
                          >
                            {activeChat?.participants[0]?.route || 'Admin Depot'}
                          </span>
                          <span className={cn(typography.chatRoleLabel, 'leading-none')}>
                            ETA: 8m
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-slate-300 transition-colors group-hover:text-[#2e5f8a]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Command Center (Bottom Section) */}
              <div className="mt-auto p-4 shrink-0 bg-[#f4f8fb]/30">
                <PanelHeader title="Command Center" icon={Settings} />
                <div className="space-y-3 mt-3">
                  {[
                    { label: 'Live Tracking', icon: MapPin, color: 'blue' },
                    { label: 'Assign Task', icon: Shield, color: 'emerald' },
                    { label: 'Broadcast Alert', icon: Bell, color: 'rose' }
                  ].map((btn, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className={cn(
                        'group h-11 w-full justify-start gap-3 rounded-lg border border-transparent px-3 text-gray-600 shadow-sm transition-all hover:border-slate-100 hover:bg-white',
                        typography.chatActionLabel,
                      )}
                    >
                      <btn.icon className={cn(
                        "h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100",
                        btn.color === 'blue' && "text-[#2e5f8a]",
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


