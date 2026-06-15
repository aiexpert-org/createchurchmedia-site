# WCAG 2.1 AA compliance pass — 2026-06-15

Accessibility audit of createchurchmedia.com and the fixes applied in the same
commit as the subscription nav/CTA contrast fixes. Status is recorded at the
time of fix so future work has a baseline.

Legend: ✅ fixed this pass · ✔︎ already compliant (verified) · 📄 documented only

## Blockers

1. ✅ **Marquee reduced-motion opt-out** — `@media (prefers-reduced-motion:
   reduce)` now forces `animation: none !important; transform: none !important`
   on `.marquee-track`, `.marquee-ltr`, `.marquee-rtl`, and any `[class*="marquee"]`.
   The infinite trust-band scroll stops for vestibular-sensitive users.
   (`src/styles/tailwind.css`)
2. ✔︎ **Lenis respects reduced motion** — `SmoothScroll` reads
   `useReducedMotion()` and renders children without `ReactLenis` when reduced
   motion is set. Touch scrolling is left native (no `syncTouch`).
   (`src/components/SmoothScroll.tsx`)
3. ✔︎ **Hero mosaic is decorative** — every mosaic wrapper (`HeroMosaic`,
   `HeroMosaicCluster`, `HeroMosaicBackground`) carries `aria-hidden="true"` and
   tiles are `tabIndex={-1}`, so the cursor-lit effect needs no keyboard
   equivalent. The real portfolio lives on `/portfolio`.
4. ✅ **Lightbox focus management** — the `/portfolio` lightbox now traps Tab
   within the dialog, moves focus to the close button on open, restores focus to
   the originating gallery tile on close, and keeps Esc / ←/→ handlers.
   (`src/components/PortfolioGallery.tsx`)
5. ✅ **MarkerSwipe hidden from AT** — the swipe `<span>` was already
   `aria-hidden`; the inner `<svg>` now also has `aria-hidden="true"`,
   `role="presentation"`, and `focusable="false"`.
   (`src/components/MarkerSwipe.tsx`)

## Serious

6. ✅ **Form labels** — footer + new contact-block forms use real visually
   hidden `<label htmlFor>` elements on every input (not placeholder-only).
7. ✅ **Error live regions** — validation and request errors render inside
   `role="status" aria-live="polite"` in all three wait-list forms.
8. ✔︎ **Trust-band logo alt** — `ChurchLogos` images use `alt=""` +
   `aria-hidden`; the link's `aria-label` announces the church name once.
9. ✅ **Focus indicators** — global `:focus-visible { outline: 2px solid
   var(--color-cta-ink); outline-offset: 2px }` (white on dark surfaces). Form
   submit buttons add a `focus-visible:ring-2 ring-neutral-950 ring-offset-2`.
   The marker swipe is decorative and is not used as a focus indicator.
10. ✔︎ **Hero CTA tab order** — `pointer-events: none` on the hero copy column
    does not affect tab order; the CTAs (`pointer-events-auto`) remain reachable
    by keyboard in document order.
11. ✔︎ **Skip link** — `Skip to content` link is `sr-only` and reveals on focus
    (`focus:not-sr-only focus:fixed focus:top-4 focus:left-4`) targeting `#main`.

## Moderate

12. ✔︎ **Marquee tap targets** — each logo link is `w-40`/`w-44` with `px-4 py-3`
    plus label, well above the 44×44px minimum.
13. ✔︎ **Body muted text contrast** — `text-neutral-600` (#525252) on white is
    ~7.4:1, above the 4.5:1 minimum. No change needed.
14. ✔︎ **Eyebrow contrast** — hero/page eyebrows use `text-neutral-950` or
    `text-neutral-600`; both exceed 4.5:1 on white. (`text-neutral-500` at
    ~4.6:1 is reserved for large/secondary text.)
15. ✅ **Section landmarks** — major regions on `/` and `/subscription` are
    wrapped in `<section aria-label="…">`; the portfolio already used
    `<section aria-labelledby>`.

## Minor

16. 📄 **Marker yellow vs dark text** — #EEDD47 marker with #0A0A0A text is
    ~11.4:1. Passes comfortably. Dark text on the yellow marker is the locked
    rule regardless of the parent background.
17. ✔︎ **mailto: links** — already accessible, no change.
18. ✔︎ **`lang="en"`** — set on `<html>` in `src/app/layout.tsx`.

## Focus-ring regression note

Brett repeatedly flagged a "blue/yellow outline frame" stuck around the active
nav item. Root cause: the nav links had no focus styling, so the user-agent
`outline` showed on `:focus` and persisted after a mouse click. Fix: global
`:focus:not(:focus-visible) { outline: none }` removes the click-persisted ring
everywhere while keyboard `:focus-visible` keeps a high-contrast brand outline.
