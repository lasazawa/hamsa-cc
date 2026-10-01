import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    month: { control: { type: 'select' }, options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    year: { control: 'number' },
    minYear: { control: 'number' },
    maxYear: { control: 'number' },
  },
  args: {
    defaultYear: 2025,
    month: 2,
    minYear: 2000,
    maxYear: 2040,
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {}

export const SelectedYear: Story = {
  name: 'Selected year',
  args: {
    defaultYear: 2025,
    month: 2,
  },
}

export const NoSelection: Story = {
  name: 'No selection',
  args: {
    defaultYear: null,
    month: 2,
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [year, setYear] = useState<number | null>(2025)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Calendar
          {...args}
          year={year}
          onYearChange={setYear}
          onOk={(next) => setYear(next)}
          onClear={() => setYear(null)}
        />
        <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 'var(--font-body-sm)', color: 'var(--text-muted)' }}>
          Committed year: {year ?? 'none'}
        </span>
      </div>
    )
  },
}
