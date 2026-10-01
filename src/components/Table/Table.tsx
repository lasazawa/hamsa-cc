import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
  type HTMLAttributes,
} from 'react'
import './Table.css'
import { Button } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import { Link } from '../Link/Link'
import { Switch } from '../Switch/Switch'
import { Tabs, type TabItem } from '../Tabs/Tabs'
import scrollChevronLeft from './assets/scroll-chevron-a.svg'
import scrollChevronRight from './assets/scroll-chevron-b.svg'
import expandPlus from './assets/expand-plus.svg'

/* ── Context ─────────────────────────────────────────────────────────────── */

interface TableContextValue {
  collapsed: boolean
  toggleCollapsed: () => void
}

const TableContext = createContext<TableContextValue | null>(null)

function useTableContext() {
  return useContext(TableContext)
}

/* ── Table (root) ────────────────────────────────────────────────────────── */

export interface TableProps {
  children?: ReactNode
  className?: string
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function Table({
  children,
  className,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
}: TableProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultCollapsed)
  const isControlled = collapsedProp !== undefined
  const collapsed = isControlled ? collapsedProp : uncontrolled

  const toggleCollapsed = () => {
    const next = !collapsed
    if (!isControlled) setUncontrolled(next)
    onCollapsedChange?.(next)
  }

  const classes = ['table', collapsed && 'table--collapsed', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <TableContext.Provider value={{ collapsed, toggleCollapsed }}>
      <section className={classes}>{children}</section>
    </TableContext.Provider>
  )
}

/* ── TableHeader (module header) ─────────────────────────────────────────── */

export type { TabItem }

export interface TableHeaderProps {
  title?: ReactNode
  controls?: ReactNode
  /** Optional tab list. When omitted or empty, no tabs are shown. */
  tabs?: TabItem[]
  activeTabId?: string
  defaultActiveTabId?: string
  onTabChange?: (id: string) => void
  children?: ReactNode
  className?: string
}

export function TableHeader({
  title,
  controls,
  tabs,
  activeTabId: activeTabIdProp,
  defaultActiveTabId,
  onTabChange,
  children,
  className,
}: TableHeaderProps) {
  const classes = ['table__header', className ?? ''].filter(Boolean).join(' ')
  const showTabs = tabs != null && tabs.length > 0
  const initialTabId = defaultActiveTabId ?? tabs?.[0]?.id ?? ''
  const [uncontrolledTabId, setUncontrolledTabId] = useState(initialTabId)
  const isTabControlled = activeTabIdProp !== undefined
  const activeTabId = isTabControlled ? activeTabIdProp : uncontrolledTabId

  const handleTabChange = (id: string) => {
    if (!isTabControlled) setUncontrolledTabId(id)
    onTabChange?.(id)
  }

  return (
    <div className={classes}>
      <div className="table__header-row">
        {title != null && <h2 className="table__title">{title}</h2>}
        {controls != null && <div className="table__header-controls">{controls}</div>}
      </div>
      {(showTabs || children != null) && (
        <div className="table__header-extra">
          {showTabs && (
            <Tabs
              className="table__tabs"
              size="small"
              weight="regular"
              items={tabs}
              activeId={activeTabId}
              onChange={handleTabChange}
            />
          )}
          {children}
        </div>
      )}
    </div>
  )
}

/* ── TableControls (icon buttons in header) ──────────────────────────────── */

export interface TableControlsProps {
  showDownload?: boolean
  showDownloadMenu?: boolean
  showSettings?: boolean
  showCollapse?: boolean
  showEditMode?: boolean
  editModeOn?: boolean
  editModeLabel?: string
  showAdd?: boolean
  addLabel?: string
  showSave?: boolean
  saveLabel?: string
  showRefresh?: boolean
  onDownload?: () => void
  onDownloadMenu?: () => void
  onSettings?: () => void
  onCollapse?: () => void
  onEditModeChange?: (on: boolean) => void
  onAdd?: () => void
  onSave?: () => void
  onRefresh?: () => void
  className?: string
}

