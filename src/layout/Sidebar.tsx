import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navConfig, type NavItem, type NavSubItem } from './navConfig';

const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 72;

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { pathname } = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ top: 0 });

  const isActive = (path?: string) => {
    if (!path) return false;
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  const isParentActive = (item: NavItem) => {
    return (
      item.children?.some((c) => {
        if (isActive(c.path)) return true;
        return c.children?.some((sc) => isActive(sc.path));
      }) ?? false
    );
  };

  const handleMouseEnter = (e: React.MouseEvent, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ top: rect.top });
    setHoveredItem(label);
  };

  const handleSubMouseEnter = (e: React.MouseEvent, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredSubItem(label);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-full flex-col bg-[#1e1e2d] text-white/70 transition-all duration-250 ease-in-out shadow-xl',
      )}
      style={{
        width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
      }}
      onMouseLeave={() => {
        setHoveredItem(null);
        setHoveredSubItem(null);
      }}
    >
      {/* Sidebar Header / Logo Area */}
      <div className="flex h-[64px] items-center justify-between px-6 border-b border-white/5">
        {!collapsed && (
          <span className="text-lg font-semibold tracking-tight text-white">
            TRIDEN <span className="text-blue-400">FLEET</span>
          </span>
        )}
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        >
          <ChevronRight
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              !collapsed && 'rotate-180',
            )}
          />
        </button>
      </div>

      {/* Navigation Main */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide">
        <ul className="space-y-1">
          {navConfig.map((item) => {
            const Icon = item.icon;
            const active = item.path
              ? isActive(item.path)
              : isParentActive(item);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <li
                key={item.label}
                className="relative px-3"
                onMouseEnter={(e) => handleMouseEnter(e, item.label)}
              >
                {/* Active Indicator Bar */}
                {active && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-500 rounded-r-full"
                  />
                )}

                <Link
                  to={item.path || '#'}
                  onClick={(e) => !item.path && e.preventDefault()}
                  className={cn(
                    'group flex items-center h-11 px-3 rounded-md transition-all duration-200',
                    active
                      ? 'bg-white/10 text-white'
                      : 'hover:bg-white/5 hover:text-white',
                    collapsed ? 'justify-center' : 'gap-3',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0',
                      active
                        ? 'text-blue-400'
                        : 'text-white/60 group-hover:text-white',
                    )}
                  />
                  {!collapsed && (
                    <span className="text-sm font-medium flex-1 truncate">
                      {item.label}
                    </span>
                  )}
                  {!collapsed && hasChildren && (
                    <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-white/40" />
                  )}

                  {/* Tooltip on Collapsed */}
                  {collapsed && hoveredItem === item.label && (
                    <div className="fixed left-[80px] px-3 py-2 bg-[#1e1e2d] text-white text-xs font-medium rounded-md shadow-lg pointer-events-none z-[60] border border-white/10">
                      {item.label}
                    </div>
                  )}
                </Link>

                {/* Submenu Panel (Level 1) */}
                <AnimatePresence>
                  {hoveredItem === item.label && hasChildren && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="fixed z-[100] bg-[#1e1e2d] border border-white/10 rounded-lg shadow-2xl py-2 min-w-[200px]"
                      style={{
                        left: collapsed
                          ? SIDEBAR_WIDTH_COLLAPSED + 12
                          : SIDEBAR_WIDTH_EXPANDED + 8,
                        top: mousePos.top,
                      }}
                    >
                      {item.children?.map((sub) => {
                        const subActive = isActive(sub.path);
                        const subHasChildren =
                          sub.children && sub.children.length > 0;

                        return (
                          <div
                            key={sub.label}
                            className="px-2 relative"
                            onMouseEnter={(e) =>
                              handleSubMouseEnter(e, sub.label)
                            }
                          >
                            <Link
                              to={sub.path || '#'}
                              onClick={(e) => !sub.path && e.preventDefault()}
                              className={cn(
                                'flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors',
                                subActive
                                  ? 'bg-white/10 text-white font-medium'
                                  : 'text-white/60 hover:bg-white/5 hover:text-white',
                              )}
                            >
                              <span>{sub.label}</span>
                              {subHasChildren && (
                                <ChevronRight className="h-3 w-3 opacity-50" />
                              )}
                            </Link>

                            {/* Level 2 Submenu */}
                            <AnimatePresence>
                              {hoveredSubItem === sub.label &&
                                subHasChildren && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="absolute left-full top-0 ml-2 bg-[#1e1e2d] border border-white/10 rounded-lg shadow-2xl py-2 min-w-[180px]"
                                  >
                                    {sub.children?.map((leaf) => (
                                      <Link
                                        key={leaf.label}
                                        to={leaf.path || '#'}
                                        className={cn(
                                          'block px-4 py-2 text-sm transition-colors',
                                          isActive(leaf.path)
                                            ? 'bg-white/10 text-white font-medium'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white',
                                        )}
                                      >
                                        {leaf.label}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Area */}
      <div className="p-4 border-t border-white/5">
        <div
          className={cn(
            'flex items-center gap-3 px-2',
            collapsed && 'justify-center',
          )}
        >
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold text-xs">
            JS
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                John Smith
              </p>
              <p className="text-[10px] text-white/40 truncate">System Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export { SIDEBAR_WIDTH_EXPANDED, SIDEBAR_WIDTH_COLLAPSED };
