import type { Meta, StoryObj } from '@storybook/react'
import { ToggleBtnPill } from './ToggleBtnPill'

const meta: Meta<typeof ToggleBtnPill> = {
  title: 'Components/ToggleBtnPill',
  component: ToggleBtnPill,
  tags: ['autodocs'],
  argTypes: {
    color:    { control: 'select', options: ['green', 'perriwinkle'] },
    selected: { control: 'boolean' },
    dragging: { control: 'boolean' },
  },
  args: {
    text:     'Trade Research',
    color:    'perriwinkle',
    selected: true,
    dragging: false,
  },
}

export default meta
type Story = StoryObj<typeof ToggleBtnPill>

export const Default: Story = {}

export const SelectedGreen: Story = {
  args: { color: 'green', selected: true },
}

export const Unselected: Story = {
  args: { selected: false },
}

export const DraggingPerriwinkle: Story = {
  args: { color: 'perriwinkle', selected: true, dragging: true },
}

export const DraggingGreen: Story = {
  args: { color: 'green', selected: true, dragging: true },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex gap-3 items-center">
        <span className="w-44 text-sm text-[var(--text-muted)]">Perriwinkle selected</span>
        <ToggleBtnPill color="perriwinkle" selected />
      </div>
      <div className="flex gap-3 items-center">
        <span className="w-44 text-sm text-[var(--text-muted)]">Green selected</span>
        <ToggleBtnPill color="green" selected />
      </div>
      <div className="flex gap-3 items-center">
        <span className="w-44 text-sm text-[var(--text-muted)]">Perriwinkle drag</span>
        <ToggleBtnPill color="perriwinkle" selected dragging />
      </div>
      <div className="flex gap-3 items-center">
        <span className="w-44 text-sm text-[var(--text-muted)]">Green drag</span>
        <ToggleBtnPill color="green" selected dragging />
      </div>
      <div className="flex gap-3 items-center">
        <span className="w-44 text-sm text-[var(--text-muted)]">Unselected</span>
        <ToggleBtnPill selected={false} />
      </div>
    </div>
  ),
}
