/**
 * Viewport-aware flyout positioning for the layout-19 sidebar.
 * Level 1: anchor to the sidebar row; clamp `top` between viewport margins so the full
 * panel fits when possible (no artificial max-height / inner scroll).
 * Nested (level 2): anchor to the trigger row; shift up only as needed so the full
 * panel fits in the viewport — including negative `topPx` so the panel may extend
 * above the L1 flyout. Nested panels do not use inner scroll.
 */

/** Row height for sidebar + flyout menu items (kept in sync with `sidebar.tsx`). */
export const SIDEBAR_FLYOUT_ITEM_HEIGHT_PX = 32;
export const SIDEBAR_FLYOUT_ITEM_GAP_PX = 2;
/** Sum of vertical padding on flyout panels (e.g. p-2 top + bottom). */
export const SIDEBAR_FLYOUT_PANEL_PAD_Y_PX = 16;

export const SIDEBAR_SUBMENU_VIEWPORT_MARGIN = 10;

/** Extra px on outer height for borders / subpixel so the last row is not clipped. */
export const SIDEBAR_FLYOUT_OUTER_FUDGE_PX = 3;

function innerListNaturalHeightPx(itemCount: number): number {
  if (itemCount <= 0) return 0;
  return (
    itemCount * SIDEBAR_FLYOUT_ITEM_HEIGHT_PX +
    Math.max(0, itemCount - 1) * SIDEBAR_FLYOUT_ITEM_GAP_PX
  );
}

/** Outer height (padding + list + gaps) for a vertical flyout list. */
export function estimateFlyoutOuterHeightPx(itemCount: number): number {
  return (
    innerListNaturalHeightPx(itemCount) +
    SIDEBAR_FLYOUT_PANEL_PAD_Y_PX +
    SIDEBAR_FLYOUT_OUTER_FUDGE_PX
  );
}

export interface Level1FlyoutLayout {
  /** `top` for `position: fixed` level-1 flyout (viewport Y). May be less than `margins.top` if the panel must move up to fit. */
  flyoutTopPx: number;
}

/**
 * Level-1 flyout: prefer top aligned with the sidebar row; if the panel would extend past
 * the viewport bottom, shift up by the minimum amount. Enforces top and bottom viewport
 * margins. Does not cap inner height — avoids spurious scroll from a fraction-of-vh rule
 * when the full menu still fits after repositioning.
 */
export function layoutLevel1Flyout(
  sidebarItemTopPx: number,
  itemCount: number,
  viewportHeightPx: number,
  margins: { top: number; bottom: number } = {
    top: SIDEBAR_SUBMENU_VIEWPORT_MARGIN,
    bottom: SIDEBAR_SUBMENU_VIEWPORT_MARGIN,
  },
): Level1FlyoutLayout {
  const innerNatural = innerListNaturalHeightPx(itemCount);
  const outerNatural =
    innerNatural +
    SIDEBAR_FLYOUT_PANEL_PAD_Y_PX +
    SIDEBAR_FLYOUT_OUTER_FUDGE_PX;
  const bottomLimit = viewportHeightPx - margins.bottom;

  const idealTopPx = sidebarItemTopPx;
  const minTopPx = margins.top;
  const maxTopPx = bottomLimit - outerNatural;

  let flyoutTopPx = idealTopPx;
  if (flyoutTopPx > maxTopPx) {
    flyoutTopPx = maxTopPx;
  }
  if (flyoutTopPx < minTopPx) {
    flyoutTopPx = minTopPx;
  }
  if (minTopPx > maxTopPx) {
    flyoutTopPx = maxTopPx;
  }

  return { flyoutTopPx };
}

export interface NestedSubmenuLayout {
  /**
   * `top` for `position: absolute` nested panel inside level-1 flyout.
   * May be negative so the panel can sit partly above the L1 flyout while staying
   * viewport-clamped (no inner scroll).
   */
  topPx: number;
}

/**
 * Nested flyout: prefer top aligned to the trigger row; if the panel would extend
 * past the viewport bottom, shift up by the minimum amount. Also enforces top
 * viewport margin. Does not clamp to `topPx >= 0` — negative values keep the menu
 * attached visually while fitting above the bottom edge.
 */
export function layoutNestedSubmenu(
  parentFlyoutRect: DOMRectReadOnly,
  triggerRowRect: DOMRectReadOnly,
  nestedItemCount: number,
  viewportHeightPx: number,
  margins: { top: number; bottom: number } = {
    top: SIDEBAR_SUBMENU_VIEWPORT_MARGIN,
    bottom: SIDEBAR_SUBMENU_VIEWPORT_MARGIN,
  },
): NestedSubmenuLayout {
  const innerNatural = innerListNaturalHeightPx(nestedItemCount);
  const outerNatural =
    innerNatural +
    SIDEBAR_FLYOUT_PANEL_PAD_Y_PX +
    SIDEBAR_FLYOUT_OUTER_FUDGE_PX;
  const bottomLimit = viewportHeightPx - margins.bottom;

  const idealTopPx = triggerRowRect.top - parentFlyoutRect.top;
  const minTopPx = margins.top - parentFlyoutRect.top;
  const maxTopPx = bottomLimit - outerNatural - parentFlyoutRect.top;

  let topPx = idealTopPx;
  if (topPx > maxTopPx) {
    topPx = maxTopPx;
  }
  if (topPx < minTopPx) {
    topPx = minTopPx;
  }
  if (minTopPx > maxTopPx) {
    topPx = maxTopPx;
  }

  return { topPx };
}
