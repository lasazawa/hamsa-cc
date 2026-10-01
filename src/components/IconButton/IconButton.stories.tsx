import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'stroke', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
    },
    corners: {
      control: 'select',
      options: ['round', 'soft'],
    },
  },
  args: {
    'aria-label': 'Search',
    iconName: 'search',
    color: 'primary',
    variant: 'solid',
    size: 'md',
    corners: 'round',
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {}

export const PrimarySolid: Story = {
  args: { color: 'primary', variant: 'solid' },
}

export const PrimaryStroke: Story = {
  args: { color: 'primary', variant: 'stroke' },
}

export const PrimaryGhost: Story = {
  args: { color: 'primary', variant: 'ghost' },
}

export const SecondarySolid: Story = {
  args: { color: 'secondary', variant: 'solid' },
}

export const NeutralSolid: Story = {
  args: { color: 'neutral', variant: 'solid' },
}

export const NeutralGhost: Story = {
  args: { color: 'neutral', variant: 'ghost' },
}

export const SoftCorners: Story = {
  args: { color: 'neutral', variant: 'solid', size: 'sm', corners: 'soft' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['lg', 'md', 'sm', 'xs'] as const).map((size) => (
        <IconButton key={size} {...args} size={size} aria-label={`Search ${size}`} />
      ))}
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => {
    const colors = ['primary', 'secondary', 'neutral'] as const
    const variants = ['solid', 'stroke', 'ghost'] as const
    const sizes = ['lg', 'md', 'sm', 'xs'] as const

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {colors.map((color) => (
          <div key={color} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {color}
            </div>
            {variants.map((variant) => {
              if (color === 'secondary' && variant !== 'solid') return null
              if (color === 'neutral' && variant === 'stroke') return null
              return (
                <div key={`${color}-${variant}`} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ width: 64, fontSize: 12, color: 'var(--text-muted)' }}>{variant}</span>
                  {sizes.map((size) => (
                    <IconButton
                      key={size}
                      aria-label={`${color} ${variant} ${size}`}
                      iconName="search"
                      color={color}
                      variant={variant}
                      size={size}
                    />
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  },
}
