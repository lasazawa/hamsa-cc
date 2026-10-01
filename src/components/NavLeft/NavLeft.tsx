import { useState } from 'react'
import './NavLeft.css'
import { Icon, type IconName } from '../Icon/Icon'
import { Tout } from '../Tout/Tout'
import moonOff from './assets/moon-off.svg'
import moonOffHover from './assets/moon-off-hover.svg'
import moonOn from './assets/moon-on.svg'
import moonOnHover from './assets/moon-on-hover.svg'
import sunOff from './assets/sun-off.svg'
import sunOffHover from './assets/sun-off-hover.svg'
import sunOn from './assets/sun-on.svg'
import sunOnHover from './assets/sun-on-hover.svg'

export type NavMode = 'light' | 'dark'

export interface NavLeftSubItem {
  id: string
  label: string
}

export interface NavLeftItem {
  id: string
  label: string
  /** Unselected / default icon */
  icon: IconName
  /** Selected / hover icon (typically the `-on` variant) */
  iconOn?: IconName
  /**
   * Nested links. When present, expanded layout becomes:
   * divider → icon (above) → eyebrow label → sub-items.
   * The collapsed hover tout uses the same structure.
   */
  children?: NavLeftSubItem[]
}

export interface NavLeftProps {
  items?: NavLeftItem[]
  footerItems?: NavLeftItem[]
  activeId?: string
  defaultActiveId?: string
  onNavigate?: (id: string) => void
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  mode?: NavMode
  defaultMode?: NavMode
  onModeChange?: (mode: NavMode) => void
  className?: string
}

