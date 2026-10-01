import { useEffect, useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { iconData, type IconName } from '../Icon/icons'
import {
  NavLeft,
  navLeftFlatDefaults,
  type NavLeftItem,
  type NavLeftSubItem,
  type NavMode,
} from './NavLeft'

const navIconNames = Object.keys(iconData).filter((name) =>
  name.startsWith('nav-'),
) as IconName[]

type NavLeftStoryArgs = React.ComponentProps<typeof NavLeft> & {
  hasSubItems?: boolean
  hasFooterItems?: boolean
}

const meta: Meta<NavLeftStoryArgs> = {
  title: 'Components/NavLeft',
  component: NavLeft,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    hasSubItems: {
      name: 'hasSubItems',
      control: 'boolean',
      description: 'Section layout with eyebrow + nested links when true',
    },
    hasFooterItems: {
      name: 'hasFooterItems',
      control: 'boolean',
      description: 'Show footer nav items (e.g. Snapshot). Off by default.',
    },
    items: { control: 'object' },
    footerItems: { control: 'object' },
    defaultExpanded: { control: 'boolean' },
    defaultActiveId: { control: 'text' },
    defaultMode: { control: 'radio', options: ['light', 'dark'] },
  },
  args: {
    hasSubItems: true,
    hasFooterItems: false,
    defaultExpanded: true,
    defaultActiveId: 'trade-research',
    defaultMode: 'light',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '100vh', minHeight: 640 }}>
        <Story />
        <div
          style={{
            flex: 1,
            padding: 24,
            color: 'var(--text-default)',
            background: 'var(--page-bg, var(--surface-page-bg))',
          }}
        >
          Page content
        </div>
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<NavLeftStoryArgs>

