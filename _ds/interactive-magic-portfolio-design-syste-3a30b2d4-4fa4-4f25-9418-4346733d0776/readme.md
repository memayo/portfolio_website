# Interactive Magic Portfolio — Design System

A personal portfolio site for a game developer and pixel artist working in **Godot, Lua, and 3D modeling**. The brand voice is dark, mysterious and magical — heavily inspired by playing cards and stage illusions. There is one product in scope: the portfolio website itself (no separate app, docs site, etc).

## Sources
- **Figma**: "Relume Figma Kit (v3.7) (Community).fig", mounted read-only. This is Relume's generic marketing-site component library (1845 component families across ~80 category pages: Navbars, Footers, Portfolio-Headers, Sidebars, Style-Guide, etc). It supplied **layout structure and the token system** (the Style-Guide/Variables page is already a near-black scheme with a violet `rgb(151,71,255)` stroke accent — a genuine gift for this brief). It does **not** define a game-dev/magic brand — that visual language is this project's original interpretation of the brief, applied on top of Relume's structural bones (see "Scoping decision" below).
- No codebase, slide deck, or brand logo file was attached.

## Scoping decision — why this isn't a literal 1845-family import
The attached kit is a generic B2B marketing-site library (Blog, Careers, Ecommerce, Pricing, Cookie-Consent, Comparisons…). Almost none of that applies to a single-page personal portfolio, and importing it wholesale would produce a generic SaaS site wearing a dark filter — the opposite of the bespoke "playing cards & illusions" brief. Instead, this system:
1. Read the **Portfolio-Pages / Portfolio-Headers / Sidebars / Navbars / Style-Guide** frames for real, verbatim layout numbers (gaps, padding, radii, breakpoints).
2. Rebuilt only the **components a personal portfolio actually needs** — nav, CTA, project card, tag — as bespoke playing-card-themed primitives, restyled dark + glass + violet.
3. Left the remaining ~1838 generic marketing families (blog, careers, ecommerce, pricing, tables, forms, application shells…) unbuilt as out of scope for this brief. Flag if you want any of those (e.g. a future "Devlog" blog template) built out from the kit.

## Components
- `Button` — CTA styled as a vertical playing card, mirrored rank/suit corner index.
- `Badge` — suit-marked skill/tech tag (Godot, Lua, 3D Modeling…).
- `GlassPanel` — the base frosted-dark glassmorphic surface everything floats on.
- `NavRail` — left glass sidebar (logo, nav links, profile), structure from Relume Sidebar-1.
- `TopNav` — slim glass top bar, structure from Relume Navbar.
- `ProjectCard` — a portfolio project rendered as a vertical playing card.
- `Icon` — 12 UI glyphs copied from the kit's Material-style icon set (home, star, layer, file, help, cog, dots, menu, close, archive, pie-chart, bar-chart).

### Intentional additions
- `Icon` wrapper — the kit's icon set has ~4300 glyphs; only the dozen actually used by `NavRail`/chrome were materialized. Ask if you need more.
- `GlassPanel` — a plain base surface with no Relume counterpart; every floating chrome piece in this dark theme needed one shared blur/tint primitive.

## Index
- `styles.css` — global stylesheet entry (imports everything under `tokens/`).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `components/core/` — Button, Badge, GlassPanel.
- `components/navigation/` — NavRail, TopNav.
- `components/portfolio/` — ProjectCard.
- `assets/icons/` — Icon component + icon-data.js (copied glyphs).
- `assets/js/afk.js` — the vanilla-JS idle/AFK fade behavior (see below).
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius).
- `ui_kits/portfolio-site/` — the full click-through home page recreation.
- `thumbnail.html` — project tile for the homepage.

## AFK secret animation
`assets/js/afk.js` is a dependency-free idle detector: after **10 seconds** with no mouse move, click, keypress, touch, or scroll, every element carrying `class="afk-fade"` fades to `opacity:0; pointer-events:none` over `var(--duration-idle-fade)` (900ms) — leaving only the background video visible, as if the whole card-table UI vanished into thin air. Any input instantly fades it back. Load it after your DS bundle: `<script src="assets/js/afk.js"></script>`, then tag every piece of chrome (`TopNav`, `NavRail`, hero copy, project grid) with `afk-fade`. See it live in `ui_kits/portfolio-site/index.html`.

## CONTENT FUNDAMENTALS
- **Voice**: first-person, quiet-confident, a little theatrical — like a magician's patter, not a resume. "Every project is a card — turn it over to see the trick," not "I build innovative gaming experiences leveraging Godot."
- **Casing**: display headings are **set in small, tracked-out capitals** via `Castoro Titling` (an all-caps face) — treat every H1/H2/card-title as an "reveal," not a label. Body copy is sentence case, no forced capitalization.
- **Person**: first-person ("I", "my work") for bio copy; project cards speak about the work itself ("Ember Keep — a roguelike built in Godot").
- **Length**: short. One sentence of bio per screen, one line of description per project card. This is a portfolio, not a case-study blog — let the visuals (art, video) do the talking.
- **Emoji**: never. Card-suit glyphs (♠ ♥ ♦ ♣) stand in for iconography/decoration instead — they're period-appropriate to the theme and read as typography, not decoration.
- **CTAs**: verbs with a wink — "Play Demo", "Reveal the project", "See the Work" — over generic "Learn More" / "Submit".

