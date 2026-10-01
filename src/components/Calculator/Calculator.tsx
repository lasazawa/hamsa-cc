import { useState, type ChangeEvent } from 'react'
import './Calculator.css'
import { Button } from '../Button/Button'
import { TextField } from '../TextField/TextField'

export interface CalculatorFieldValues {
  fundType: string
  fundValue: string
  accountType: string
  accountValue: string
  distributionDate: string
  field2: string
  field3: string
  field4: string
}

export interface CalculatorProps {
  searchTitle?: string
  calculateTitle?: string
  searchLabel?: string
  calculateLabel?: string
  fundLabel?: string
  accountLabel?: string
  fundTypeOptions?: string[]
  accountTypeOptions?: string[]
  values?: Partial<CalculatorFieldValues>
  defaultValues?: Partial<CalculatorFieldValues>
  calculateDisabled?: boolean
  searchDisabled?: boolean
  onSearch?: (values: CalculatorFieldValues) => void
  onCalculate?: (values: CalculatorFieldValues) => void
  onChange?: (values: CalculatorFieldValues) => void
  className?: string
}

const defaults: CalculatorFieldValues = {
  fundType: 'Symbol',
  fundValue: 'JPNX',
  accountType: 'BIN',
  accountValue: '032102321654065',
  distributionDate: '',
  field2: '',
  field3: '',
  field4: '',
}

export function Calculator({
  searchTitle = 'Search Criteria',
  calculateTitle = 'Calculate Distribution',
  searchLabel = 'Search',
  calculateLabel = 'Calculate',
  fundLabel = 'Fund Identification',
  accountLabel = 'Account Identification',
  values: valuesProp,
  defaultValues,
  calculateDisabled = true,
  searchDisabled = false,
  onSearch,
  onCalculate,
  onChange,
  className,
}: CalculatorProps) {
  const [uncontrolled, setUncontrolled] = useState<CalculatorFieldValues>({
    ...defaults,
    ...defaultValues,
  })
  const isControlled = valuesProp !== undefined
  const values: CalculatorFieldValues = isControlled
    ? { ...defaults, ...valuesProp }
    : uncontrolled

  const update = (patch: Partial<CalculatorFieldValues>) => {
    const next = { ...values, ...patch }
    if (!isControlled) setUncontrolled(next)
    onChange?.(next)
  }

  const fieldChange =
    (key: keyof CalculatorFieldValues) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      update({ [key]: e.target.value })
    }

  const classes = ['calculator', className ?? ''].filter(Boolean).join(' ')

  return (
    <section className={classes} data-theme="dark">
      <div className="calculator__search">
        <h2 className="calculator__title">{searchTitle}</h2>

        <div className="calculator__fields">
          <TextField
            className="calculator__field"
            label={fundLabel}
            duo
            duoLabel={values.fundType}
            duoClearable={Boolean(values.fundValue)}
            onDuoClear={() => update({ fundValue: '' })}
            value={values.fundValue}
            onChange={fieldChange('fundValue')}
            showChevron={false}
          />
          <TextField
            className="calculator__field"
            label={accountLabel}
            duo
            duoLabel={values.accountType}
            duoClearable={Boolean(values.accountValue)}
            onDuoClear={() => update({ accountValue: '' })}
            value={values.accountValue}
            onChange={fieldChange('accountValue')}
            showChevron={false}
          />
        </div>

        <div className="calculator__actions">
          <Button
            label={searchLabel}
            color="primary"
            variant="solid"
            size="xs"
            disabled={searchDisabled}
            onClick={() => onSearch?.(values)}
          />
        </div>
      </div>

      <div className="calculator__body">
        <h2 className="calculator__title calculator__title--muted">{calculateTitle}</h2>

        <div className="calculator__fields">
          <TextField
            className="calculator__field"
            placeholder="Input Text"
            value={values.distributionDate}
            onChange={fieldChange('distributionDate')}
            showChevron={false}
            iconRightName="calendar"
          />
          <TextField
            className="calculator__field"
            placeholder="Input Text"
            value={values.field2}
            onChange={fieldChange('field2')}
            showChevron={false}
          />
          <TextField
            className="calculator__field"
            placeholder="Input Text"
            value={values.field3}
            onChange={fieldChange('field3')}
            showChevron={false}
          />
          <TextField
            className="calculator__field"
            placeholder="Input Text"
            value={values.field4}
            onChange={fieldChange('field4')}
            showChevron={false}
          />
        </div>

        <div className="calculator__actions">
          <Button
            label={calculateLabel}
            color="primary"
            variant="solid"
            size="xs"
            disabled={calculateDisabled}
            onClick={() => onCalculate?.(values)}
          />
        </div>
      </div>
    </section>
  )
}
