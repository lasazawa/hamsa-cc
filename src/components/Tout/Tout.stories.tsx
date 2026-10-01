import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../Icon/Icon'
import { Tout } from './Tout'

const meta: Meta<typeof Tout> = {
  title: 'Components/Tout',
  component: Tout,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    trigger: {
      control: 'select',
      options: ['hover', 'click'],
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    text: 'Total AUM as of yesterday.',
    trigger: 'hover',
    placement: 'top',
  },
}
export default meta
type Story = StoryObj<typeof Tout>

/** Panel only — matches the Figma Tout symbol. */
export const Default: Story = {}

export const Hover: Story = {
  args: {
    trigger: 'hover',
    placement: 'top',
    children: <Icon name="circle" size={20} />,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
}

export const Click: Story = {
  args: {
    trigger: 'click',
    placement: 'top',
    children: <Icon name="circle" size={20} />,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
}

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 96,
        padding: 96,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tout text="Total AUM as of yesterday." placement="top" trigger="hover">
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Top</span>
      </Tout>
      <Tout text="Total AUM as of yesterday." placement="bottom" trigger="hover">
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Bottom</span>
      </Tout>
      <Tout text="Total AUM as of yesterday." placement="left" trigger="hover">
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Left</span>
      </Tout>
      <Tout text="Total AUM as of yesterday." placement="right" trigger="hover">
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Right</span>
      </Tout>
    </div>
  ),
}

export const OpenByDefault: Story = {
  args: {
    trigger: 'click',
    defaultOpen: true,
    children: <Icon name="circle" size={20} />,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
}
