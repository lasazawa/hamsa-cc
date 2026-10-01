import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'padded' },
  argTypes: {
    size:     { control: 'select', options: ['md', 'sm', 'xs', 'xxs'] },
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size:     'md',
    label:    'Option',
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof Radio>

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

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('a')
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        {['Option A', 'Option B', 'Option C'].map((opt, i) => {
          const val = String.fromCharCode(97 + i)
          return (
            <Radio
              key={val}
              name="group"
              value={val}
              label={opt}
              checked={value === val}
              onChange={() => setValue(val)}
            />
          )
        })}
      </div>
    )
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['md', 'sm', 'xs', 'xxs'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 28 }}>{size}</span>
          <Radio size={size} label="Checked" defaultChecked name={`size-${size}`} />
          <Radio size={size} label="Default" name={`size-${size}`} />
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
          <Radio size={size} label="Checked"  defaultChecked name={`states-${size}`} />
          <Radio size={size} label="Default"  name={`states-${size}`} />
          <Radio size={size} label="Disabled" disabled />
        </div>
      ))}
    </div>
  ),
}
