import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'info', 'warning'] },
    count:   { control: 'number' },
    max:     { control: 'number' },
  },
  args: {
    count: 23,
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = {
  args: { count: 23, variant: 'success' },
}

export const Error: Story = {
  args: { count: 2, variant: 'error' },
}

export const Info: Story = {
  args: { count: 5, variant: 'info' },
}

export const Warning: Story = {
  args: { count: 8, variant: 'warning' },
}

export const Overflow: Story = {
  args: { count: 142, variant: 'error', max: 99 },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge count={23} variant="success" />
      <Badge count={2}  variant="error" />
      <Badge count={5}  variant="info" />
      <Badge count={8}  variant="warning" />
      <Badge count={142} variant="error" max={99} />
    </div>
  ),
}
