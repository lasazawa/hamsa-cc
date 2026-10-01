import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { layout: 'padded' },
  argTypes: {
    color:       { control: 'select', options: ['default', 'comment'] },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    supportingText: { control: 'text' },
    duoLabel:    { control: 'text' },
    error:       { control: 'boolean' },
    disabled:    { control: 'boolean' },
    iconLeft:    { control: 'boolean' },
    showChevron: { control: 'boolean' },
    duo:         { control: 'boolean' },
  },
  args: {
    color:       'default',
    label:       'Label',
    placeholder: 'Input Text',
    showChevron: true,
    error:       false,
    disabled:    false,
    iconLeft:    false,
    duo:         false,
    duoLabel:    'Name',
  },
}
export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {}

export const NoLabel: Story = {
  args: { label: undefined },
}

export const WithSearchIcon: Story = {
  args: { iconLeft: true },
}

export const WithSupportingText: Story = {
  args: { iconLeft: true, supportingText: 'Supporting text' },
}

export const DuoField: Story = {
  args: { duo: true, label: 'Label', showChevron: false },
}

export const Error: Story = {
  args: { error: true },
}

export const ErrorWithSupporting: Story = {
  args: { error: true, iconLeft: true, supportingText: 'Supporting text' },
}

export const ErrorDuo: Story = {
  args: { error: true, duo: true, showChevron: false },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Comment: Story = {
  args: { color: 'comment' },
}

export const CommentWithSearch: Story = {
  args: { color: 'comment', iconLeft: true },
}

export const CommentDuo: Story = {
  args: { color: 'comment', duo: true, showChevron: false },
}

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 260 }}>
      <TextField {...args} label="Label" showChevron />
      <TextField {...args} label={undefined} showChevron />
      <TextField {...args} label="Label" iconLeft showChevron />
      <TextField {...args} label="Label" iconLeft showChevron supportingText="Supporting text" />
      <TextField {...args} label="Label" duo showChevron={false} />
    </div>
  ),
  args: { color: 'default' },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 260px)', gap: '40px 32px' }}>
      {(['default', 'focus (live)', 'disabled', 'error'] as const).map((state) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>State: {state}</span>
          <TextField label="Label" placeholder="Input Text" disabled={state === 'disabled'} error={state === 'error'} />
          <TextField placeholder="Input Text" disabled={state === 'disabled'} error={state === 'error'} />
          <TextField label="Label" placeholder="Input Text" iconLeft disabled={state === 'disabled'} error={state === 'error'} />
          <TextField label="Label" placeholder="Input Text" iconLeft supportingText="Supporting text" disabled={state === 'disabled'} error={state === 'error'} />
          <TextField label="Label" placeholder="Input Text" duo showChevron={false} disabled={state === 'disabled'} error={state === 'error'} />
        </div>
      ))}
    </div>
  ),
}
