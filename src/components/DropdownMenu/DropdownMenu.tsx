import './DropdownMenu.css'
import { Button } from '../Button/Button'
import { Link } from '../Link/Link'

interface MenuProps {
  children: React.ReactNode
  className?: string
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  accent?: boolean
}

interface ItemProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

interface FooterProps {
  onApply?: () => void
  onClear?: () => void
  applyLabel?: string
  clearLabel?: string
}

export function DropdownMenu({ children, className }: MenuProps) {
  const classes = ['dm', className].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}

export function DropdownSection({ children, className, accent }: SectionProps) {
  const classes = ['dm-section', accent ? 'dm-section-accent' : '', className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <div className="dm-list">{children}</div>
    </div>
  )
}

export function DropdownHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="dm-header">
      <span className="dm-header-text">{children}</span>
    </div>
  )
}

export function DropdownItem({ children, onClick, className }: ItemProps) {
  const classes = ['dm-item', className].filter(Boolean).join(' ')
  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}

export function DropdownFooter({ onApply, onClear, applyLabel = 'Apply', clearLabel = 'Clear' }: FooterProps) {
  return (
    <div className="dm-footer">
      <Button label={applyLabel} color="primary" variant="solid" size="sm" onClick={onApply} />
      <Link label={clearLabel} color="primary" size="sm" onClick={onClear} />
    </div>
  )
}
