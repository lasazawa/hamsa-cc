import { createContext, useContext, useState } from 'react'
import './Filter.css'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Link } from '../Link/Link'
import { TextGroup } from '../TextGroup/TextGroup'

type FilterLayout = 'default' | 'vertical-search' | 'vertical-tabs' | 'horizontal'

interface FilterContextValue {
  collapsed: boolean
  toggle:    () => void
  layout:    FilterLayout
}

const FilterContext = createContext<FilterContextValue | null>(null)

function useFilterContext() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('Filter sub-components must be used within <Filter>')
  return ctx
}

/* ── Filter (root) ─────────────────────────────────────────────────────── */

interface FilterProps {
  layout?:             FilterLayout
  collapsed?:          boolean
  defaultCollapsed?:   boolean
  onCollapsedChange?:  (collapsed: boolean) => void
  children?:           React.ReactNode
  className?:          string
}

export function Filter({
  layout            = 'default',
  collapsed: collapsedProp,
  defaultCollapsed  = false,
  onCollapsedChange,
  children,
  className,
}: FilterProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultCollapsed)
  const isControlled = collapsedProp !== undefined
  const collapsed = isControlled ? collapsedProp : uncontrolled

  const toggle = () => {
    const next = !collapsed
    if (!isControlled) setUncontrolled(next)
    onCollapsedChange?.(next)
  }

  const classes = [
    'filter',
    `filter--${layout}`,
    collapsed && 'filter--collapsed',
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <FilterContext.Provider value={{ collapsed, toggle, layout }}>
      <section className={classes}>{children}</section>
    </FilterContext.Provider>
  )
}

/* ── FilterCount ───────────────────────────────────────────────────────── */

interface FilterCountProps {
  count:      number
  className?: string
}

export function FilterCount({ count, className }: FilterCountProps) {
  const classes = ['filter-count', className ?? ''].filter(Boolean).join(' ')
  return (
    <span className={classes} aria-label={`${count} filters applied`}>
      <Icon name="filter" size={16} className="filter-count__icon" />
      <span className="filter-count__value">{count}</span>
    </span>
  )
}

/* ── FilterHeader ──────────────────────────────────────────────────────── */

interface FilterHeaderProps {
  title?:          string
  requiredLabel?:  string | false
  count?:          number
  showAccordion?:  boolean
  children?:       React.ReactNode
  className?:      string
}

export function FilterHeader({
  title,
  requiredLabel = '*Required',
  count,
  showAccordion = true,
  children,
  className,
}: FilterHeaderProps) {
  const { collapsed, toggle } = useFilterContext()
  const classes = ['filter-header', className ?? ''].filter(Boolean).join(' ')
  const showCount = count !== undefined && collapsed

  return (
    <div className={classes}>
      <div className="filter-header__start">
        {title ? <h2 className="filter-header__title">{title}</h2> : null}
        {children}
      </div>
      <div className="filter-header__end">
        {requiredLabel !== false && requiredLabel && !collapsed && (
          <span className="filter-header__required">{requiredLabel}</span>
        )}
        {showCount && collapsed && <FilterCount count={count!} />}
        {showAccordion && (
          <button
            type="button"
            className="filter-accordion"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand filter' : 'Collapse filter'}
            onClick={toggle}
          >
            <span className={`filter-accordion__icon${collapsed ? ' filter-accordion__icon--collapsed' : ''}`}>
              <Icon name="chevron-down" size={16} />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

/* ── FilterBody ────────────────────────────────────────────────────────── */

interface FilterBodyProps {
  children?:  React.ReactNode
  className?: string
}

export function FilterBody({ children, className }: FilterBodyProps) {
  const { collapsed } = useFilterContext()
  if (collapsed) return null
  const classes = ['filter-body', className ?? ''].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}

/* ── FilterButtonRow ───────────────────────────────────────────────────── */

interface FilterButtonRowProps {
  submitLabel?: string
  onSubmit?:    () => void
  children?:    React.ReactNode
  className?:   string
}

export function FilterButtonRow({
  submitLabel = 'Submit',
  onSubmit,
  children,
  className,
}: FilterButtonRowProps) {
  const { collapsed } = useFilterContext()
  if (collapsed) return null
  const classes = ['filter-button-row', className ?? ''].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {children ?? (
        <Button
          label={submitLabel}
          color="primary"
          variant="solid"
          size="xs"
          onClick={onSubmit}
        />
      )}
    </div>
  )
}

/* ── FilterPanel (nested card, used by horizontal / vertical layouts) ──── */

interface FilterPanelProps {
  children?:  React.ReactNode
  className?: string
  nested?:    boolean
}

export function FilterPanel({ children, className, nested = false }: FilterPanelProps) {
  const classes = [
    'filter-panel',
    nested && 'filter-panel--nested',
    className ?? '',
  ].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}

/* ── FilterToolbar (Advanced Search + count row) ───────────────────────── */

interface FilterToolbarProps {
  advancedLabel?: string
  onAdvancedClick?: () => void
  count?:         number
  className?:     string
}

export function FilterToolbar({
  advancedLabel = 'Advanced Search',
  onAdvancedClick,
  count,
  className,
}: FilterToolbarProps) {
  const { collapsed } = useFilterContext()
  if (collapsed) return null
  const classes = ['filter-toolbar', className ?? ''].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Link
        label={advancedLabel}
        href="#"
        color="primary"
        size="md"
        iconRightName="chevron-down"
        onClick={(e) => {
          e.preventDefault()
          onAdvancedClick?.()
        }}
      />
      {count !== undefined && <FilterCount count={count} />}
    </div>
  )
}

/* ── FilterSavedCriteria ───────────────────────────────────────────────── */

interface FilterSavedCriteriaProps {
  label?:     string
  onClick?:   () => void
  className?: string
}

export function FilterSavedCriteria({
  label     = 'Saved Criteria',
  onClick,
  className,
}: FilterSavedCriteriaProps) {
  const classes = ['filter-saved', className ?? ''].filter(Boolean).join(' ')
  return (
    <button type="button" className={classes} onClick={onClick}>
      <span className="filter-saved__label">{label}</span>
      <Icon name="chevron-down" size={14} className="filter-saved__icon" />
    </button>
  )
}

/* ── FilterSummary (horizontal layout data columns) ────────────────────── */

interface FilterSummaryItem {
  label: string
  value: string
}

interface FilterSummaryProps {
  columns:    FilterSummaryItem[][]
  className?: string
}

export function FilterSummary({ columns, className }: FilterSummaryProps) {
  const { collapsed } = useFilterContext()
  if (collapsed) return null
  const classes = ['filter-summary', className ?? ''].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {columns.map((col, i) => (
        <div key={i} className="filter-summary__col">
          {col.map((item, j) => (
            <TextGroup
              key={j}
              label={item.label}
              value={item.value}
              layout="inline"
              labelCaps
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── FilterFields (grid of children) ───────────────────────────────────── */

interface FilterFieldsProps {
  children?:  React.ReactNode
  className?: string
  columns?:   1 | 2 | 3 | 4
}

export function FilterFields({ children, className, columns = 4 }: FilterFieldsProps) {
  const { collapsed } = useFilterContext()
  if (collapsed) return null
  const classes = [
    'filter-fields',
    `filter-fields--cols-${columns}`,
    className ?? '',
  ].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}
