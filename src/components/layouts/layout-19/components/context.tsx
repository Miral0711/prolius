import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { TooltipProvider } from '@/components/ui/tooltip';

const HEADER_HEIGHT = '56px';

// Define the shape of the layout state
interface LayoutState {
  style: React.CSSProperties;
  bodyClassName: string;
  isMobile: boolean;
  isSidebarOpen: boolean;
  sidebarToggle: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

// Create the context
const LayoutContext = createContext<LayoutState | undefined>(undefined);

// Provider component
interface LayoutProviderProps {
  children: ReactNode;
  style?: React.CSSProperties;
  bodyClassName?: string;
}

export function LayoutProvider({
  children,
  style: customStyle,
  bodyClassName = '',
}: LayoutProviderProps) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const sidebarWidth = sidebarCollapsed ? '72px' : '240px';

  const defaultStyle = {
    '--sidebar-width': sidebarWidth,
    '--header-height': HEADER_HEIGHT,
  };

  const style = {
    ...defaultStyle,
    ...customStyle,
    '--sidebar-width': sidebarWidth, // Ensure it overrides customStyle if we want dynamic
  } as React.CSSProperties & Record<string, string>;

  // Sidebar toggle function (mobile)
  const sidebarToggle = () => setIsSidebarOpen((open) => !open);

  // Set body className on mount and clean up on unmount
  useEffect(() => {
    if (bodyClassName) {
      const body = document.body;
      const existingClasses = body.className;

      // Add new classes
      body.className = `${existingClasses} ${bodyClassName}`.trim();

      // Cleanup function to remove classes on unmount
      return () => {
        body.className = existingClasses;
      };
    }
  }, [bodyClassName]);

  return (
    <LayoutContext.Provider
      value={{
        bodyClassName,
        style,
        isMobile,
        isSidebarOpen,
        sidebarToggle,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      <div
        data-slot="layout-wrapper"
        className="flex min-h-0 min-w-0 h-full w-full overflow-x-hidden"
        data-sidebar-open={isSidebarOpen}
        style={style as any}
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </div>
    </LayoutContext.Provider>
  );
}

// Custom hook for consuming the context
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
