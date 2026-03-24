# Critical Alerts Shadow — Root Cause & Fix

## Root Cause

**Element:** Each alert card `<div>` (the tile container).

**Exact cause:** `border-l-transparent` on non-alert cards (value = 0) vs `border-l-red-400/70` on the alert card (Low Voltage, value = 3).

- All 5 cards use the same `ALERT_CARD_BASE` and `CARD_SHADOW_TILE` — shadow is identical.
- The last card (Low Voltage) is the only one with `value > 0`, so it gets `border-l-red-400/70`.
- The other 4 cards use `border-l-transparent`, so their left edge has no visible border.
- The visible red left border on the last card creates contrast and makes its shadow look stronger.
- The transparent border on the others makes their left edge blend with the background, so their shadow looks softer.

## Verification Steps (Optional)

To confirm all cards receive the same base styling, add this to `ALERT_CARD_BASE` temporarily:

```
outline outline-2 outline-lime-500 shadow-[0_0_0_4px_rgba(0,255,0,0.25)]
```

All 5 cards should show the lime outline and green glow. If they do, the issue is not a different wrapper/component.

## Parent Wrapper Inspection

- **DataCard (GlassCard):** Same for all cards; no per-card conditional classes.
- **Grid:** `grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5` — no `:last-child`, `group-hover`, or conditional shadow/ring.
- **GlassCard:** Has `hover:shadow-[0_4px_12px_...]` on the whole DataCard, not on individual tiles. Hover affects the whole section, not the last card only.

## Fix Applied

1. **Non-alert border:** `border-l-transparent` → `border-l-slate-300/60` (visible neutral edge).
2. **Alert border:** `border-l-red-400/70` → `border-l-red-300/60` (slightly softer to reduce perceived elevation contrast).
3. Both borders now use `/60` opacity for visual parity; only color differs (slate vs red).

## DevTools Verification Checklist

1. Select a zero-value card (e.g. SOS Alerts) and a non-zero card (Low Voltage).
2. In Computed tab, compare: box-shadow (must match), filter (must match), border-left-color (allowed to differ).
3. In Elements tab, confirm each card div has border-l-slate-300/60 or border-l-red-300/60 and CARD_SHADOW_TILE.
4. If classes are missing, restart dev server.

## Tailwind

Using `@tailwindcss/vite`; content is auto-detected. No `tailwind.config` file. If styles don’t update, restart the dev server.
