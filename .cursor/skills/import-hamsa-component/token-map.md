# Hamsa token map (import reference)

Read this when mapping Figma fills/spacing into code during an import.

## Load order

`globals.css` imports:

1. `primitives.css` — raw values
2. `typography.css` — type ramps
3. `semantic.css` — meaning (light + dark)
4. `breakpoint.css` — responsive aliases

Themes load at runtime via Storybook (`/themes/ucl.css` | `/themes/jpm.css`) and override a small set of brand tokens.

## Where to put a new value

```
Figma hex / spacing
  → exists as primitive? use it
  → need a role (button bg, nav item, input border)? add/use semantic
  → differs by UCL vs JPM? override in public/themes/*.css
  → changes at tablet/mobile? use or add --bp-* in breakpoint.css
```

### Primitive (`src/styles/primitives.css`)

- `--color-blue-400`, `--color-gray-800`, …
- `--spacing-s50` (4px) … `--spacing-s800` (64px), etc.
- Do not invent alternate hexes for the same swatch.

### Semantic (`src/styles/semantic.css`)

- Shared: `--surface-*`, `--text-*`, `--border-*`, `--elevation-*`, `--corner-*`
- Per component: `--btn-*`, `--input-*`, `--table-*`, `--nav-*`, …
- Always pair light (`:root`) with dark (`[data-theme="dark"]`) when the value flips.

Example pattern:

```css
/* :root */
--widget-bg:   var(--color-gray-0);
--widget-text: var(--color-gray-800);

/* [data-theme="dark"] */
--widget-bg:   var(--color-gray-800);
--widget-text: var(--color-gray-100);
```

Component CSS:

```css
.widget {
  background: var(--widget-bg);
  color: var(--widget-text);
  padding: var(--spacing-s300);
  border-radius: var(--corner-sm);
}
```

### Theme (`public/themes/ucl.css`, `jpm.css`)

Use for brand deltas, not every component color:

- `--page-bg`
- `--shadow-card-*-default`
- `--corners-card`
- `--font-family-*`
- `--action-link` when brand-specific

Each file should consider both `:root` and `[data-theme="dark"]`.

### Breakpoint (`src/styles/breakpoint.css`)

- Desktop defaults on `:root`
- Tablet `@media (max-width: 1024px)`
- Mobile `@media (max-width: 768px)`
- Prefer `--bp-spacing-*` / `--bp-font-header-*` when Figma shows responsive type or padding

## Figma → Hamsa mapping tips

| Figma variable / raw | Prefer |
|----------------------|--------|
| `spacing/s300` | `--spacing-s300` |
| `color/blue/400` | `--color-blue-400` inside a semantic alias |
| `background/card/default` | `--surface-card-default` or component semantic |
| `content/text-body` | `--text-default` / `--text-muted` as appropriate |
| `corners/card` | `--corner-card` or theme `--corners-card` |
| Absolute `12px` padding | nearest `--spacing-s150` (12px) |

## Nested component check

Before coding a sub-control, search:

| Looks like | Import |
|------------|--------|
| Primary / secondary / neutral button | `Button` |
| Text input / duo field | `TextField` |
| Multiline | `TextArea` |
| Glyph | `Icon` (`IconName`) |
| Icon-only control | `IconButton` |
| Text link | `Link` |
| Pill toggle | `ToggleBtnPill` or `Switch` |
| Tab row | `Tabs` / `Tab` |
| Checkbox / radio | `Checkbox` / `Radio` |
| Count / status chip | `Badge` |

Compose via props; do not copy their internal CSS.

## Storybook verify matrix

For color-sensitive components, spot-check:

1. UCL + light  
2. UCL + dark  
3. JPM + light  
4. JPM + dark  

Toolbar globals in `.storybook/preview.ts` drive theme stylesheet + `data-theme`.
