import { cn } from '@/lib/utils';

/**
 * Shared app page footer shell — use for every in-page copyright bar so height,
 * border, padding, and alignment stay identical everywhere.
 *
 * Vertical rhythm: `py-0` + `items-center` inside fixed `min-h-6` — equal space
 * above/below without relying on asymmetric padding. Font size is explicit and
 * slightly below `--text-2xs` for a subtle bar; `translate-y-px` offsets optical
 * top-heaviness of tight line-height caps.
 */
export const PAGE_FOOTER_ROOT_CLASSNAME =
  'flex w-full min-h-6 shrink-0 items-center justify-center border-t border-slate-100/60 px-1 py-0';

/** Slightly under theme 2xs; tight line box + light weight so the bar stays quiet */
export const PAGE_FOOTER_TEXT_CLASSNAME =
  'm-0 text-center font-normal text-[length:calc(var(--text-2xs)*0.93)] leading-none tracking-[0.02em] text-slate-400/80 translate-y-px';

interface PageFooterProps {
  className?: string;
  /** Kept for call sites; both map to the same compact app footer */
  variant?: 'default' | 'subtle';
}

export function PageFooter({
  className,
  variant: _variant = 'subtle',
}: PageFooterProps) {
  return (
    <footer className={cn(PAGE_FOOTER_ROOT_CLASSNAME, className)}>
      <p className={PAGE_FOOTER_TEXT_CLASSNAME}>
        Copyright &copy; 2026 Blitztech Solutions FZE LLC. All rights reserved.
      </p>
    </footer>
  );
}
