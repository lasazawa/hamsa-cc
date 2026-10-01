import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import { iconData, type IconName } from './icons'

const allNames = Object.keys(iconData) as IconName[]

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: allNames },
    size: { control: 'number' },
  },
  args: {
    name: 'search',
    size: 20,
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      {allNames.map(name => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--surface-card-default)] border border-[var(--border-card-default)]">
            <Icon name={name} size={20} />
          </div>
          <span className="text-[var(--text-muted)] text-[11px] text-center w-16 leading-tight">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 p-4">
      {([12, 16, 20, 24, 32] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="search" size={size} />
          <span className="text-[var(--text-muted)] text-[11px]">{size}px</span>
        </div>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex gap-6 p-4">
      <Icon name="search" size={24} className="text-[var(--text-default)]" />
      <Icon name="search" size={24} className="text-[var(--link-primary-default)]" />
      <Icon name="search" size={24} className="text-[var(--link-error-default)]" />
      <Icon name="search" size={24} className="text-[var(--text-muted)]" />
    </div>
  ),
}
