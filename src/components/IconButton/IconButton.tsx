import './IconButton.css'
import { Icon, type IconName } from '../Icon/Icon'
import type { ButtonHTMLAttributes } from 'react'

export type IconButtonColor = 'primary' | 'secondary' | 'neutral'
export type IconButtonVariant = 'solid' | 'stroke' | 'ghost'
export type IconButtonSize = 'lg' | 'md' | 'sm' | 'xs'
export type IconButtonCorners = 'round' | 'soft'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Accessible name — required for icon-only buttons. */
  'aria-label': string
  iconName?: IconName
  icon?: React.ReactNode
  color?: IconButtonColor
  variant?: IconButtonVariant
  size?: IconButtonSize
  /** `round` = pill/circle; `soft` = 8px radius (Figma “8px round”). */
  corners?: IconButtonCorners
}

type CSSVars = Record<string, string>

const colorVars: Record<IconButtonColor, Partial<Record<IconButtonVariant, CSSVars>>> = {
  primary: {
    solid: {
      '--_bg':     'var(--icon-btn-primary-solid-bg)',
      '--_bg-h':   'var(--icon-btn-primary-solid-bg-hover)',
      '--_bg-a':   'var(--icon-btn-primary-solid-bg-active)',
      '--_bg-d':   'var(--icon-btn-primary-solid-bg-disabled)',
      '--_icon':   'var(--icon-btn-primary-solid-icon)',
      '--_icon-h': 'var(--icon-btn-primary-solid-icon-hover)',
      '--_icon-a': 'var(--icon-btn-primary-solid-icon-active)',
      '--_icon-d': 'var(--icon-btn-primary-solid-icon-disabled)',
      '--_ring':   'var(--icon-btn-primary-focus-ring)',
    },
    stroke: {
      '--_bg':     'transparent',
      '--_bg-h':   'var(--icon-btn-primary-solid-bg-hover)',
      '--_bg-a':   'var(--icon-btn-primary-solid-bg-active)',
      '--_bg-d':   'transparent',
      '--_bc':     'var(--icon-btn-primary-stroke-border)',
      '--_bc-h':   'transparent',
      '--_bc-a':   'transparent',
      '--_bc-d':   'var(--icon-btn-primary-stroke-border-disabled)',
      '--_icon':   'var(--icon-btn-primary-stroke-icon)',
      '--_icon-h': 'var(--icon-btn-primary-stroke-icon-hover)',
      '--_icon-a': 'var(--icon-btn-primary-stroke-icon-active)',
      '--_icon-d': 'var(--icon-btn-primary-stroke-icon-disabled)',
      '--_ring':   'var(--icon-btn-primary-focus-ring)',
    },
    ghost: {
      '--_bg':     'transparent',
      '--_bg-h':   'var(--icon-btn-primary-solid-bg-hover)',
      '--_bg-a':   'var(--icon-btn-primary-solid-bg-active)',
      '--_bg-d':   'transparent',
      '--_icon':   'var(--icon-btn-primary-ghost-icon)',
      '--_icon-h': 'var(--icon-btn-primary-ghost-icon-hover)',
      '--_icon-a': 'var(--icon-btn-primary-ghost-icon-active)',
      '--_icon-d': 'var(--icon-btn-primary-ghost-icon-disabled)',
      '--_ring':   'var(--icon-btn-primary-focus-ring)',
    },
  },
  secondary: {
    solid: {
      '--_bg':     'var(--icon-btn-secondary-solid-bg)',
      '--_bg-h':   'var(--icon-btn-secondary-solid-bg-hover)',
      '--_bg-a':   'var(--icon-btn-secondary-solid-bg-active)',
      '--_bg-d':   'var(--icon-btn-secondary-solid-bg-disabled)',
      '--_icon':   'var(--icon-btn-secondary-solid-icon)',
      '--_icon-h': 'var(--icon-btn-secondary-solid-icon-hover)',
      '--_icon-a': 'var(--icon-btn-secondary-solid-icon-active)',
      '--_icon-d': 'var(--icon-btn-secondary-solid-icon-disabled)',
      '--_ring':   'var(--icon-btn-secondary-focus-ring)',
    },
  },
  neutral: {
    solid: {
      '--_bg':     'var(--icon-btn-neutral-solid-bg)',
      '--_bg-h':   'var(--icon-btn-neutral-solid-bg-hover)',
      '--_bg-a':   'var(--icon-btn-neutral-solid-bg-active)',
      '--_bg-d':   'var(--icon-btn-neutral-solid-bg-disabled)',
      '--_icon':   'var(--icon-btn-neutral-solid-icon)',
      '--_icon-h': 'var(--icon-btn-neutral-solid-icon-hover)',
      '--_icon-a': 'var(--icon-btn-neutral-solid-icon-active)',
      '--_icon-d': 'var(--icon-btn-neutral-solid-icon-disabled)',
      '--_ring':   'var(--icon-btn-neutral-focus-ring)',
    },
    ghost: {
      '--_bg':     'transparent',
      '--_bg-h':   'var(--icon-btn-neutral-ghost-bg-hover)',
      '--_bg-a':   'var(--icon-btn-neutral-ghost-bg-active)',
      '--_bg-d':   'transparent',
      '--_bc-f':   'var(--icon-btn-neutral-ghost-border-focus)',
      '--_icon':   'var(--icon-btn-neutral-ghost-icon)',
      '--_icon-h': 'var(--icon-btn-neutral-ghost-icon-hover)',
      '--_icon-a': 'var(--icon-btn-neutral-ghost-icon-active)',
      '--_icon-d': 'var(--icon-btn-neutral-ghost-icon-disabled)',
      '--_ring':   'var(--icon-btn-neutral-focus-ring)',
    },
  },
}

const iconSizes: Record<IconButtonSize, number> = {
  lg: 24,
  md: 20,
  sm: 14,
  xs: 13,
}

/** Soft (8px) sm uses a larger glyph per Figma. */
const softIconSizes: Partial<Record<IconButtonSize, number>> = {
  sm: 18,
}

const ghostIconSizes: Partial<Record<IconButtonSize, number>> = {
  md: 22,
  sm: 18,
  xs: 12,
}

export function IconButton({
  'aria-label': ariaLabel,
  iconName,
  icon,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  corners = 'round',
  disabled = false,
  type = 'button',
  className,
  onClick,
  ...rest
}: IconButtonProps) {
  const vars = colorVars[color][variant] ?? colorVars[color].solid ?? colorVars.primary.solid!

  const iconSize =
    (corners === 'soft' ? softIconSizes[size] : undefined) ??
    (variant === 'ghost' ? ghostIconSizes[size] : undefined) ??
    iconSizes[size]

  const content =
    icon ?? (iconName ? <Icon name={iconName} size={iconSize} /> : null)

  const classes = [
    'icon-btn',
    `icon-btn--${size}`,
    `icon-btn--${corners}`,
    variant === 'stroke' && 'icon-btn--stroke',
    variant === 'ghost' && 'icon-btn--ghost',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      style={vars as React.CSSProperties}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <span className="icon-btn__icon" style={{ width: iconSize, height: iconSize }}>
        {content}
      </span>
    </button>
  )
}