const sampleItemsWithSubs: NavLeftItem[] = [
  {
    id: 'trade',
    label: 'Trade',
    icon: 'nav-arrow-trade',
    iconOn: 'nav-arrow-trade-on',
    children: [
      { id: 'trade-research', label: 'Trade Research' },
      { id: 'omnibus-trade-details', label: 'Omnibus Trade Details' },
      { id: 'non-trans-omni-trades', label: 'Non-Trans. Omni. Trades' },
      { id: 'position-history', label: 'Position History' },
      { id: 'fund-information', label: 'Fund Information' },
      { id: 'manual-trade-review', label: 'Manual Trade Review' },
      { id: 'loi', label: 'LOI' },
    ],
  },
  {
    id: 'blocks',
    label: 'Blocks',
    icon: 'nav-document',
    iconOn: 'nav-document-on',
    children: [
      { id: 'block-list', label: 'Block List' },
      { id: 'block-detail', label: 'Block Detail' },
      { id: 'allocations', label: 'Allocations' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'nav-analytics',
    iconOn: 'nav-analytics-on',
    children: [
      { id: 'overview', label: 'Overview' },
      { id: 'reports', label: 'Reports' },
    ],
  },
]

const sampleFooterItems: NavLeftItem[] = [
  {
    id: 'snapshot',
    label: 'Snapshot',
    icon: 'nav-snapshot',
    iconOn: 'nav-snapshot-on',
  },
]

function applyDocumentMode(mode: NavMode) {
  if (mode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

function parseSubLabels(value: string): NavLeftSubItem[] {
  return value
    .split('|')
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label) => ({
      id: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label,
    }))
}

function resolveStoryNav(args: NavLeftStoryArgs): {
  items: NavLeftItem[]
  footerItems: NavLeftItem[]
  defaultActiveId: string
} {
  const items = args.hasSubItems
    ? sampleItemsWithSubs
    : navLeftFlatDefaults.items
  const footerItems = args.hasFooterItems ? sampleFooterItems : []
  const defaultActiveId = args.hasSubItems
    ? (args.defaultActiveId ?? 'trade-research')
    : 'analytics-flat'
  return { items, footerItems, defaultActiveId }
}

function InteractiveNavLeft(args: NavLeftStoryArgs) {
  const resolved = resolveStoryNav(args)
  const [mode, setMode] = useState<NavMode>(args.defaultMode ?? 'light')
  const [expanded, setExpanded] = useState(args.defaultExpanded ?? true)
  const [activeId, setActiveId] = useState(resolved.defaultActiveId)

  useEffect(() => {
    applyDocumentMode(mode)
  }, [mode])

  useEffect(() => {
    setExpanded(args.defaultExpanded ?? true)
  }, [args.defaultExpanded])

  useEffect(() => {
    setMode(args.defaultMode ?? 'light')
  }, [args.defaultMode])

  useEffect(() => {
    setActiveId(resolved.defaultActiveId)
  }, [args.hasSubItems, resolved.defaultActiveId])

  return (
    <NavLeft
      items={resolved.items}
      footerItems={resolved.footerItems}
      activeId={activeId}
      onNavigate={setActiveId}
      expanded={expanded}
      onExpandedChange={setExpanded}
      mode={mode}
      onModeChange={setMode}
    />
  )
}

export const Default: Story = {
  render: (args) => <InteractiveNavLeft {...args} />,
}

export const Collapsed: Story = {
  args: {
    hasSubItems: true,
    hasFooterItems: false,
    defaultExpanded: false,
  },
  render: (args) => <InteractiveNavLeft {...args} />,
}

export const WithFooter: Story = {
  name: 'With footer items',
  args: {
    hasSubItems: true,
    hasFooterItems: true,
  },
  render: (args) => <InteractiveNavLeft {...args} />,
}

export const WithoutSubItems: Story = {
  name: 'Without sub-items',
  args: {
    hasSubItems: false,
    hasFooterItems: false,
    defaultActiveId: 'analytics-flat',
  },
  render: (args) => <InteractiveNavLeft {...args} />,
}

export const DarkModeSelected: Story = {
  name: 'Dark mode selected',
  args: {
    hasSubItems: true,
    hasFooterItems: false,
    defaultMode: 'dark',
  },
  render: (args) => <InteractiveNavLeft {...args} />,
}

type ConfigurableArgs = {
  hasSubItems: boolean
  hasFooterItems: boolean
  item1Label: string
  item1Icon: IconName
  item1IconOn: IconName
  item1SubLabels: string
  item2Label: string
  item2Icon: IconName
  item2IconOn: IconName
  item2SubLabels: string
  item3Label: string
  item3Icon: IconName
  item3IconOn: IconName
  item3SubLabels: string
  footerLabel: string
  footerIcon: IconName
  footerIconOn: IconName
  defaultExpanded: boolean
  defaultMode: NavMode
}

/** Edit labels, icons, and pipe-separated sub-item names in Controls. */
export const Configurable: StoryObj<ConfigurableArgs> = {
  name: 'Configurable items',
  argTypes: {
    hasSubItems: { control: 'boolean' },
    hasFooterItems: { control: 'boolean' },
    item1Label: { name: 'Item 1 label', control: 'text' },
    item1Icon: { name: 'Item 1 icon', control: 'select', options: navIconNames },
    item1IconOn: { name: 'Item 1 icon on', control: 'select', options: navIconNames },
    item1SubLabels: {
      name: 'Item 1 sub-items',
      control: 'text',
      description: 'Pipe-separated. Used when hasSubItems is true.',
    },
    item2Label: { name: 'Item 2 label', control: 'text' },
    item2Icon: { name: 'Item 2 icon', control: 'select', options: navIconNames },
    item2IconOn: { name: 'Item 2 icon on', control: 'select', options: navIconNames },
    item2SubLabels: { name: 'Item 2 sub-items', control: 'text' },
    item3Label: { name: 'Item 3 label', control: 'text' },
    item3Icon: { name: 'Item 3 icon', control: 'select', options: navIconNames },
    item3IconOn: { name: 'Item 3 icon on', control: 'select', options: navIconNames },
    item3SubLabels: { name: 'Item 3 sub-items', control: 'text' },
    footerLabel: { name: 'Footer label', control: 'text' },
    footerIcon: { name: 'Footer icon', control: 'select', options: navIconNames },
    footerIconOn: { name: 'Footer icon on', control: 'select', options: navIconNames },
    defaultExpanded: { control: 'boolean' },
    defaultMode: { control: 'radio', options: ['light', 'dark'] },
  },
  args: {
    hasSubItems: true,
    hasFooterItems: false,
    item1Label: 'Trade',
    item1Icon: 'nav-arrow-trade',
    item1IconOn: 'nav-arrow-trade-on',
    item1SubLabels:
      'Trade Research | Omnibus Trade Details | Non-Trans. Omni. Trades | Position History | Fund Information | Manual Trade Review | LOI',
    item2Label: 'Blocks',
    item2Icon: 'nav-document',
    item2IconOn: 'nav-document-on',
    item2SubLabels: 'Block List | Block Detail | Allocations',
    item3Label: 'Analytics',
    item3Icon: 'nav-analytics',
    item3IconOn: 'nav-analytics-on',
    item3SubLabels: 'Overview | Reports',
    footerLabel: 'Snapshot',
    footerIcon: 'nav-snapshot',
    footerIconOn: 'nav-snapshot-on',
    defaultExpanded: true,
    defaultMode: 'light',
  },
  render: (args) => {
    const [mode, setMode] = useState<NavMode>(args.defaultMode)
    const [expanded, setExpanded] = useState(args.defaultExpanded)
    const [activeId, setActiveId] = useState('trade-research')

    useEffect(() => {
      applyDocumentMode(mode)
    }, [mode])

    useEffect(() => {
      setExpanded(args.defaultExpanded)
    }, [args.defaultExpanded])

    useEffect(() => {
      setMode(args.defaultMode)
    }, [args.defaultMode])

    const items = useMemo<NavLeftItem[]>(() => {
      const build = (
        id: string,
        label: string,
        icon: IconName,
        iconOn: IconName,
        subLabels: string,
      ): NavLeftItem => {
        const children = args.hasSubItems ? parseSubLabels(subLabels) : []
        return {
          id,
          label,
          icon,
          iconOn,
          ...(children.length ? { children } : {}),
        }
      }

      return [
        build('item-1', args.item1Label, args.item1Icon, args.item1IconOn, args.item1SubLabels),
        build('item-2', args.item2Label, args.item2Icon, args.item2IconOn, args.item2SubLabels),
        build('item-3', args.item3Label, args.item3Icon, args.item3IconOn, args.item3SubLabels),
      ]
    }, [args])

    const footerItems = useMemo<NavLeftItem[]>(
      () =>
        args.hasFooterItems
          ? [
              {
                id: 'footer',
                label: args.footerLabel,
                icon: args.footerIcon,
                iconOn: args.footerIconOn,
              },
            ]
          : [],
      [
        args.hasFooterItems,
        args.footerLabel,
        args.footerIcon,
        args.footerIconOn,
      ],
    )

    return (
      <NavLeft
        items={items}
        footerItems={footerItems}
        activeId={activeId}
        onNavigate={setActiveId}
        expanded={expanded}
        onExpandedChange={setExpanded}
        mode={mode}
        onModeChange={setMode}
      />
    )
  },
}
