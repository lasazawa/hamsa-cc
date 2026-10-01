import './Button.css'
import { Badge } from '../Badge/Badge'
import { Icon, type IconName } from '../Icon/Icon'

type Color   = 'primary' | 'secondary' | 'neutral'
type Variant = 'solid' | 'stroke'
type Size    = 'lg' | 'md' | 'sm' | 'xs'

interface ButtonProps {
  label?:          string
  children?:       React.ReactNode
  color?:          Color
  variant?:        Variant
  size?:           Size
  disabled?:       boolean
  iconLeft?:       React.ReactNode
  iconRight?:      React.ReactNode
  iconLeftName?:   IconName
  iconRightName?:  IconName
  badge?:          number
  onClick?:        React.MouseEventHandler<HTMLButtonElement>
}

type CSSVars = Record<string, string>

const colorVars: Record<Color, Partial<Record<Variant, CSSVars>>> = {
  primary: {
    solid: {
      '--_bg':      'var(--btn-primary-solid-bg)',
      '--_bg-h':    'var(--btn-primary-solid-bg-hover)',
      '--_bg-a':    'var(--btn-primary-solid-bg-active)',
      '--_bg-d':    'var(--btn-primary-solid-bg-disabled)',
      '--_text':    'var(--btn-primary-solid-text)',
      '--_text-h':  'var(--btn-primary-solid-text-hover)',
      '--_text-a':  'var(--btn-primary-solid-text-active)',
      '--_text-d':  'var(--btn-primary-solid-text-disabled)',
      '--_bc-f':    'var(--btn-focus-surface)',
      '--_ring':    'var(--btn-primary-focus-ring)',
    },
    stroke: {
      '--_bg':      'transparent',
      '--_bg-h':    'var(--btn-primary-solid-bg-hover)',
      '--_bg-a':    'var(--btn-primary-solid-bg-active)',
      '--_bg-d':    'transparent',
      '--_bg-f':    'var(--btn-focus-surface)',
      '--_text':    'var(--btn-primary-stroke-text)',
      '--_text-h':  'var(--btn-primary-solid-text-hover)',
      '--_text-a':  'var(--btn-primary-solid-text-active)',
      '--_text-d':  'var(--btn-primary-stroke-text-disabled)',
      '--_bc':      'var(--btn-primary-stroke-border)',
      '--_bc-h':    'transparent',
      '--_bc-a':    'transparent',
      '--_bc-d':    'var(--btn-primary-stroke-border-disabled)',
      '--_ring':    'var(--btn-primary-focus-ring)',
    },
  },
  secondary: {
    solid: {
      '--_bg':      'var(--btn-secondary-solid-bg)',
      '--_bg-h':    'var(--btn-secondary-solid-bg-hover)',
      '--_bg-a':    'var(--btn-secondary-solid-bg-active)',
      '--_bg-d':    'var(--btn-secondary-solid-bg-disabled)',
      '--_text':    'var(--btn-secondary-solid-text)',
      '--_text-h':  'var(--btn-secondary-solid-text-hover)',
      '--_text-a':  'var(--btn-secondary-solid-text-active)',
      '--_text-d':  'var(--btn-secondary-solid-text-disabled)',
      '--_bc-f':    'var(--btn-focus-surface)',
      '--_ring':    'var(--btn-secondary-focus-ring)',
    },
  },
  neutral: {
    solid: {
      '--_bg':      'var(--btn-neutral-solid-bg)',
      '--_bg-h':    'var(--btn-neutral-solid-bg-hover)',
      '--_bg-a':    'var(--btn-neutral-solid-bg-active)',
      '--_bg-d':    'var(--btn-neutral-solid-bg-disabled)',
      '--_text':    'var(--btn-neutral-solid-text)',
      '--_text-h':  'var(--btn-neutral-solid-text-hover)',
      '--_text-a':  'var(--btn-neutral-solid-text-active)',
      '--_text-d':  'var(--btn-neutral-solid-text-disabled)',
      '--_bc-f':    'var(--btn-focus-surface)',
      '--_ring':    'var(--btn-neutral-focus-ring)',
    },
    stroke: {
      '--_bg':      'transparent',
      '--_bg-h':    'var(--btn-neutral-stroke-bg-hover)',
      '--_bg-a':    'var(--btn-neutral-stroke-bg-active)',
      '--_bg-d':    'transparent',
      '--_bg-f':    'var(--btn-focus-surface)',
      '--_text':    'var(--btn-neutral-stroke-text)',
      '--_text-h':  'var(--btn-neutral-stroke-text-hover)',
      '--_text-a':  'var(--btn-neutral-stroke-text-active)',
      '--_text-d':  'var(--btn-neutral-stroke-text-disabled)',
      '--_bc':      'var(--btn-neutral-stroke-border)',
      '--_bc-h':    'var(--btn-neutral-stroke-border-hover)',
      '--_bc-a':    'var(--btn-neutral-stroke-border-active)',
      '--_bc-d':    'var(--btn-neutral-stroke-border-disabled)',
      '--_ring':    'var(--btn-neutral-focus-ring)',
    },
  },
}

export function Button({
  label,
  children,
  color         = 'primary',
  variant       = 'solid',
  size          = 'lg',
  disabled,
  iconLeft,
  iconRight,
  iconLeftName,
  iconRightName,
  badge,
  onClick,
}: ButtonProps) {
  const iconSize = { lg: 16, md: 14, sm: 13, xs: 11 }[size]
  const leftIcon  = iconLeft  ?? (iconLeftName  ? <Icon name={iconLeftName}  size={iconSize} /> : null)
  const rightIcon = iconRight ?? (iconRightName ? <Icon name={iconRightName} size={iconSize} /> : null)
  return (
    <button
      className={`btn btn-${size}`}
      style={colorVars[color][variant] as React.CSSProperties}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon  && <span className="shrink-0 flex items-center justify-center" style={{ width: iconSize, height: iconSize }}>{leftIcon}</span>}
      <span className="btn-label">{label ?? children}</span>
      {rightIcon && <span className="shrink-0 flex items-center justify-center" style={{ width: iconSize, height: iconSize }}>{rightIcon}</span>}
      {badge !== undefined && (
        <span className="absolute -top-[6px] -right-[5px]">
          <Badge count={badge} variant="success" />
        </span>
      )}
    </button>
  )
}
