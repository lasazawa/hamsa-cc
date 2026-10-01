import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label:    'Label',
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const On: Story = {
  args: { defaultChecked: true },
}

export const Off: Story = {
  args: { defaultChecked: false },
}

export const NoLabel: Story = {
  args: { label: undefined },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledOn: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Switch
        label={checked ? 'On' : 'Off'}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 72 }}>On</span>
        <Switch defaultChecked label="Enabled" />
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 72 }}>Off</span>
        <Switch label="Enabled" />
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 72 }}>Inactive</span>
        <Switch disabled label="Disabled" />
      </div>
    </div>
  ),
}
