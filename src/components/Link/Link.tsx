import './Link.css'
import { Icon, type IconName } from '../Icon/Icon'

type Color = 'primary' | 'error'
type Size  = 'xl' | 'md' | 'sm' | 'xs' | 'xxs'

interface LinkProps {
  label?:         string
  children?:      React.ReactNode
  href?:          string
  color?:         Color
  size?:          Size
  disabled?:      boolean
  iconLeft?:      React.ReactNode
  iconRight?:     React.ReactNode
  iconLeftName?:  IconName
  iconRightName?: IconName
  onClick?:       React.MouseEventHandler<HTMLAnchorElement>
}

type CSSVars = Record<string, string>

const colorVars: Record<Color, CSSVars> = {
  primary: {
    '--_color':   'var(--link-primary-default)',
    '--_color-h': 'var(--link-primary-hover)',
    '--_color-a': 'var(--link-primary-active)',
    '--_color-d': 'var(--link-primary-disabled)',
  },
  error: {
    '--_color':   'var(--link-error-default)',
    '--_color-h': 'var(--link-error-hover)',
    '--_color-a': 'var(--link-error-active)',
    '--_color-d': 'var(--link-error-disabled)',
  },
}

export function Link({
  label,
  children,
  href = '#',
  color         = 'primary',
  size          = 'xl',
  disabled,
  iconLeft,
  iconRight,
  iconLeftName,
  iconRightName,
  onClick,
}: LinkProps) {
  const iconSize = { xl: 18, md: 16, sm: 15, xs: 14, xxs: 13 }[size]
  const leftIcon  = iconLeft  ?? (iconLeftName  ? <Icon name={iconLeftName}  size={iconSize} /> : null)
  const rightIcon = iconRight ?? (iconRightName ? <Icon name={iconRightName} size={iconSize} /> : null)
  return (
    <a
      className={`link link-${size}`}
      style={colorVars[color] as React.CSSProperties}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
    >
      {leftIcon  && <span className="shrink-0 flex items-center justify-center">{leftIcon}</span>}
      <span>{label ?? children}</span>
      {rightIcon && <span className="shrink-0 flex items-center justify-center">{rightIcon}</span>}
    </a>
  )
}
