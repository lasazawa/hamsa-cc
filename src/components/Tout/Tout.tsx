import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import './Tout.css'

export type ToutTrigger = 'hover' | 'click'
export type ToutPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface ToutProps {
  /** Panel copy. Ignored when `content` is provided. */
  text?: string
  /** Rich panel content. Takes precedence over `text`. */
  content?: ReactNode
  /** Trigger element. When omitted, the panel is always visible. */
  children?: ReactNode
  /** How the panel opens when a trigger is provided. */
  trigger?: ToutTrigger
  /** Side of the trigger the panel appears on. */
  placement?: ToutPlacement
  /** Controlled open state. */
  open?: boolean
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function Tout({
  text = 'Total AUM as of yesterday.',
  content,
  children,
  trigger = 'hover',
  placement = 'top',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: ToutProps) {
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  const hasTrigger = children != null

  useEffect(() => {
    if (!hasTrigger || trigger !== 'click' || !open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        if (!isControlled) setUncontrolledOpen(false)
        onOpenChange?.(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!isControlled) setUncontrolledOpen(false)
        onOpenChange?.(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [hasTrigger, trigger, open, isControlled, onOpenChange])

  const classes = [
    'tout',
    `tout--${placement}`,
    hasTrigger ? 'tout--anchored' : 'tout--static',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const panel = (
    <div
      id={hasTrigger ? panelId : undefined}
      className="tout__panel"
      role="tooltip"
    >
      {content != null ? (
        <div className="tout__content">{content}</div>
      ) : (
        <span className="tout__text">{text}</span>
      )}
    </div>
  )

  if (!hasTrigger) {
    return <div className={classes}>{panel}</div>
  }

  return (
    <div
      ref={rootRef}
      className={classes}
      onMouseEnter={trigger === 'hover' ? () => setOpen(true) : undefined}
      onMouseLeave={trigger === 'hover' ? () => setOpen(false) : undefined}
    >
      <span
        className="tout__trigger"
        aria-describedby={open ? panelId : undefined}
        aria-expanded={trigger === 'click' ? open : undefined}
        onClick={
          trigger === 'click'
            ? () => setOpen(!open)
            : undefined
        }
        onKeyDown={
          trigger === 'click'
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setOpen(!open)
                }
              }
            : undefined
        }
        role={trigger === 'click' ? 'button' : undefined}
        tabIndex={trigger === 'click' ? 0 : undefined}
      >
        {children}
      </span>
      {open ? panel : null}
    </div>
  )
}
