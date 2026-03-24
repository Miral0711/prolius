import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useLoadingBar } from 'react-top-loading-bar';
import { AppRoutingSetup } from './app-routing-setup';

export function AppRouting() {
  const { start, complete } = useLoadingBar({
    color: 'var(--color-primary)',
    shadow: false,
    waitingTime: 400,
    transitionTime: 200,
    height: 2,
  });

  const [firstLoad, setFirstLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [firstLoad]);

  useEffect(() => {
    if (!firstLoad) {
      start('static');

      const timer = setTimeout(() => {
        complete();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location, firstLoad, start, complete]);

  return <AppRoutingSetup />;
}
