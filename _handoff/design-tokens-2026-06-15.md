# Design tokens & component rules — 2026-06-15

Locked decisions that recur across the site. Update this when a rule changes.

## Brand color

- `--color-cta: #EEDD47` (brand yellow, sampled from Emily's "create." wordmark)
- `--color-cta-hover: #E3CF2A`
- `--color-cta-ink: #0A0A0A` (near-black, the text/ink that sits on yellow)

## CTA treatments — marker swipe vs. solid button

Two distinct CTA families. Do not mix them.

- **Marker swipe** (`Button` variants `primary` / `secondary` / `ghost`):
  highlighter-style yellow swipe behind text. Used for **hero, nav, and
  link-style CTAs**. Text is always dark (#0A0A0A) on the yellow marker; the
  marker is always #EEDD47 regardless of the surface behind it — the marker IS
  the contrast container.
- **Solid button** (`Button` variant `solid`): conventional rectangular yellow
  button, `rounded-md`, dark text, clear press affordance. Used for **FORM
  submit buttons** (footer wait list, contact-block wait list, /contact form).
  A marker-swiped "link" next to inputs read as ambiguous, so forms get an
  obvious button instead.

## Marker fill implementation

The marker paints a literal `#EEDD47` via the inline CSS `fill` property (plus a
literal `fill` attribute). Never `fill="var(--color-cta)"` as an SVG
presentation attribute — Safari/iOS don't evaluate `var()` there, which left the
marker unpainted (outline on white, illegible CTA on dark).

## Logo variants by surface

Logos ship in three recolored variants: `-black`, `-white`, `-yellow`
(`public/church-logos/<slug>-{black,white,yellow}.png`, via
`churchLogo(slug, variant)`).

- **Light backgrounds** → `black` variant by default, `yellow` on hover.
- **Dark backgrounds** (`bg-neutral-950`: trust marquee, case-study cards,
  case-study detail hero, any future dark logo placement) → `white` variant by
  default, `yellow` on hover (cross-fade).

Never place a `black` logo on a dark surface (it disappears) or a `white` logo
on a light surface.

## Focus indicators

- Global `:focus-visible` outline: `2px solid var(--color-cta-ink)`, 2px offset
  (white on `.bg-neutral-950` / `[data-surface="dark"]`).
- Mouse-click focus (`:focus:not(:focus-visible)`) shows no outline — no
  persistent ring after a click.
- Inputs/textareas keep their own border + soft ring `:focus` state.
