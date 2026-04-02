import { Bell, MessageSquare, MoreVertical } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';

export function HeaderToolbar() {
  const iconClass =
    'relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700';

  return (
    <div className="flex shrink-0 items-center gap-3">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm hover:bg-slate-50"
      >
        <span>Saudi Riyal (SAR)</span>
      </button>
      <button type="button" aria-label="Notifications" className={iconClass}>
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
          6
        </span>
      </button>
      <button type="button" aria-label="Messages" className={iconClass}>
        <MessageSquare className="h-4.5 w-4.5" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
          3
        </span>
      </button>
      <img
        src={toAbsoluteUrl('/media/avatars/300-2.png')}
        alt="Avatar"
        className="h-8 w-8 rounded-full border-2 border-slate-200 object-cover shadow-sm"
      />
      <button type="button" aria-label="More" className={iconClass}>
        <MoreVertical className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}


