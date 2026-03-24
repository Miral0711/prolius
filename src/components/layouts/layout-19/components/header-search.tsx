import { Command, Search } from 'lucide-react';
import { Input, InputWrapper } from '@/components/ui/input';

export function HeaderSearch() {
  const handleInputChange = () => {};

  return (
    <div className="flex min-w-0 flex-1 max-w-2xl shrink items-center justify-center">
      <InputWrapper className="relative w-full rounded-full border border-slate-200/60 bg-white/80 backdrop-blur shadow-sm pl-11 pr-4 py-2 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 shrink-0 text-slate-400 pointer-events-none" />
        <Input
          type="search"
          placeholder="Search fleet vehicles, drivers, routes..."
          className="border-0 bg-transparent pl-0 pr-10 text-sm text-slate-700 placeholder:text-slate-400 w-full min-w-0 focus:outline-none"
          onChange={handleInputChange}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center px-1.5 py-0.5 rounded border border-slate-200 text-xs text-slate-400 font-medium">
          <Command className="h-3 w-3 mr-0.5" /> K
        </div>
      </InputWrapper>
    </div>
  );
}
