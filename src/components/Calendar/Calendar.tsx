import { useEffect, useMemo, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import { Link } from '../Link/Link'
import './Calendar.css'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Committed year. Use with `onYearChange` for a controlled picker. */
  year?: number | null
  /** Initial year when uncontrolled. */
  defaultYear?: number | null
  /** Month shown in the header (0–11). */
  month?: number
  minYear?: number
  maxYear?: number
  onYearChange?: (year: number | null) => void
  onClear?: () => void
  onCancel?: () => void
  onOk?: (year: number | null) => void
  clearLabel?: string
  cancelLabel?: string
  okLabel?: string
}

export function Calendar({
  year: yearProp,
  defaultYear = new Date().getFullYear(),
  month = new Date().getMonth(),
  minYear = 1970,
  maxYear = 2100,
  onYearChange,
  onClear,
  onCancel,
  onOk,
  clearLabel = 'Clear',
  cancelLabel = 'Cancel',
  okLabel = 'OK',
  className,
  ...rest
}: CalendarProps) {
  const isControlled = yearProp !== undefined
  const [uncontrolledYear, setUncontrolledYear] = useState<number | null>(defaultYear)
  const committedYear = isControlled ? yearProp : uncontrolledYear
  const [pendingYear, setPendingYear] = useState<number | null>(committedYear)
  const selectedRef = useRef<HTMLButtonElement>(null)

  const years = useMemo(() => {
    const list: number[] = []
    for (let y = minYear; y <= maxYear; y += 1) list.push(y)
    return list
  }, [minYear, maxYear])

  useEffect(() => {
    setPendingYear(committedYear)
  }, [committedYear])

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  const commit = (next: number | null) => {
    if (!isControlled) setUncontrolledYear(next)
    onYearChange?.(next)
  }

  const handleClear = () => {
    setPendingYear(null)
    commit(null)
    onClear?.()
  }

  const handleCancel = () => {
    setPendingYear(committedYear)
    onCancel?.()
  }

  const handleOk = () => {
    commit(pendingYear)
    onOk?.(pendingYear)
  }

  const monthName = MONTH_NAMES[Math.min(11, Math.max(0, month))] ?? MONTH_NAMES[0]
  const headerYear = pendingYear ?? committedYear ?? new Date().getFullYear()
  const classes = ['calendar', className ?? ''].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="calendar__header">
        <button type="button" className="calendar__month-btn" aria-label={`${monthName} ${headerYear}`}>
          <span className="calendar__month">{monthName}</span>
          <span className="calendar__header-year">{headerYear}</span>
          <Icon name="chevron-down" size={8} className="calendar__chevron" />
        </button>
      </div>

      <div className="calendar__years" role="listbox" aria-label="Year">
        {years.map((y) => {
          const selected = pendingYear === y
          return (
            <button
              key={y}
              ref={selected ? selectedRef : undefined}
              type="button"
              role="option"
              aria-selected={selected}
              className={['calendar__year', selected && 'calendar__year--selected']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setPendingYear(y)}
            >
              {y}
            </button>
          )
        })}
      </div>

      <div className="calendar__footer">
        <Link
          label={clearLabel}
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            handleClear()
          }}
        />
        <div className="calendar__footer-end">
          <Link
            label={cancelLabel}
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              handleCancel()
            }}
          />
          <Link
            label={okLabel}
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              handleOk()
            }}
          />
        </div>
      </div>
    </div>
  )
}