export function TableControls({
  showDownload = false,
  showDownloadMenu = true,
  showSettings = true,
  showCollapse = true,
  showEditMode = false,
  editModeOn = false,
  editModeLabel = 'Edit Mode Off',
  showAdd = false,
  addLabel = 'Add Data',
  showSave = false,
  saveLabel = 'Save Table',
  showRefresh = false,
  onDownload,
  onDownloadMenu,
  onSettings,
  onCollapse,
  onEditModeChange,
  onAdd,
  onSave,
  onRefresh,
  className,
}: TableControlsProps) {
  const ctx = useTableContext()
  const classes = ['table-controls', className ?? ''].filter(Boolean).join(' ')

  const handleCollapse = () => {
    onCollapse?.()
    ctx?.toggleCollapsed()
  }

  return (
    <div className={classes}>
      {showEditMode && (
        <div className="table-controls__edit">
          <span className="table-controls__edit-label">{editModeLabel}</span>
          <Switch
            checked={editModeOn}
            onChange={(e) => onEditModeChange?.(e.target.checked)}
          />
          <Icon name="settings-default" size={18} className="table-controls__lock" />
          <span className="table-controls__divider" aria-hidden="true" />
        </div>
      )}

      {showAdd && (
        <div className="table-controls__group">
          <Button label={addLabel} color="primary" variant="stroke" size="xs" onClick={onAdd} />
          <span className="table-controls__divider" aria-hidden="true" />
        </div>
      )}

      {showSave && (
        <div className="table-controls__group">
          <Button label={saveLabel} color="primary" variant="solid" size="xs" onClick={onSave} />
          {showRefresh && (
            <Link
              label="Refresh"
              size="xs"
              iconLeftName="refresh"
              iconRightName="chevron-down"
              onClick={onRefresh}
            />
          )}
          <span className="table-controls__divider" aria-hidden="true" />
        </div>
      )}

      {showDownload && !showDownloadMenu && (
        <IconButton
          aria-label="Download"
          iconName="download"
          color="primary"
          variant="stroke"
          size="xs"
          onClick={onDownload}
        />
      )}

      {showDownloadMenu && (
        <div className="table-controls__download-menu">
          <IconButton
            aria-label="Download"
            iconName="download"
            color="primary"
            variant="stroke"
            size="xs"
            onClick={onDownload}
          />
          <IconButton
            aria-label="Download options"
            iconName="chevron-down"
            color="primary"
            variant="ghost"
            size="xs"
            className="table-controls__download-chevron"
            onClick={onDownloadMenu}
          />
        </div>
      )}

      {showSettings && (
        <IconButton
          aria-label="Settings"
          iconName="settings-click"
          color="primary"
          variant="stroke"
          size="xs"
          onClick={onSettings}
        />
      )}

      {showCollapse && (
        <IconButton
          aria-label={ctx?.collapsed ? 'Expand table' : 'Collapse table'}
          iconName="chevron-down"
          color="secondary"
          variant="solid"
          size="xs"
          className="table-controls__collapse"
          aria-expanded={!ctx?.collapsed}
          onClick={handleCollapse}
        />
      )}
    </div>
  )
}

/* ── TableScroll (viewport + custom scrollbar) ───────────────────────────── */

export interface TableScrollProps {
  children?: ReactNode
  className?: string
  step?: number
}

