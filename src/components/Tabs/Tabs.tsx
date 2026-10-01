import './Tabs.css'
import { Badge } from '../Badge/Badge'

type Size   = 'large' | 'medium' | 'small'
type Weight = 'medium' | 'regular'

export interface TabItem {
  id:     string
  label:  string
  count?: number
}

interface TabsProps {
  items:      TabItem[]
  activeId?:  string
  onChange?:  (id: string) => void
  size?:      Size
  weight?:    Weight
  className?: string
}

interface TabProps {
  id:         string
  label:      string
  selected?:  boolean
  count?:     number
  size?:      Size
  weight?:    Weight
  onClick?:   () => void
  className?: string
}

const sizeWeightDefaults: Record<Size, Weight> = {
  large:  'medium',
  medium: 'medium',
  small:  'regular',
}

export function Tab({
  id,
  label,
  selected = false,
  count,
  size    = 'large',
  weight,
  onClick,
  className,
}: TabProps) {
  const resolvedWeight = weight ?? sizeWeightDefaults[size]
  const classes = [
    'tab',
    `tab--size-${size}`,
    `tab--weight-${resolvedWeight}`,
    selected && 'tab--selected',
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={selected}
      className={classes}
      onClick={onClick}
    >
      <span className="tab__indicator" aria-hidden="true" />
      <span className="tab__row">
        <span className="tab__label">{label}</span>
        {count !== undefined && (
          <Badge count={count} variant="success" />
        )}
      </span>
    </button>
  )
}

export function Tabs({
  items,
  activeId,
  onChange,
  size    = 'large',
  weight,
  className,
}: TabsProps) {
  const resolvedWeight = weight ?? sizeWeightDefaults[size]
  const classes = [
    'tabs',
    `tabs--${size}`,
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} role="tablist">
      {items.map((item) => (
        <Tab
          key={item.id}
          id={item.id}
          label={item.label}
          count={item.count}
          selected={item.id === activeId}
          size={size}
          weight={resolvedWeight}
          onClick={() => onChange?.(item.id)}
        />
      ))}
    </div>
  )
}