const defaultItems: NavLeftItem[] = [
  {
    id: 'trade',
    label: 'Trade',
    icon: 'nav-arrow-trade',
    iconOn: 'nav-arrow-trade-on',
    children: [
      { id: 'trade-research', label: 'Trade Research' },
      { id: 'omnibus-trade-details', label: 'Omnibus Trade Details' },
      { id: 'non-trans-omni-trades', label: 'Non-Trans. Omni. Trades' },
      { id: 'position-history', label: 'Position History' },
      { id: 'fund-information', label: 'Fund Information' },
      { id: 'manual-trade-review', label: 'Manual Trade Review' },
      { id: 'loi', label: 'LOI' },
    ],
  },
  {
    id: 'blocks',
    label: 'Blocks',
    icon: 'nav-document',
    iconOn: 'nav-document-on',
    children: [
      { id: 'block-list', label: 'Block List' },
      { id: 'block-detail', label: 'Block Detail' },
      { id: 'allocations', label: 'Allocations' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'nav-analytics',
    iconOn: 'nav-analytics-on',
    children: [
      { id: 'overview', label: 'Overview' },
      { id: 'reports', label: 'Reports' },
    ],
  },
]

const defaultFlatItems: NavLeftItem[] = [
  { id: 'home', label: 'Home', icon: 'nav-dashboard', iconOn: 'nav-dashboard-on' },
  { id: 'blocks-flat', label: 'Blocks', icon: 'nav-document', iconOn: 'nav-document-on' },
  { id: 'transactions', label: 'Transactions', icon: 'nav-arrow-trade', iconOn: 'nav-arrow-trade-on' },
  { id: 'analytics-flat', label: 'Analytics', icon: 'nav-analytics', iconOn: 'nav-analytics-on' },
]

const defaultFooterItems: NavLeftItem[] = [
  { id: 'snapshot', label: 'Snapshot', icon: 'nav-snapshot', iconOn: 'nav-snapshot-on' },
]

/** Flat (no sub-items) defaults — used by stories that opt into the simple layout. */
export const navLeftFlatDefaults = {
  items: defaultFlatItems,
  footerItems: [] as NavLeftItem[],
}

/** Sample footer item(s) for stories that enable hasFooterItems. */
export const navLeftFooterDefaults = {
  footerItems: defaultFooterItems,
}

function itemOrChildActive(item: NavLeftItem, activeId: string): boolean {
  if (item.id === activeId) return true
  return item.children?.some((child) => child.id === activeId) ?? false
}

function hasAnySubItems(items: NavLeftItem[], footerItems: NavLeftItem[]): boolean {
  return [...items, ...footerItems].some((item) => Boolean(item.children?.length))
}

function NavArrowButton({
  expanded,
  onClick,
}: {
  expanded: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="nav-left__arrow"
      aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'}
      aria-expanded={expanded}
      onClick={onClick}
    >
      <Icon
        name={expanded ? 'nav-collapse' : 'nav-expand'}
        size={16}
        className="nav-left__arrow-icon"
      />
    </button>
  )
}

function NavSubItemButton({
  item,
  selected,
  onClick,
}: {
  item: NavLeftSubItem
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={[
        'nav-left__subitem',
        selected && 'nav-left__subitem--selected',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={selected ? 'page' : undefined}
      onClick={onClick}
    >
      <span className="nav-left__subitem-notch" aria-hidden="true" />
      <span className="nav-left__subitem-label">{item.label}</span>
    </button>
  )
}

function NavSectionIcon({
  item,
  selected,
  onClick,
}: {
  item: NavLeftItem
  selected: boolean
  onClick?: () => void
}) {
  const iconName = selected ? (item.iconOn ?? item.icon) : item.icon
  const hoverIcon = item.iconOn ?? item.icon

  const classes = [
    'nav-left__section-icon',
    selected && 'nav-left__section-icon--selected',
  ]
    .filter(Boolean)
    .join(' ')

  const glyphs = (
    <span className="nav-left__icon-wrap" aria-hidden="true">
      <Icon
        name={iconName}
        size={20}
        className="nav-left__icon nav-left__icon--base"
      />
      {!selected && (
        <Icon
          name={hoverIcon}
          size={20}
          className="nav-left__icon nav-left__icon--hover"
        />
      )}
    </span>
  )

  if (!onClick) {
    return <div className={classes}>{glyphs}</div>
  }

  return (
    <button
      type="button"
      className={classes}
      aria-label={item.label}
      onClick={onClick}
    >
      {glyphs}
    </button>
  )
}

function NavFlyout({
  item,
  activeId,
  onNavigate,
}: {
  item: NavLeftItem
  activeId: string
  onNavigate: (id: string) => void
}) {
  const hasChildren = Boolean(item.children?.length)
  const selected = itemOrChildActive(item, activeId)

  if (!hasChildren) {
    return (
      <div className="nav-left__flyout nav-left__flyout--simple">
        <p className="nav-left__flyout-label nav-left__flyout-label--active">
          {item.label}
        </p>
      </div>
    )
  }

  return (
    <div className="nav-left__flyout nav-left__flyout--menu">
      <div className="nav-left__flyout-header-group">
        <NavSectionIcon item={item} selected={selected} />
        <div className="nav-left__section-eyebrow">{item.label}</div>
      </div>
      <ul className="nav-left__flyout-list">
        {item.children!.map((child) => {
          const childSelected = child.id === activeId
          return (
            <li key={child.id}>
              <button
                type="button"
                className={[
                  'nav-left__flyout-item',
                  childSelected && 'nav-left__flyout-item--selected',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={childSelected ? 'page' : undefined}
                onClick={() => onNavigate(child.id)}
              >
                <span className="nav-left__subitem-notch" aria-hidden="true" />
                <span>{child.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function NavItemButton({
  item,
  selected,
  exactSelected,
  expanded,
  onClick,
}: {
  item: NavLeftItem
  selected: boolean
  exactSelected: boolean
  expanded: boolean
  onClick: () => void
}) {
  const iconName = selected ? (item.iconOn ?? item.icon) : item.icon
  const hoverIcon = item.iconOn ?? item.icon

  return (
    <button
      type="button"
      className={[
        'nav-left__item',
        selected && 'nav-left__item--selected',
        exactSelected && 'nav-left__item--exact',
        !expanded && 'nav-left__item--collapsed',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={exactSelected ? 'page' : undefined}
      onClick={onClick}
    >
      <span className="nav-left__tick" aria-hidden="true" />
      <span className="nav-left__icon-wrap" aria-hidden="true">
        <Icon
          name={iconName}
          size={20}
          className="nav-left__icon nav-left__icon--base"
        />
        {!selected && (
          <Icon
            name={hoverIcon}
            size={20}
            className="nav-left__icon nav-left__icon--hover"
          />
        )}
      </span>
      {expanded && <span className="nav-left__label">{item.label}</span>}
    </button>
  )
}

function NavSectionExpanded({
  item,
  activeId,
  onNavigate,
}: {
  item: NavLeftItem
  activeId: string
  onNavigate: (id: string) => void
}) {
  const selected = itemOrChildActive(item, activeId)

  return (
    <div className="nav-left__section">
      <div className="nav-left__section-header">
        <div className="nav-left__section-divider" aria-hidden="true" />
        <NavSectionIcon
          item={item}
          selected={selected}
          onClick={() => onNavigate(item.id)}
        />
        <div className="nav-left__section-eyebrow">{item.label}</div>
      </div>
      <ul className="nav-left__sublist">
        {item.children!.map((child) => (
          <li key={child.id}>
            <NavSubItemButton
              item={child}
              selected={child.id === activeId}
              onClick={() => onNavigate(child.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function NavItemGroup({
  item,
  activeId,
  expanded,
  onNavigate,
}: {
  item: NavLeftItem
  activeId: string
  expanded: boolean
  onNavigate: (id: string) => void
}) {
  const selected = itemOrChildActive(item, activeId)
  const exactSelected = item.id === activeId
  const hasChildren = Boolean(item.children?.length)

  if (expanded && hasChildren) {
    return (
      <li className="nav-left__group nav-left__group--section">
        <NavSectionExpanded
          item={item}
          activeId={activeId}
          onNavigate={onNavigate}
        />
      </li>
    )
  }

  const itemButton = (
    <NavItemButton
      item={item}
      selected={selected}
      exactSelected={exactSelected}
      expanded={expanded}
      onClick={() => onNavigate(item.id)}
    />
  )

  if (!expanded) {
    return (
      <li className="nav-left__group">
        <Tout
          className="nav-left__tout"
          placement="right"
          trigger="hover"
          content={
            <NavFlyout
              item={item}
              activeId={activeId}
              onNavigate={onNavigate}
            />
          }
        >
          {itemButton}
        </Tout>
      </li>
    )
  }

  return <li className="nav-left__group">{itemButton}</li>
}

function ModeToggle({
  mode,
  showLabels,
  onChange,
}: {
  mode: NavMode
  showLabels: boolean
  onChange: (mode: NavMode) => void
}) {
  const isDark = mode === 'dark'

  return (
    <div className="nav-left__mode">
      <div
        className="nav-left__mode-switch"
        role="group"
        aria-label="Color mode"
      >
        <button
          type="button"
          className={[
            'nav-left__mode-btn',
            'nav-left__mode-btn--dark',
            isDark && 'nav-left__mode-btn--selected',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-pressed={isDark}
          aria-label="Dark mode"
          onClick={() => onChange('dark')}
        >
          <span className="nav-left__mode-icon">
            <img
              src={isDark ? moonOn : moonOff}
              alt=""
              width={12.5}
              height={12.57}
              className="nav-left__mode-glyph nav-left__mode-glyph--rest"
            />
            <img
              src={isDark ? moonOnHover : moonOffHover}
              alt=""
              width={12.5}
              height={12.57}
              className="nav-left__mode-glyph nav-left__mode-glyph--hover"
            />
          </span>
        </button>
        <button
          type="button"
          className={[
            'nav-left__mode-btn',
            'nav-left__mode-btn--light',
            !isDark && 'nav-left__mode-btn--selected',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-pressed={!isDark}
          aria-label="Light mode"
          onClick={() => onChange('light')}
        >
          <span className="nav-left__mode-icon">
            <img
              src={isDark ? sunOff : sunOn}
              alt=""
              width={12.5}
              height={12.57}
              className="nav-left__mode-glyph nav-left__mode-glyph--rest"
            />
            <img
              src={isDark ? sunOffHover : sunOnHover}
              alt=""
              width={12.5}
              height={12.57}
              className="nav-left__mode-glyph nav-left__mode-glyph--hover"
            />
          </span>
        </button>
      </div>
      {showLabels && (
        <div className="nav-left__mode-labels" aria-hidden="true">
          <span className={isDark ? 'nav-left__mode-label--active' : 'nav-left__mode-label--muted'}>
            Dark Mode
          </span>
          <span className={!isDark ? 'nav-left__mode-label--active' : 'nav-left__mode-label--muted'}>
            Light Mode
          </span>
        </div>
      )}
    </div>
  )
}

export function NavLeft({
  items = defaultItems,
  footerItems = [],
  activeId: activeIdProp,
  defaultActiveId = 'trade-research',
  onNavigate,
  expanded: expandedProp,
  defaultExpanded = true,
  onExpandedChange,
  mode: modeProp,
  defaultMode = 'light',
  onModeChange,
  className,
}: NavLeftProps) {
  const [uncontrolledActive, setUncontrolledActive] = useState(defaultActiveId)
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded)
  const [uncontrolledMode, setUncontrolledMode] = useState<NavMode>(defaultMode)

  const activeId = activeIdProp ?? uncontrolledActive
  const expanded = expandedProp ?? uncontrolledExpanded
  const mode = modeProp ?? uncontrolledMode
  const sectionLayout = hasAnySubItems(items, footerItems)

  const setExpanded = (next: boolean) => {
    if (expandedProp === undefined) setUncontrolledExpanded(next)
    onExpandedChange?.(next)
  }

  const setActive = (id: string) => {
    if (activeIdProp === undefined) setUncontrolledActive(id)
    onNavigate?.(id)
  }

  const setMode = (next: NavMode) => {
    if (modeProp === undefined) setUncontrolledMode(next)
    onModeChange?.(next)
  }

  const classes = [
    'nav-left',
    expanded ? 'nav-left--expanded' : 'nav-left--collapsed',
    sectionLayout && 'nav-left--has-subitems',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav className={classes} aria-label="Primary">
      <div className="nav-left__inner">
        <div className="nav-left__top">
          <div className="nav-left__header">
            <NavArrowButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
            {!sectionLayout || !expanded ? (
              <div className="nav-left__divider" aria-hidden="true" />
            ) : null}
          </div>

          <ul
            className={[
              'nav-left__list',
              sectionLayout && expanded && 'nav-left__list--sections',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {items.map((item) => (
              <NavItemGroup
                key={item.id}
                item={item}
                activeId={activeId}
                expanded={expanded}
                onNavigate={setActive}
              />
            ))}
          </ul>
        </div>

        <div className="nav-left__footer">
          {footerItems.length > 0 && (
            <ul
              className={[
                'nav-left__list',
                'nav-left__list--footer',
                sectionLayout && expanded && 'nav-left__list--sections',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {footerItems.map((item) => (
                <NavItemGroup
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  expanded={expanded}
                  onNavigate={setActive}
                />
              ))}
            </ul>
          )}
          <div className="nav-left__divider" aria-hidden="true" />
          <ModeToggle mode={mode} showLabels={expanded} onChange={setMode} />
        </div>
      </div>
    </nav>
  )
}
