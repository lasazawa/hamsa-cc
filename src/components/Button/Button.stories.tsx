import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { iconData } from '../Icon/icons'

const iconNames = [undefined, ...Object.keys(iconData)]

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color:         { control: 'select', options: ['primary', 'secondary', 'neutral'] },
    variant:       { control: 'select', options: ['solid', 'stroke'] },
    size:          { control: 'select', options: ['lg', 'md', 'sm', 'xs'] },
    iconLeftName:  { control: 'select', options: iconNames },
    iconRightName: { control: 'select', options: iconNames },
  },
  args: {
    label:   'Button',
    color:   'primary',
    variant: 'solid',
    size:    'lg',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const PrimaryStroke: Story = {
  args: { color: 'primary', variant: 'stroke' },
}

export const Secondary: Story = {
  args: { color: 'secondary', variant: 'solid' },
}

export const Neutral: Story = {
  args: { color: 'neutral', variant: 'solid' },
}

export const NeutralStroke: Story = {
  args: { color: 'neutral', variant: 'stroke' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const WithBadge: Story = {
  args: { badge: 5 },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button label="Large"  color="primary" variant="solid" size="lg" />
      <Button label="Medium" color="primary" variant="solid" size="md" />
      <Button label="Small"  color="primary" variant="solid" size="sm" />
      <Button label="XSmall" color="primary" variant="solid" size="xs" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {(['primary', 'secondary', 'neutral'] as const).map(color => (
        <div key={color} className="flex items-center gap-3">
          <span className="w-20 text-[var(--text-muted)] text-sm capitalize">{color}</span>
          <Button label="Solid"  color={color} variant="solid"  size="lg" />
          <Button label="Stroke" color={color} variant="stroke" size="lg" />
          <Button label="Disabled solid"  color={color} variant="solid"  size="lg" disabled />
          <Button label="Disabled stroke" color={color} variant="stroke" size="lg" disabled />
        </div>
      ))}
    </div>
  ),
}
