'use client';

import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import type { MenuItem } from '@/config/types';

interface SidebarFlyoutProps {
  visible: boolean;
  top: number;
  left: number;
  /** Parent item title (e.g. "Reports") */
  title: string;
  /** Level-2 groups (for multi-column) or flat children */
  items: MenuItem[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Flyout panel to the right of sidebar. Supports single column (links) or
 * two columns for Reports-style: left = level-2 groups, right = level-3 items.
 * Uses existing text/bg classes; layout/position only.
 */
export function SidebarFlyout({
  visible,
  top,
  left,
  title,
  items,
  onMouseEnter,
  onMouseLeave,
}: SidebarFlyoutProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hasNested = items.some((i) => i.children && i.children.length > 0);

  const close = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  if (!visible) return null;

  const pillClass =
    'inline-flex items-center rounded-md px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap';

  const pillActiveClass = 'bg-slate-100 text-slate-900';

  return (
    <div
      className="fixed z-50 rounded-md border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)]"
      style={{ top: Math.max(8, top), left }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        close();
      }}
      role="menu"
      aria-label={title}
    >
      {hasNested ? (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {items.map((group, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`${pillClass} cursor-default ${hoveredIndex === idx ? pillActiveClass : ''}`}
              >
                {group.title}
              </div>
            ))}
          </div>
          {hoveredIndex !== null && items[hoveredIndex]?.children?.length ? (
            <div className="flex flex-wrap gap-1.5 border-t border-white/25 pt-2">
              {items[hoveredIndex].children!.map((item, k) => (
                <Link key={k} to={item.path || '#'} className={pillClass}>
                  {item.title}
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 border-t border-white/25 pt-2 text-xs text-slate-500">
              Select a category
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, idx) => (
            <Link key={idx} to={item.path || '#'} className={pillClass}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


