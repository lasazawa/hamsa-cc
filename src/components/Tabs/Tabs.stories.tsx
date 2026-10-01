import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, Tab } from './Tabs'

const sampleItems = [
  { id: '1', label: 'Tile' },
  { id: '2', label: 'Tile' },
  { id: '3', label: 'Tile' },
  { id: '4', label: 'Tile' },
  { id: '5', label: 'Tile' },
  { id: '6', label: 'Tile' },
  { id: '7', label: 'Tile' },
  { id: '8', label: 'Tile' },
  { id: '9', label: 'Tile' },
]

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    size:   { control: 'select', options: ['large', 'medium', 'small'] },
    weight: { control: 'select', options: ['medium', 'regular'] },
  },
  args: {
    size:     'large',
    weight:   'medium',
    items:    sampleItems,
    activeId: '1',
  },
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.activeId ?? '1')
    return <Tabs {...args} activeId={active} onChange={setActive} />
  },
}

export const LargeMedium: Story = {
  args: { size: 'large', weight: 'medium' },
  render: Default.render,
}

export const LargeRegular: Story = {
  args: { size: 'large', weight: 'regular' },
  render: Default.render,
}

export const MediumMedium: Story = {
  args: { size: 'medium', weight: 'medium' },
  render: Default.render,
}

export const MediumRegular: Story = {
  args: { size: 'medium', weight: 'regular' },
  render: Default.render,
}

export const SmallMedium: Story = {
  args: { size: 'small', weight: 'medium' },
  render: Default.render,
}

export const SmallRegular: Story = {
  args: { size: 'small', weight: 'regular' },
  render: Default.render,
}

export const WithCount: Story = {
  render: () => {
    const [active, setActive] = useState('a')
    return (
      <Tabs
        size="small"
        weight="regular"
        activeId={active}
        onChange={setActive}
        items={[
          { id: 'a', label: 'Tile', count: 23 },
          { id: 'b', label: 'Tile', count: 23 },
          { id: 'c', label: 'Tile' },
        ]}
      />
    )
  },
}

export const SingleTab: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {([
        ['large', 'medium'],
        ['large', 'regular'],
        ['medium', 'medium'],
        ['medium', 'regular'],
        ['small', 'medium'],
        ['small', 'regular'],
      ] as const).map(([size, weight]) => (
        <div key={`${size}-${weight}`} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Tab id={`${size}-${weight}-on`} label="Tile" selected size={size} weight={weight} />
          <Tab id={`${size}-${weight}-off`} label="Tile" size={size} weight={weight} />
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => {
    const variants = [
      ['large', 'medium'],
      ['large', 'regular'],
      ['medium', 'medium'],
      ['medium', 'regular'],
      ['small', 'medium'],
      ['small', 'regular'],
    ] as const
    const [active, setActive] = useState<Record<string, string>>(
      Object.fromEntries(variants.map(([s, w]) => [`${s}-${w}`, '1'])),
    )
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {variants.map(([size, weight]) => {
          const key = `${size}-${weight}`
          return (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {size} / {weight}
              </span>
              <Tabs
                size={size}
                weight={weight}
                items={sampleItems}
                activeId={active[key]}
                onChange={(id) => setActive((s) => ({ ...s, [key]: id }))}
              />
            </div>
          )
        })}
      </div>
    )
  },
}
