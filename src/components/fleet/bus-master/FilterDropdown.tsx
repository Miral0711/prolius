import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface FilterDropdownItem {
  value: string;
  label: string;
}

export interface FilterDropdownProps {
  placeholder?: string;
  defaultValue?: string;
  items: FilterDropdownItem[];
  triggerClassName?: string;
  widthClassName?: string;
}

export function FilterDropdown({
  placeholder,
  defaultValue,
  items,
  triggerClassName,
  widthClassName = 'w-[128px]',
}: FilterDropdownProps) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger
        className={cn(
          'h-8 border-slate-200 bg-white text-2sm font-medium text-slate-700 shadow-none',
          widthClassName,
          triggerClassName,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


