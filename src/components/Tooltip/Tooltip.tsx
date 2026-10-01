import type { ReactNode } from 'react'
import './Tooltip.css'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TooltipAlign = 'center' | 'start' | 'end'

export interface TooltipProps {
  /** Tooltip label text. Ignored when `children` is provided. */
  text?: string
  children?: ReactNode
  /** Side of the bubble the arrow sits on (points toward the anchor). */
  placement?: TooltipPlacement
  /** Position of the arrow along that side. `start`/`end` = off-center. */
  align?: TooltipAlign
  /** Optional trailing icon. */
  icon?: ReactNode
  className?: string
}

export function Tooltip({
  text,
  children,
  placement = 'bottom',
  align = 'center',
  icon,
  className,
}: TooltipProps) {
  const content = children ?? text
  const classes = [
    'tooltip',
    `tooltip--${placement}`,
    `tooltip--align-${align}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="tooltip">
      <div className="tooltip__bubble">
        <span className="tooltip__text">{content}</span>
        {icon != null && <span className="tooltip__icon">{icon}</span>}
      </div>
      <span className="tooltip__arrow" aria-hidden="true" />
    </div>
  )
}
