---
name: import-hamsa-component
description: >-
  Import a Hamsa Design System component from Figma into this Storybook repo.
  Use when the user asks to create, import, implement, or port a Hamsa component
  from Figma; mentions NavLeft, Calculator, or other DS components; or provides
  a v2.0 Hamsa Design System Figma URL to build as React + CSS.
---

# Import Hamsa Component

Turn a Figma node from the Hamsa Design System into a production component in this repo.

**Stack:** React + TypeScript + plain CSS (CSS variables). No Tailwind in component files.

**Default Figma file:** `NTrjJWBV5hPbULYK5ne66w` (v2.0 Hamsa Design System).

## When to use

- User provides a Figma URL / node and asks to implement a component
- User says “import / create / add / port” a Hamsa component
- Building a composite that should reuse existing DS pieces

## Progress checklist

Copy and update as you go:

```
Import progress:
- [ ] 1. Load Figma design context
- [ ] 2. Inventory nested DS components (reuse, do not rebuild)
- [ ] 3. Scaffold files + export
- [ ] 4. Map tokens (primitive → semantic → theme → breakpoint)
- [ ] 5. Light + dark for every theme (UCL, JPM)
- [ ] 6. Stories + visual verify
- [ ] 7. Hardcode audit pass
```

---

## 1. Load Figma design context

1. Load **figma-design-to-code** before any `get_design_context` call.
2. Parse `fileKey` + `nodeId` from the URL (`node-id=21477-33014` → `21477:33014`).
3. Call `get_design_context` with `clientLanguages: typescript,css`, `clientFrameworks: react`, and `skillNames` including the design-to-code skill.
4. Treat returned React/Tailwind as **reference only** — rewrite to Hamsa patterns.
5. If the node is huge, fetch the specific variant/state nodes the user linked (expanded/collapsed, LM/DM, item states, etc.).

Do **not** write component code until you understand anatomy, states, and nested pieces from Figma.

---

## 2. Inventory nested components — reuse, never replicate

Before implementing chrome for buttons, inputs, icons, tabs, etc.:

1. Read `src/index.ts` and scan `src/components/*/` for matches.
2. Walk the Figma tree / screenshot for nested controls (Button, TextField, Icon, Tabs, Link, Switch, Checkbox, Radio, Badge, IconButton, …).
3. **Import and compose** existing components. Do not restyle a fake button or redraw an icon that already exists in `Icon`.
4. Prefer existing props (`iconLeftName`, `duo`, sizes, colors) over one-off forks.
5. Only add a new primitive when nothing in the library matches the design intent.

Examples already in-repo:
- Calculator → `TextField` + `Button`
- CommentBox → `TextField` + `TextArea` + `Button` + `Radio`
- Table → `Button`, `Checkbox`, `Icon`, `IconButton`, `Link`, `Switch`, `Tabs`
- Filter → `Button`, `Icon`, `Link`, `TextGroup`

Icons: use `Icon` + `IconName` from `src/components/Icon/`. Download/commit assets only when the glyph is **not** in the registry (or is unique chrome like NavLeft moon/sun).

---

## 3. Scaffold

Create:

```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.css
  ComponentName.stories.tsx
  assets/   # only if needed (committed SVG/PNG from Figma exports)
```

Then:
- Export from `src/index.ts` (named exports + public prop types).
- Match patterns of a similar component (controlled/uncontrolled props, BEM-ish class names, `className` passthrough).
- Stories: `title: 'Components/ComponentName'`, `tags: ['autodocs']`, cover primary variants + theme/mode-sensitive states.

---

## 4. Token mapping (required)

Use variables in this order. Prefer the **highest** layer that already exists.

| Layer | Files | Use for |
|-------|-------|---------|
| Primitive | `src/styles/primitives.css` | Raw palette (`--color-*`), spacing scale (`--spacing-s*`), corners raw values only when composing tokens |
| Typography | `src/styles/typography.css` | Font families, body/header/eyebrow sizes |
| Semantic | `src/styles/semantic.css` | Component meaning: `--btn-*`, `--input-*`, `--nav-*`, surfaces, text, borders — **light `:root` and dark `[data-theme="dark"]`** |
| Breakpoint | `src/styles/breakpoint.css` | Responsive spacing/type (`--bp-*`) when layout/type changes by viewport |
| Theme | `public/themes/ucl.css`, `public/themes/jpm.css` | Brand/product overrides (`--page-bg`, shadows, fonts, theme-only deltas) for **both** `:root` and `[data-theme="dark"]` |

**Rules:**
- Component CSS must consume **semantic** (or shared surface/text/border) tokens — not raw hex.
- New colors: add `--color-*` primitive **only if missing**, then wire semantic aliases.
- Spacing in CSS: `var(--spacing-s*)` (or `--bp-spacing-*` when breakpoint-driven). No magic `12px` / `30px` unless no token fits; if Figma uses a one-off, prefer nearest spacing token or add a named semantic size.
- Corners: `var(--corner-*)` / theme `--corners-card`.
- Elevation: `var(--elevation-*)` or theme `--shadow-card-*`.
- Never hardcode `#46C8FF`, `#354043`, etc. in component CSS when a primitive/semantic exists.

Detail + examples: [token-map.md](token-map.md).

---

## 5. Light + dark for each theme

Hamsa modes × themes:

| | Light | Dark |
|--|-------|------|
| **UCL** | default + `ucl.css` | `[data-theme="dark"]` + `ucl.css` dark block |
| **JPM** | default + `jpm.css` | `[data-theme="dark"]` + `jpm.css` dark block |

Required for every new component color:

1. Add semantic tokens under **`:root`** (light).
2. Add matching overrides under **`[data-theme="dark"]`** when values change in dark mode.
3. If UCL vs JPM differ (page bg, card shadow, fonts, brand accents), set overrides in **both** `public/themes/ucl.css` and `public/themes/jpm.css`, including their `[data-theme="dark"]` blocks when needed.
4. If chrome is intentionally always-dark (e.g. NavLeft, Drawer shell), document that and still use semantic tokens — do not hardcode.

Storybook: `.storybook/preview.ts` swaps `/themes/{ucl|jpm}.css` and toggles `data-theme`. Stories that control mode (e.g. LM/DM toggle) should sync `document.documentElement` `data-theme`.

---

## 6. Implement + verify

1. Adapt Figma reference into TSX/CSS using composed children + tokens.
2. Download Figma MCP assets that must be committed (`assets/`), with explicit width/height on leaves.
3. Run typecheck; fix lints on touched files.
4. Mentally (or in Storybook) verify UCL/JPM × light/dark for the new stories.
5. **Hardcode audit:** grep the new CSS/TSX for `#`, `rgb(`, `rgba(` — allow only inside `primitives.css` / intentional one-off shadows already used as elevation patterns; prefer moving new colors into tokens.

---

## Anti-patterns

- Pasting Figma Tailwind output into the repo
- Rebuilding Button / TextField / Icon / Tabs markup instead of importing them
- Using only light-mode semantic tokens and skipping `[data-theme="dark"]`
- Putting brand differences only in UCL and forgetting JPM (or the reverse)
- Referencing primitives directly in component CSS when a semantic token should exist
- Authoring SVGs by hand when Icon or a Figma export should be used

## Done when

- [ ] Component folder + stories + `src/index.ts` export exist
- [ ] Nested DS pieces are real imports
- [ ] Colors/spacing go through primitive → semantic (→ theme/breakpoint as needed)
- [ ] Light and dark semantic values set; theme files updated when UCL/JPM diverge
- [ ] No unjustified hardcoded colors in component CSS
