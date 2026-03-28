/**
 * Viewport-aware flyout positioning for the layout-19 sidebar.
 * Minimal vertical shifts: anchor to the hovered row, then move only enough to clear
 * the viewport bottom. Inner scrolling is a last resort when content still cannot fit.
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
  flyoutTopPx: number;
  /** Set only when the list must scroll; omit for natural (unrestricted) height. */
  innerMaxHeightPx?: number;
}

/**
 * Level-1 flyout: top aligns with sidebar row; shift up only by overflow past bottom.
 */
export function layoutLevel1Flyout(
  sidebarItemTopPx: number,
  itemCount: number,
  viewportHeightPx: number,
  margins: { top: number; bottom: number } = {
    top: SIDEBAR_SUBMENU_VIEWPORT_MARGIN,
    bottom: SIDEBAR_SUBMENU_VIEWPORT_MARGIN,
  },
  designMaxInnerFractionOfVh = 0.75,
): Level1FlyoutLayout {
  const innerNatural = innerListNaturalHeightPx(itemCount);
  const outerNatural =
    innerNatural +
    SIDEBAR_FLYOUT_PANEL_PAD_Y_PX +
    SIDEBAR_FLYOUT_OUTER_FUDGE_PX;
  const bottomLimit = viewportHeightPx - margins.bottom;

  let flyoutTopPx = sidebarItemTopPx;
  const overflowBottom = flyoutTopPx + outerNatural - bottomLimit;
  if (overflowBottom > 0) {
    flyoutTopPx -= overflowBottom;
  }
  flyoutTopPx = Math.max(margins.top, flyoutTopPx);

  const bottomAfter = flyoutTopPx + outerNatural;
  let innerMaxHeightPx: number | undefined;

  if (bottomAfter > bottomLimit) {
    innerMaxHeightPx = Math.max(
      96,
      bottomLimit - flyoutTopPx - SIDEBAR_FLYOUT_PANEL_PAD_Y_PX,
    );
  } else if (innerNatural > viewportHeightPx * designMaxInnerFractionOfVh) {
    innerMaxHeightPx = viewportHeightPx * designMaxInnerFractionOfVh;
  }

  return { flyoutTopPx, innerMaxHeightPx };
}

export interface NestedSubmenuLayout {
  /** `top` for `position: absolute` nested panel inside level-1 flyout. */
  topPx: number;
  /** Set only when the nested list must scroll. */
  innerMaxHeightPx?: number;
}

/**
 * Nested flyout: top aligned to trigger row; shift up minimally for bottom collision.
 */
export function layoutNestedSubmenu(
  parentFlyoutRect: DOMRectReadOnly,
  triggerRowRect: DOMRectReadOnly,
  nestedItemCount: number,
  viewportHeightPx: number,
  margins: { bottom: number } = { bottom: SIDEBAR_SUBMENU_VIEWPORT_MARGIN },
  designMaxInnerFractionOfVh = 0.6,
): NestedSubmenuLayout {
  const innerNatural = innerListNaturalHeightPx(nestedItemCount);
  const outerNatural =
    innerNatural +
    SIDEBAR_FLYOUT_PANEL_PAD_Y_PX +
    SIDEBAR_FLYOUT_OUTER_FUDGE_PX;
  const bottomLimit = viewportHeightPx - margins.bottom;

  let topPx = triggerRowRect.top - parentFlyoutRect.top;

  let nestedBottomV = parentFlyoutRect.top + topPx + outerNatural;
  if (nestedBottomV > bottomLimit) {
    topPx -= nestedBottomV - bottomLimit;
  }
  topPx = Math.max(0, topPx);

  nestedBottomV = parentFlyoutRect.top + topPx + outerNatural;
  let innerMaxHeightPx: number | undefined;

  if (nestedBottomV > bottomLimit) {
    innerMaxHeightPx = Math.max(
      96,
      bottomLimit - parentFlyoutRect.top - topPx - SIDEBAR_FLYOUT_PANEL_PAD_Y_PX,
    );
  } else if (innerNatural > viewportHeightPx * designMaxInnerFractionOfVh) {
    innerMaxHeightPx = viewportHeightPx * designMaxInnerFractionOfVh;
  }

  return { topPx, innerMaxHeightPx };
}
