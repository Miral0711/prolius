import React from 'react';

interface TrackingLayoutProps {
  children: React.ReactNode;
}

export function TrackingLayout({ children }: TrackingLayoutProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-50 flex flex-col">
      {children}
    </div>
  );
}
