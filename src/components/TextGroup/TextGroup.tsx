import './TextGroup.css'
import { Link } from '../Link/Link'

type Layout = 'stacked' | 'inline'
type Size   = 'medium' | 'large'
type Weight = 'medium' | 'bold'

interface TextGroupProps {
  label:         string
  value:         string
  layout?:       Layout
  labelCaps?:    boolean
  weight?:       Weight
  size?:         Size
  editMode?:     boolean
  href?:         string
  onValueClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?:    string
}

export function TextGroup({
  label,
  value,
  layout       = 'stacked',
  labelCaps    = true,
  weight       = 'medium',
  size         = 'medium',
  editMode     = false,
  href,
  onValueClick,
  className,
}: TextGroupProps) {
  const isLink = Boolean(href || onValueClick)
  const caps = weight === 'bold' ? true : labelCaps

  const classes = [
    'text-group',
    `text-group--${layout}`,
    `text-group--${weight}`,
    weight === 'bold' && `text-group--size-${size}`,
    editMode && 'text-group--edit',
    caps && 'text-group--caps',
    isLink && 'text-group--link',
    className ?? '',
  ].filter(Boolean).join(' ')

  const linkSize =
    weight === 'bold'
      ? size === 'large' ? 'xl' : 'md'
      : caps ? 'xs' : 'sm'

  let valueNode: React.ReactNode
  if (isLink) {
    valueNode = (
      <Link
        label={value}
        href={href ?? '#'}
        color="primary"
        size={linkSize}
        onClick={onValueClick}
      />
    )
  } else if (editMode) {
    valueNode = <span className="text-group__value text-group__value--edit">{value}</span>
  } else {
    valueNode = <span className="text-group__value">{value}</span>
  }

  return (
    <div className={classes}>
      <span className="text-group__label">{label}</span>
      {valueNode}
    </div>
  )
}
