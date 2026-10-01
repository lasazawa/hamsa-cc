import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  argTypes: {
    size:     { control: 'select', options: ['md', 'sm', 'xs', 'xxs'] },
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size:     'md',
    label:    'Label',
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const NoLabel: Story = {
  args: { label: undefined },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        label={checked ? 'Checked' : 'Unchecked'}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    )
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['md', 'sm', 'xs', 'xxs'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 28 }}>{size}</span>
          <Checkbox size={size} label="Checked"   defaultChecked />
          <Checkbox size={size} label="Unchecked" />
        </div>
      ))}
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '20px 32px', alignItems: 'start' }}>
      {(['md', 'sm', 'xs', 'xxs'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{size}</span>
          <Checkbox size={size} label="Checked"   defaultChecked />
          <Checkbox size={size} label="Default" />
          <Checkbox size={size} label="Disabled"  disabled />
        </div>
      ))}
    </div>
  ),
}
