import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { MENU_SIDEBAR } from '@/config/layout-19.config';
import { useMenu } from '@/hooks/use-menu';
import { LayoutProvider } from './components/context';
import { Wrapper } from './components/wrapper';

export function Layout19() {
  const { pathname } = useLocation();
  const { getCurrentItem } = useMenu(pathname);
  const item = getCurrentItem(MENU_SIDEBAR);

  return (
    <>
      <Helmet>
        <title>{item?.title}</title>
      </Helmet>

      <LayoutProvider
        bodyClassName="h-full"
        style={
          {
            '--sidebar-width': '72px',
            '--sidebar-width-mobile': '240px',
          } as React.CSSProperties
        }
      >
        <Wrapper />
      </LayoutProvider>
    </>
  );
}


