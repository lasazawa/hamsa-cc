import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'
import { iconData } from '../Icon/icons'

const iconNames = [undefined, ...Object.keys(iconData)]

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    color:         { control: 'select', options: ['primary', 'error'] },
    size:          { control: 'select', options: ['xl', 'md', 'sm', 'xs', 'xxs'] },
    iconLeftName:  { control: 'select', options: iconNames },
    iconRightName: { control: 'select', options: iconNames },
  },
  args: {
    label:    'Text Link',
    color:    'primary',
    size:     'xl',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {}

export const Error: Story = {
  args: { color: 'error' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledError: Story = {
  args: { color: 'error', disabled: true },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Link label="Text Link" size="xl" />
      <Link label="Text Link" size="md" />
      <Link label="Text Link" size="sm" />
      <Link label="Text Link" size="xs" />
      <Link label="Text Link" size="xxs" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      {(['xl', 'md', 'sm', 'xs', 'xxs'] as const).map(size => (
        <div key={size} className="flex items-center gap-8">
          <span className="w-6 text-[var(--text-muted)] text-xs">{size}</span>
          <Link label="Text Link" color="primary" size={size} />
          <Link label="Text Link" color="primary" size={size} disabled />
          <Link label="Text Link" color="error"   size={size} />
          <Link label="Text Link" color="error"   size={size} disabled />
        </div>
      ))}
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="flex flex-col gap-8 p-6 rounded-xl"
      style={{ background: 'var(--surface-page-bg)' }}
    >
      {(['xl', 'md', 'sm', 'xs', 'xxs'] as const).map(size => (
        <div key={size} className="flex items-center gap-8">
          <span className="w-6 text-[var(--text-muted)] text-xs">{size}</span>
          <Link label="Text Link" color="primary" size={size} />
          <Link label="Text Link" color="primary" size={size} disabled />
          <Link label="Text Link" color="error"   size={size} />
          <Link label="Text Link" color="error"   size={size} disabled />
        </div>
      ))}
    </div>
  ),
}
