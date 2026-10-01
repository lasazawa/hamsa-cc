import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: { layout: 'padded' },
  argTypes: {
    color:         { control: 'select', options: ['default', 'comment'] },
    label:         { control: 'text' },
    placeholder:   { control: 'text' },
    supportingText: { control: 'text' },
    maxLength:     { control: 'number' },
    rows:          { control: 'number' },
    error:         { control: 'boolean' },
    disabled:      { control: 'boolean' },
  },
  args: {
    color:       'default',
    label:       'Label',
    placeholder: 'Input Text',
    maxLength:   300,
    rows:        3,
    error:       false,
    disabled:    false,
  },
}
export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {}

export const Comment: Story = {
  args: { color: 'comment' },
}

export const Error: Story = {
  args: { error: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const NoMaxLength: Story = {
  args: { maxLength: undefined, label: 'Notes' },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 260px)', gap: '40px 32px' }}>
      {(['default', 'error', 'disabled'] as const).map((state) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>State: {state}</span>
          <TextArea label="Label" placeholder="Input Text" maxLength={300} disabled={state === 'disabled'} error={state === 'error'} />
        </div>
      ))}
    </div>
  ),
}
