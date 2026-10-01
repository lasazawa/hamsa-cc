import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../Icon/Icon'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: 'select',
      options: ['center', 'start', 'end'],
    },
  },
  args: {
    text: 'Tooltip copy goes here, yay!',
    placement: 'bottom',
    align: 'center',
  },
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}

export const Top: Story = {
  args: { placement: 'top' },
}

export const Bottom: Story = {
  args: { placement: 'bottom' },
}

export const Left: Story = {
  args: { placement: 'left' },
}

export const Right: Story = {
  args: { placement: 'right' },
}

export const WithIcon: Story = {
  args: {
    text: 'Tooltip copy goes here, yay!',
    icon: <Icon name="edit" size={16} />,
  },
}

export const CenteredPlacements: Story = {
  name: 'Centered (all sides)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        alignItems: 'flex-start',
        padding: 32,
      }}
    >
      <Tooltip placement="bottom" text="Tooltip copy goes here, yay!" />
      <Tooltip placement="top" text="Tooltip copy goes here, yay!" />
      <Tooltip placement="right" text="Tooltip copy goes here, yay!" />
      <Tooltip placement="left" text="Tooltip copy goes here, yay!" />
    </div>
  ),
}

export const OffCenter: Story = {
  name: 'Off center (top / bottom)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        alignItems: 'flex-start',
        padding: 32,
      }}
    >
      <Tooltip placement="bottom" align="start" text="Off center tooltip text" />
      <Tooltip placement="bottom" align="end" text="Off center tooltip text" />
      <Tooltip placement="top" align="start" text="Off center tooltip text" />
      <Tooltip placement="top" align="end" text="Off center tooltip text" />
    </div>
  ),
}

export const OffCenterSides: Story = {
  name: 'Off center (left / right)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        alignItems: 'flex-start',
        padding: 32,
      }}
    >
      <Tooltip placement="left" align="start" text="Off center tooltip text" />
      <Tooltip placement="left" align="end" text="Off center tooltip text" />
      <Tooltip placement="right" align="start" text="Off center tooltip text" />
      <Tooltip placement="right" align="end" text="Off center tooltip text" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const
    const aligns = ['start', 'center', 'end'] as const

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: 32,
          padding: 40,
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        {placements.flatMap((placement) =>
          aligns.map((align) => (
            <Tooltip
              key={`${placement}-${align}`}
              placement={placement}
              align={align}
              text={`${placement} · ${align}`}
            />
          )),
        )}
      </div>
    )
  },
}
