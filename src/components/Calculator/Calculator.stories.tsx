import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Calculator, type CalculatorFieldValues } from './Calculator'

const meta: Meta<typeof Calculator> = {
  title: 'Components/Calculator',
  component: Calculator,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Calculator>

export const Default: Story = {}

export const CalculateEnabled: Story = {
  name: 'Calculate enabled',
  args: {
    calculateDisabled: false,
    defaultValues: {
      distributionDate: '03/14/2026',
      field2: '1000',
      field3: '50',
      field4: 'USD',
    },
  },
}

export const EmptySearch: Story = {
  name: 'Empty search',
  args: {
    defaultValues: {
      fundValue: '',
      accountValue: '',
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [values, setValues] = useState<CalculatorFieldValues>({
      fundType: 'Symbol',
      fundValue: 'JPNX',
      accountType: 'BIN',
      accountValue: '032102321654065',
      distributionDate: '',
      field2: '',
      field3: '',
      field4: '',
    })
    const canCalculate = Boolean(
      values.distributionDate && values.field2 && values.field3 && values.field4,
    )

    return (
      <Calculator
        values={values}
        onChange={setValues}
        calculateDisabled={!canCalculate}
        onSearch={(v) => console.log('search', v)}
        onCalculate={(v) => console.log('calculate', v)}
      />
    )
  },
}
