# Manager Cockpit Visual Fixes — Summary

## A) Critical Alerts — Equal Elevation

**Changes:**

- **Icon chip (alert state):** `bg-rose-100/70 text-rose-600` → `bg-rose-50/80 text-rose-500` (softer, less saturated)
- **Border:** Already `border-l-red-300/60` (alert) and `border-l-slate-300/60` (neutral)
- **Value text:** Already `text-red-500` (alert)
- **Shadow:** CARD_SHADOW_TILE identical for all cards (no conditional shadow/ring)

**Result:** All 5 cards feel equally elevated; only subtle color indicates severity.

---

## B) Corner/Strip Artifact — Root Cause & Fix

**Root cause:** Manager Cockpit gradient container used `absolute -inset-[1px]`, extending 1px outside its parent (PageContainer) on all sides. When the parent or ancestor clipped overflow, this created a visible strip/band at the edges and corner clipping artifacts.

**Element + class:** `ManagerCockpitPage` → gradient div with `absolute -inset-[1px] -z-10 overflow-hidden rounded-[28px]`

**Fix:** Changed `-inset-[1px]` to `inset-0` so the gradient stays within bounds and does not bleed past the rounded shell.

**Shell audit:**

- Layout shell (`wrapper.tsx`) already has `overflow-hidden rounded-[28px]` — clips children to rounded corners
- Scroll container has `overflow-x-hidden overflow-y-auto` — no horizontal scroll
- PageContainer has `overflow-x-hidden min-w-0` — no horizontal peek

**Result:** No weird strip, rounded corners clip correctly, no horizontal overflow.
