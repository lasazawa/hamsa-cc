import type { Meta, StoryObj } from '@storybook/react'
import { TextGroup } from './TextGroup'

const meta: Meta<typeof TextGroup> = {
  title: 'Components/TextGroup',
  component: TextGroup,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    layout:    { control: 'select', options: ['stacked', 'inline'] },
    weight:    { control: 'select', options: ['medium', 'bold'] },
    size:      { control: 'select', options: ['medium', 'large'] },
    labelCaps: { control: 'boolean' },
    editMode:  { control: 'boolean' },
  },
  args: {
    label:     'Label Name:',
    value:     'Data Value',
    layout:    'stacked',
    weight:    'medium',
    size:      'medium',
    labelCaps: true,
    editMode:  false,
  },
}
export default meta
type Story = StoryObj<typeof TextGroup>

export const Default: Story = {}

export const StackedCaps: Story = {
  args: { layout: 'stacked', labelCaps: true, label: 'Label Name:' },
}

export const StackedTitleCase: Story = {
  args: { layout: 'stacked', labelCaps: false, label: 'Label Name:' },
}

export const StackedLink: Story = {
  args: {
    layout: 'stacked',
    labelCaps: false,
    label: 'Label Name:',
    href: '#',
  },
}

export const StackedEditMode: Story = {
  args: {
    layout: 'stacked',
    labelCaps: false,
    editMode: true,
    label: 'Label Name:',
  },
}

export const InlineCaps: Story = {
  args: { layout: 'inline', labelCaps: true, label: 'Label Name:' },
}

export const InlineTitleCase: Story = {
  args: { layout: 'inline', labelCaps: false, label: 'Label Name:' },
}

export const BoldMedium: Story = {
  args: { weight: 'bold', size: 'medium', label: 'Label Name' },
}

export const BoldLarge: Story = {
  args: { weight: 'bold', size: 'large', label: 'Label Name' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Text Group</span>
        <TextGroup label="Label Name:" value="Data Value" layout="stacked" labelCaps />
        <TextGroup label="Label Name:" value="Data Value" layout="stacked" labelCaps={false} />
        <TextGroup label="Label Name:" value="Data Value" layout="stacked" labelCaps={false} href="#" />
        <TextGroup label="Label Name:" value="Data Value" layout="stacked" labelCaps={false} editMode />
        <TextGroup label="Label Name:" value="Data Value" layout="inline" labelCaps />
        <TextGroup label="Label Name:" value="Data Value" layout="inline" labelCaps={false} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Text Group Bold</span>
        <TextGroup label="Label Name" value="Data Value" weight="bold" size="medium" />
        <TextGroup label="Label Name" value="Data Value" weight="bold" size="large" />
      </div>
    </div>
  ),
}
