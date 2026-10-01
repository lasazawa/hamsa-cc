import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from './Drawer'
import { TextField } from '../TextField/TextField'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    popOut:    { control: 'boolean' },
    minimized: { control: 'boolean' },
    title:     { control: 'text' },
    eyebrow:   { control: 'text' },
  },
  args: {
    title:    'Sunshine Co.',
    eyebrow:  'PENDING APPROVAL',
    popOut:   true,
    minimized: false,
    primaryAction:   { label: 'Review Buy' },
    secondaryAction: { label: 'Cancel' },
    tertiaryAction:  { label: 'Clear Form' },
  },
}
export default meta
type Story = StoryObj<typeof Drawer>

const sampleFields = (
  <>
    <TextField label="*Fund Identification" duoLabel="JPNX" placeholder="Symbol" duo />
    <TextField label="*Account Identification" duoLabel="000000000" placeholder="BIN" duo />
    <TextField label="Settlement Cycle" placeholder="Settlement Cycle" />
    <TextField label="*Trade Date" placeholder="Trade Date" />
    <TextField label="*Trade Amount" placeholder="*Trade Amount" showChevron={false} />
    <TextField label="ROA / LOI Amount" placeholder="ROA / LOI Amount" showChevron={false} />
    <TextField label="Discount Category" placeholder="Discount Category" showChevron={false} />
    <TextField label="Payment Date" placeholder="Payment Date" />
    <TextField label="Border Notification..." placeholder="Border Notification..." />
    <TextField label="Generate Omnibus Trade" placeholder="Generate Omnibus Trade" />
  </>
)

export const Default: Story = {
  render: (args) => <Drawer {...args}>{sampleFields}</Drawer>,
}

export const PopOut: Story = {
  args: { popOut: true },
  render: (args) => <Drawer {...args}>{sampleFields}</Drawer>,
}

export const Docked: Story = {
  args: { popOut: false },
  render: (args) => <Drawer {...args}>{sampleFields}</Drawer>,
}

export const Minimized: Story = {
  args: {
    minimized: true,
    minimizedTitle: 'TRADE RESEARCH',
    minimizedEyebrow: 'BUY',
  },
}

export const NoFooter: Story = {
  args: {
    primaryAction: undefined,
    secondaryAction: undefined,
    tertiaryAction: undefined,
  },
  render: (args) => <Drawer {...args}>{sampleFields}</Drawer>,
}

export const FixedFooter: Story = {
  args: { footerFixed: true },
  render: (args) => (
    <div style={{ position: 'relative', height: 640 }}>
      <Drawer {...args}>{sampleFields}</Drawer>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <Drawer
        popOut
        title="Sunshine Co."
        eyebrow="PENDING APPROVAL"
        primaryAction={{ label: 'Review Buy' }}
        secondaryAction={{ label: 'Cancel' }}
        tertiaryAction={{ label: 'Clear Form' }}
      >
        {sampleFields}
      </Drawer>
      <Drawer
        popOut
        minimized
        minimizedTitle="TRADE RESEARCH"
        minimizedEyebrow="BUY"
      />
      <Drawer
        popOut={false}
        title="Sunshine Co."
        eyebrow="PENDING APPROVAL"
        primaryAction={{ label: 'Review Buy' }}
        secondaryAction={{ label: 'Cancel' }}
        tertiaryAction={{ label: 'Clear Form' }}
      >
        {sampleFields}
      </Drawer>
    </div>
  ),
}
