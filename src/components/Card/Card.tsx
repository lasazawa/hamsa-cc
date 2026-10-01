import type { ReactNode, HTMLAttributes } from 'react'
import './Card.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  /** When false, omits breakpoint padding. Defaults to true. */
  padded?: boolean
}

export function Card({
  children,
  padded = true,
  className,
  ...rest
}: CardProps) {
  const classes = [
    'card',
    padded && 'card--padded',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
