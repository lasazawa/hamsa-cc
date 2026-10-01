import type { Meta, StoryObj } from '@storybook/react'
import type { CSSProperties } from 'react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    padded: { control: 'boolean' },
  },
  args: {
    padded: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-header)',
          fontSize: 'var(--font-header-h3)',
          fontWeight: 'var(--font-header-h3-weight)' as CSSProperties['fontWeight'],
          letterSpacing: 'var(--font-header-h3-letter-spacing)',
          color: 'var(--text-default)',
        }}
      >
        Card title
      </h3>
      <p
        style={{
          margin: '12px 0 0',
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--font-body-md)',
          lineHeight: 1.35,
          color: 'var(--text-muted)',
        }}
      >
        Background, border, and shadow follow the active theme (UCL has elevation;
        JPM has none). Padding uses breakpoint tokens — 40×24 on desktop/tablet,
        24×24 on mobile.
      </p>
    </Card>
  ),
}

export const Empty: Story = {
  name: 'Empty shell',
  render: (args) => <Card {...args} style={{ minHeight: 160 }} />,
}

export const WithoutPadding: Story = {
  name: 'Without padding',
  args: { padded: false },
  render: (args) => (
    <Card {...args}>
      <div
        style={{
          padding: 16,
          background: 'var(--surface-card-accent)',
          color: 'var(--text-default)',
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--font-body-md)',
        }}
      >
        Custom inner padding when <code>padded=false</code>.
      </div>
    </Card>
  ),
}

export const NestedContent: Story = {
  name: 'Dynamic height',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card {...args}>
        <p style={{ margin: 0, color: 'var(--text-default)' }}>Short content</p>
      </Card>
      <Card {...args}>
        <p style={{ margin: 0, color: 'var(--text-default)' }}>
          Longer content grows the card height. Width stays 100% of the container
          so layout is driven by the parent, not a fixed card size.
        </p>
        <p style={{ margin: '12px 0 0', color: 'var(--text-muted)' }}>
          Swap Theme (UCL / JPM) and Mode (light / dark) in the toolbar to verify
          surface, border, and shadow tokens.
        </p>
      </Card>
    </div>
  ),
}