export function TableScroll({ children, className, step = 160 }: TableScrollProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [overflow, setOverflow] = useState(false)
  const [thumbLeft, setThumbLeft] = useState(0)
  const [thumbWidth, setThumbWidth] = useState(48)

  const sync = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const hasOverflow = scrollWidth > clientWidth + 1
    setOverflow(hasOverflow)
    if (!hasOverflow) return
    const ratio = clientWidth / scrollWidth
    const width = Math.max(48, clientWidth * ratio)
    const maxLeft = clientWidth - width
    const left = scrollWidth === clientWidth ? 0 : (scrollLeft / (scrollWidth - clientWidth)) * maxLeft
    setThumbWidth(width)
    setThumbLeft(left)
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    sync()
    const onScroll = () => sync()
    el.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [sync, children])

  const scrollBy = (delta: number) => {
    viewportRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const onThumbPointerDown = (event: React.PointerEvent) => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    event.preventDefault()
    dragging.current = true
    const startX = event.clientX
    const startScroll = viewport.scrollLeft
    const { scrollWidth, clientWidth } = viewport
    const maxScroll = scrollWidth - clientWidth
    const maxThumb = clientWidth - thumbWidth

    const onMove = (e: PointerEvent) => {
      if (!dragging.current || maxThumb <= 0) return
      const dx = e.clientX - startX
      viewport.scrollLeft = startScroll + (dx / maxThumb) * maxScroll
    }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const onTrackPointerDown = (event: React.PointerEvent) => {
    if ((event.target as HTMLElement).closest('.table-scroll__btn')) return
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const rect = track.getBoundingClientRect()
    const { scrollWidth, clientWidth } = viewport
    const maxScroll = scrollWidth - clientWidth
    const maxThumb = clientWidth - thumbWidth
    if (maxThumb <= 0) return
    const x = event.clientX - rect.left - thumbWidth / 2
    viewport.scrollLeft = (Math.min(Math.max(0, x), maxThumb) / maxThumb) * maxScroll
  }

  const classes = ['table-scroll', overflow && 'table-scroll--overflow', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className="table-scroll__viewport" ref={viewportRef}>
        {children}
      </div>
      {overflow && (
        <div
          className="table-scroll__bar"
          ref={trackRef}
          onPointerDown={onTrackPointerDown}
        >
          <div className="table-scroll__track" aria-hidden="true" />
          <div
            className="table-scroll__thumb"
            style={{ left: thumbLeft, width: thumbWidth }}
          >
            <div
              className="table-scroll__btn"
              role="scrollbar"
              aria-orientation="horizontal"
              aria-controls={undefined}
              tabIndex={0}
              onPointerDown={onThumbPointerDown}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') scrollBy(-step)
                if (e.key === 'ArrowRight') scrollBy(step)
              }}
            >
              <button
                type="button"
                className="table-scroll__chevron"
                aria-label="Scroll left"
                onClick={(e) => {
                  e.stopPropagation()
                  scrollBy(-step)
                }}
              >
                <img src={scrollChevronLeft} alt="" width={10} height={9} />
              </button>
              <button
                type="button"
                className="table-scroll__chevron"
                aria-label="Scroll right"
                onClick={(e) => {
                  e.stopPropagation()
                  scrollBy(step)
                }}
              >
                <img src={scrollChevronRight} alt="" width={9} height={9} className="table-scroll__chevron--right" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── TableGrid (native table) ────────────────────────────────────────────── */

export function TableGrid({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLTableElement>) {
  const classes = ['table__grid', className ?? ''].filter(Boolean).join(' ')
  return (
    <table className={classes} {...rest}>
      {children}
    </table>
  )
}

export function TableHead({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={['table__head', className ?? ''].filter(Boolean).join(' ')} {...rest}>
      {children}
    </thead>
  )
}

export function TableBody({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={['table__body', className ?? ''].filter(Boolean).join(' ')} {...rest}>
      {children}
    </tbody>
  )
}

/* ── TableRow ────────────────────────────────────────────────────────────── */

export type TableRowState = 'default' | 'hover' | 'click' | 'delete'

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  state?: TableRowState
  interactive?: boolean
  selected?: boolean
}

export function TableRow({
  children,
  className,
  state = 'default',
  interactive = true,
  selected = false,
  ...rest
}: TableRowProps) {
  const resolvedState = selected ? 'click' : state
  const classes = [
    'table-row',
    interactive && 'table-row--interactive',
    resolvedState !== 'default' && `table-row--${resolvedState}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <tr className={classes} data-state={resolvedState} {...rest}>
      {children}
    </tr>
  )
}

/* ── Th ──────────────────────────────────────────────────────────────────── */

export type ThVariant = 'text' | 'checkbox' | 'expand' | 'blank'
export type TableCellSize = 'medium' | 'small'

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  variant?: ThVariant
  size?: TableCellSize
  sortable?: boolean
  sorted?: 'asc' | 'desc' | false
  showChevron?: boolean
  bordered?: boolean
  align?: 'left' | 'center' | 'right'
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
  onExpandAll?: () => void
  expanded?: boolean
}

export function Th({
  children,
  className,
  variant = 'text',
  size = 'medium',
  sortable = false,
  sorted = false,
  showChevron,
  bordered = true,
  align = 'left',
  checked,
  onCheckedChange,
  onExpandAll,
  expanded = false,
  ...rest
}: ThProps) {
  const chevron = showChevron ?? (variant === 'text' || variant === 'checkbox')
  const classes = [
    'table-th',
    `table-th--${size}`,
    `table-th--${variant}`,
    `table-th--align-${align}`,
    bordered && 'table-th--bordered',
    sorted && 'table-th--sorted',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <th className={classes} {...rest}>
      <div className="table-th__inner">
        {variant === 'text' && (
          <>
            {sortable && (
              <span className="table-th__sort" aria-hidden="true">
                <Icon name="chevron-down" size={10} />
              </span>
            )}
            <span className="table-th__label">{children}</span>
            {chevron && (
              <button type="button" className="table-th__chevron" aria-label="Column options">
                <Icon name="chevron-down" size={10} />
              </button>
            )}
          </>
        )}
        {variant === 'checkbox' && (
          <>
            <Checkbox
              size="sm"
              checked={checked}
              onChange={(e) => onCheckedChange?.(e.target.checked)}
            />
            {chevron && (
              <button type="button" className="table-th__chevron" aria-label="Selection options">
                <Icon name="chevron-down" size={10} />
              </button>
            )}
          </>
        )}
        {variant === 'expand' && (
          <button
            type="button"
            className={`table-th__expand${expanded ? ' table-th__expand--on' : ''}`}
            aria-label={expanded ? 'Collapse all' : 'Expand all'}
            aria-expanded={expanded}
            onClick={onExpandAll}
          >
            <img src={expandPlus} alt="" width={7} height={7} />
          </button>
        )}
        {variant === 'blank' && <span className="table-th__blank" />}
      </div>
    </th>
  )
}

/* ── Td ──────────────────────────────────────────────────────────────────── */

export type TdVariant =
  | 'text'
  | 'link'
  | 'link-copy'
  | 'currency'
  | 'label'
  | 'buy'
  | 'sell'
  | 'icons'
  | 'ellipses'
  | 'checkbox'
  | 'flag'
  | 'edit'
  | 'expand'

export type TdEditMode = 'default' | 'multi' | 'after' | 'add' | 'error'

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  variant?: TdVariant
  size?: TableCellSize
  align?: 'left' | 'center' | 'right'
  href?: string
  onCopy?: () => void
  onEllipses?: () => void
  editMode?: TdEditMode
  showEditChevron?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  expanded?: boolean
  onExpand?: () => void
  icons?: ReactNode
  labelTone?: 'green' | 'default'
}

export function Td({
  children,
  className,
  variant = 'text',
  size = 'medium',
  align,
  href,
  onCopy,
  onEllipses,
  editMode = 'default',
  showEditChevron = false,
  checked,
  onCheckedChange,
  expanded = false,
  onExpand,
  icons,
  labelTone = 'green',
  ...rest
}: TdProps) {
  const resolvedAlign =
    align ?? (variant === 'currency' || variant === 'ellipses' || variant === 'expand' ? 'center' : 'left')

  const classes = [
    'table-td',
    `table-td--${size}`,
    `table-td--${variant}`,
    `table-td--align-${resolvedAlign}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <td className={classes} {...rest}>
      <div className="table-td__inner">
        {variant === 'text' && <span className="table-td__text">{children}</span>}

        {variant === 'currency' && <span className="table-td__text">{children}</span>}

        {variant === 'link' && (
          <a className="table-td__link" href={href ?? '#'} onClick={(e) => !href && e.preventDefault()}>
            {children}
          </a>
        )}

        {variant === 'link-copy' && (
          <>
            <a className="table-td__link" href={href ?? '#'} onClick={(e) => !href && e.preventDefault()}>
              {children}
            </a>
            <button type="button" className="table-td__icon-btn" aria-label="Copy" onClick={onCopy}>
              <Icon name="nav-document" size={16} />
            </button>
          </>
        )}

        {variant === 'label' && (
          <span className={`table-td__label table-td__label--${labelTone}`}>{children}</span>
        )}

        {variant === 'buy' && (
          <span className="table-td__side table-td__side--buy">
            <span>{children ?? 'Buy'}</span>
            <Icon name="wallet" size={20} />
          </span>
        )}

        {variant === 'sell' && (
          <span className="table-td__side table-td__side--sell">
            <span>{children ?? 'Sell'}</span>
            <Icon name="wallet" size={20} />
          </span>
        )}

        {variant === 'icons' && (
          <>
            <span className="table-td__icons">{icons ?? <Icon name="inbox" size={18} />}</span>
            <span className="table-td__v-divider" aria-hidden="true" />
          </>
        )}

        {variant === 'checkbox' && (
          <>
            <Checkbox
              size="sm"
              checked={checked}
              onChange={(e) => onCheckedChange?.(e.target.checked)}
            />
            <span className="table-td__v-divider" aria-hidden="true" />
          </>
        )}

        {variant === 'flag' && (
          <>
            <Icon name="flag" size={16} />
            <span className="table-td__text">{children}</span>
          </>
        )}

        {variant === 'ellipses' && (
          <button type="button" className="table-td__ellipses" aria-label="Row actions" onClick={onEllipses}>
            <Icon name="ellipses" size={16} />
          </button>
        )}

        {variant === 'expand' && (
          <button
            type="button"
            className="table-td__expand-btn"
            aria-label={expanded ? 'Collapse row' : 'Expand row'}
            aria-expanded={expanded}
            onClick={onExpand}
          >
            <img src={expandPlus} alt="" width={7} height={7} />
          </button>
        )}

        {variant === 'edit' && (
          <span className={`table-td__edit table-td__edit--${editMode}`}>
            <span className="table-td__edit-value">
              <span className="table-td__edit-text">{children}</span>
              {showEditChevron && <Icon name="chevron-down" size={11} />}
            </span>
            <span className="table-td__edit-line" aria-hidden="true" />
          </span>
        )}
      </div>
    </td>
  )
}

/* ── TableFooter ─────────────────────────────────────────────────────────── */

export interface TableFooterProps {
  children?: ReactNode
  className?: string
}

export function TableFooter({ children, className }: TableFooterProps) {
  return (
    <div className={['table__footer', className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
