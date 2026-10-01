import type { Preview, Decorator } from '@storybook/react'
import '../src/styles/globals.css'

const THEMES = ['ucl', 'jpm'] as const
const MODES = ['light', 'dark'] as const

type Theme = typeof THEMES[number]
type Mode = typeof MODES[number]

let currentLink: HTMLLinkElement | null = null

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'default') as Theme
  const mode = (context.globals.mode ?? 'light') as Mode

  // Swap theme stylesheet
  if (currentLink) currentLink.remove()
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `/themes/${theme}.css`
  document.head.appendChild(link)
  currentLink = link

  // Toggle dark mode
  if (mode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }

  // Sync canvas background with the active theme's page background
  document.body.style.setProperty('background-color', 'var(--page-bg, var(--surface-page-bg))', 'important')

  return Story()
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Project theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: THEMES.map((t) => ({ value: t, title: t.charAt(0).toUpperCase() + t.slice(1) })),
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Light or dark mode',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'ucl',
    mode: 'light',
  },
  decorators: [withTheme],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /date/i } },
    backgrounds: { disable: true },
  },
}

export default preview