## VISUAL FOUNDATIONS
- **Palette**: near-black void (`rgb(12,8,1)`) as the only background; a single violet "magic" accent (`rgb(151,71,255)` family) for every interactive/glow moment; white/translucent-white for all text. Ember orange and crimson exist only as rare, deliberate warm accents (featured tags, danger states) — never a second competing hue.
- **Type**: two faces only. `Castoro Titling` (all-caps display serif, "re-hung" Roman inscriptional letters) for anything ceremonial — names, section titles, card ranks. `Roboto` for everything functional — body copy, nav labels, badges. No third face.
- **Backgrounds**: one full-bleed looping background video (a hooded figure) sits behind all UI, at `z-index:-2`. **The visual center of the viewport must stay unobstructed** — no panel, card, or nav element may be centered over it; all chrome is edge-anchored (top bar, left rail) or arranged so the middle reads as empty stage. A dark vignette overlay (`radial-gradient`, transparent center → `rgba(12,8,1,0.35)` edges) helps chrome legibility without touching the center.
- **Glassmorphism**: `backdrop-filter: blur(20–32px)` + `rgba(12,8,1,0.55–0.78)` fill + a 1px `rgba(255,255,255,0.14)` hairline border on every floating surface (sidebar, topbar, content panels). Two blur "weights" only — `--blur-glass` (panels) and `--blur-glass-strong` (nav chrome) — no third variant.
- **Animation**: fades only, no bounces or springs. `--ease-standard` (`cubic-bezier(0.4,0,0.2,1)`) for UI transitions, `--ease-out` for card hover-lift. The signature motion is the AFK fade (900ms opacity fade, see above) — slow and deliberate, like a stage curtain, never abrupt.
- **Hover states**: cards/buttons lift `translateY(-3px to -6px)` with a slight rotate on project cards (`rotate(-1deg)`, as if picked up off the table) and gain the violet glow shadow. Links go from `--text-secondary` to `--accent-primary-hover` (lighter violet), never underline.
- **Press/active**: violet deepens to `--accent-primary-active` (`rgb(98,72,255)`); no scale/shrink — this is a card table, not a mobile app.
- **Borders**: 1px hairlines everywhere, never 2px+. White-alpha (`rgba(255,255,255,0.14–0.16)`) on glass panels, violet-alpha (`rgba(151,71,255,0.35–0.5)`) on cards/CTAs to read as "foil edge."
- **Shadows**: `--shadow-card` (soft black drop + faint inner top highlight) is the baseline on every card/button. `--shadow-glow` (violet, blurred) layers on top for primary/active/hover states only — never combine glow with more than one element at a time in a single view, it should read as "this is the thing that matters right now."
- **Transparency**: the single most important structural rule in this system — the exact center of the page is always clear glass onto the video. Every layout (hero, sidebar, topbar) is built edge-out from that constraint, not center-out.
- **Imagery tone**: no real project screenshots were supplied; `ProjectCard` shows an explicit violet-striped "artwork placeholder" weave (mimicking a card back) rather than a fake photo — swap in real renders/screenshots via the `image` prop.
- **Corner radii**: small (8px) on buttons/badges, medium (16px) on cards/panels, large (24px) on the sidebar, pill (999px) on tags. Never sharp corners, never a fully-rounded "app icon" super-ellipse.
- **Cards** (both CTA buttons and project cards): vertical aspect ratio (taller than wide, like a real playing card), dark glass fill, violet-alpha border, mirrored rank+suit glyphs in opposite corners (top-left upright, bottom-right rotated 180°) — this is the system's core visual signature and should appear on every "featured item" surface, not just the literal ProjectCard.

## ICONOGRAPHY
- **Source**: Material-style line icons copied verbatim from the Relume kit's built-in icon set (`assets/icons/icon-data.js`, 12 glyphs materialized: home, star, layer, file, help-circle, cog, dots-horizontal, menu, close, archive, pie-chart, bar-chart). The kit's full icon family has ~4300 glyphs; only the ones actually referenced by the sidebar/chrome were pulled in — ask if a screen needs more.
- **Rendering**: single-color, `currentColor`-filled SVG paths via the `<Icon name="…" size={…} />` wrapper — recolor with CSS `color`, not a fill prop.
- **Card suits as icons**: for anything project/skill-related (not chrome navigation), this system prefers the four card-suit glyphs (♠ ♥ ♦ ♣, plain Unicode, set in `Castoro Titling`) over line icons — they're the brand's actual iconographic vocabulary. Reserve the Material icon set for generic UI chrome (nav, settings, close).
- **Emoji**: never used.
- **No logo was supplied** in the source Figma or elsewhere — every mark that would carry a logo (nav, sidebar, footer) instead renders the name/wordmark in `Castoro Titling` type (see `guidelines/wordmark.html`). Do not invent a logo.

## Caveats & where to help
- **No background video was supplied** — `ui_kits/portfolio-site` uses a dark radial-gradient placeholder in place of the "hooded character" footage. Drop an mp4 at `assets/video/hooded-figure.mp4` and uncomment the `<source>` in `PortfolioSite.jsx` to go live.
- **No real project art/screenshots** — `ProjectCard` shows an explicit striped placeholder; pass `image=""` with real renders per project.
- **Fonts are CDN-linked (Google Fonts)**, not shipped as local binaries — `Castoro Titling` and `Roboto` are both on Google Fonts so this works out of the box, but if you'd rather self-host, hand over the `.woff2` files and I'll add real `@font-face` rules.
- **Scope**: only the components a one-page personal portfolio needs were built (see "Scoping decision" above) — the other ~1838 Relume marketing families (blog, ecommerce, pricing tables, application shells, forms…) were deliberately left out. Tell me if you want a specific one of those built out in this theme (e.g. a Devlog/blog template).

**Ask**: tell me if the violet/void palette and the Castoro Titling display face feel right for "mysterious and magical," or if you'd rather push further (deeper purples, a second accent, a more ornate display face) — and send over the actual background video + project screenshots so `ui_kits/portfolio-site` can go from placeholder to real.
