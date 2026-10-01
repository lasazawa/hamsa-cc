import './Drawer.css'
import { Button } from '../Button/Button'
import { Link } from '../Link/Link'

interface DrawerAction {
  label:   string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  href?:   string
}

interface DrawerProps {
  title?:             string
  eyebrow?:           string
  requiredLabel?:     string | false
  minimizedTitle?:    string
  minimizedEyebrow?:  string
  popOut?:            boolean
  minimized?:         boolean
  children?:          React.ReactNode
  footer?:            React.ReactNode
  footerFixed?:       boolean
  primaryAction?:     DrawerAction
  secondaryAction?:   DrawerAction
  tertiaryAction?:    DrawerAction
  onClose?:           () => void
  onExpand?:          () => void
  onPopOut?:          () => void
  className?:         string
}

function ExpandIcon() {
  return (
    <svg width="14" height="15" viewBox="0 0 13.5208 14.2119" fill="none" aria-hidden="true">
      <path d="M0.494141 5.93291C0.346137 5.93291 0.226779 5.88278 0.136068 5.78252C0.0453559 5.67725 0 5.55192 0 5.40654V0.917383C0 0.631641 0.0763889 0.408561 0.229167 0.248145C0.386719 0.0827148 0.601562 0 0.873698 0H5.14193C5.28993 0 5.41168 0.0501302 5.50716 0.150391C5.60742 0.250651 5.65755 0.375977 5.65755 0.526367C5.65755 0.676758 5.60742 0.802083 5.50716 0.902344C5.4069 0.997591 5.28516 1.04521 5.14193 1.04521H3.94596L1.51823 0.917383L3.74544 3.18076L6.0944 5.63965C6.13737 5.68978 6.17079 5.74743 6.19466 5.8126C6.22331 5.87777 6.23763 5.94795 6.23763 6.02314C6.23763 6.18356 6.1875 6.31139 6.08724 6.40664C5.98698 6.50189 5.86046 6.54951 5.70768 6.54951C5.56923 6.54951 5.45464 6.50189 5.36393 6.40664L3.04362 3.94775L0.873698 1.60166L0.988281 4.14326V5.40654C0.988281 5.55693 0.942925 5.68226 0.852213 5.78252C0.761502 5.88278 0.642144 5.93291 0.494141 5.93291ZM8.37174 14.2119C8.22852 14.2119 8.10677 14.1618 8.00651 14.0615C7.91102 13.9663 7.86328 13.8435 7.86328 13.6931C7.86328 13.5377 7.91341 13.4123 8.01367 13.3171C8.11393 13.2218 8.23329 13.1742 8.37174 13.1742H9.57487L12.0026 13.2945L9.76823 11.0312L7.43359 8.57227C7.38108 8.52715 7.34288 8.47201 7.31901 8.40684C7.29514 8.33665 7.2832 8.26397 7.2832 8.18877C7.2832 8.02835 7.33333 7.90052 7.43359 7.80527C7.53385 7.71003 7.66037 7.6624 7.81315 7.6624C7.95161 7.6624 8.06619 7.71253 8.1569 7.81279L10.4772 10.2642L12.6471 12.6103L12.5326 10.0687V8.81289C12.5326 8.65749 12.5779 8.52966 12.6686 8.42939C12.7641 8.32913 12.8835 8.279 13.0267 8.279C13.1699 8.279 13.2869 8.33164 13.3776 8.43691C13.4731 8.53717 13.5208 8.6625 13.5208 8.81289V13.2945C13.5208 13.5803 13.4444 13.8034 13.2917 13.9638C13.1389 14.1292 12.924 14.2119 12.6471 14.2119H8.37174Z" fill="currentColor" />
    </svg>
  )
}

function PopOutIcon({ docked = false }: { docked?: boolean }) {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 11.2102 11.7546"
      fill="none"
      aria-hidden="true"
      style={docked ? { transform: 'scaleX(-1) rotate(180deg)' } : { transform: 'scaleX(-1)' }}
    >
      <path d="M11.2102 8.83008C11.2102 8.99658 11.1565 9.13623 11.0491 9.24902C10.9468 9.35645 10.824 9.41016 10.6808 9.41016C10.5376 9.41016 10.4148 9.35376 10.3125 9.24097C10.2102 9.1228 10.159 8.9939 10.159 8.85425V4.95483L10.2588 1.64355L9.02344 3.06152L0.89774 11.5854C0.790318 11.6982 0.670108 11.7546 0.537109 11.7546C0.439918 11.7546 0.3504 11.7278 0.268555 11.6741C0.186709 11.6204 0.12021 11.5505 0.0690569 11.4646C0.023019 11.3787 0 11.2874 0 11.1907C0 11.051 0.0537109 10.9248 0.161133 10.812L8.27916 2.27197L9.6296 0.990967L6.09236 1.07959H2.76228C2.62416 1.07959 2.5014 1.02856 2.39397 0.926514C2.29167 0.819092 2.24051 0.692871 2.24051 0.547852C2.24051 0.402832 2.28911 0.276611 2.3863 0.169189C2.48861 0.0563965 2.61905 0 2.77762 0H10.6348C10.8087 0 10.9442 0.0537109 11.0414 0.161133C11.1437 0.268555 11.1949 0.410889 11.1949 0.588135L11.2102 8.83008Z" fill="currentColor" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 13.2 13.2" fill="none" aria-hidden="true">
      <path d="M0.218626 12.9835C0.118769 12.8891 0.0521978 12.778 0.0189123 12.6503C-0.00882572 12.5226 -0.00605192 12.395 0.0272337 12.2673C0.0605192 12.1396 0.124317 12.0285 0.218626 11.9341L5.54432 6.59584L0.218626 1.26587C0.124317 1.17148 0.0605192 1.06044 0.0272337 0.932744C-0.000504326 0.805047 -0.000504326 0.67735 0.0272337 0.549653C0.0605192 0.421956 0.124317 0.310915 0.218626 0.21653C0.312935 0.116593 0.423887 0.0527445 0.551481 0.0249842C0.679076 -0.00832808 0.806671 -0.00832808 0.934266 0.0249842C1.06741 0.0527445 1.18113 0.116593 1.27544 0.21653L6.60113 5.5465L11.9268 0.21653C12.0211 0.116593 12.1321 0.0527445 12.2597 0.0249842C12.3873 -0.00832808 12.5149 -0.00832808 12.6425 0.0249842C12.7701 0.0527445 12.8838 0.116593 12.9836 0.21653C13.078 0.310915 13.1417 0.421956 13.175 0.549653C13.2083 0.67735 13.2083 0.805047 13.175 0.932744C13.1417 1.06044 13.078 1.17148 12.9836 1.26587L7.65795 6.59584L12.9836 11.9341C13.078 12.0285 13.139 12.1396 13.1667 12.2673C13.2 12.395 13.2 12.5226 13.1667 12.6503C13.139 12.778 13.078 12.8891 12.9836 12.9835C12.8893 13.0834 12.7756 13.1473 12.6425 13.175C12.5149 13.2083 12.3873 13.2083 12.2597 13.175C12.1321 13.1417 12.0211 13.0779 11.9268 12.9835L6.60113 7.6535L1.27544 12.9835C1.18113 13.0779 1.07018 13.1417 0.942587 13.175C0.814992 13.2083 0.687398 13.2083 0.559803 13.175C0.432208 13.1417 0.318482 13.0779 0.218626 12.9835Z" fill="currentColor" />
    </svg>
  )
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label:    string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button type="button" className="drawer-icon-btn" aria-label={label} onClick={onClick}>
      {children}
    </button>
  )
}

function DrawerFooter({
  footer,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  fixed,
}: {
  footer?:          React.ReactNode
  primaryAction?:   DrawerAction
  secondaryAction?: DrawerAction
  tertiaryAction?:  DrawerAction
  fixed?:           boolean
}) {
  if (footer) {
    return <div className={`drawer-footer${fixed ? ' drawer-footer--fixed' : ''}`}>{footer}</div>
  }

  if (!primaryAction && !secondaryAction && !tertiaryAction) return null

  return (
    <div className={`drawer-footer${fixed ? ' drawer-footer--fixed' : ''}`}>
      <div className="drawer-footer-row">
        <div className="drawer-footer-actions">
          {primaryAction && (
            <Button
              label={primaryAction.label}
              color="primary"
              variant="solid"
              size="md"
              onClick={primaryAction.onClick as React.MouseEventHandler<HTMLButtonElement>}
            />
          )}
          {secondaryAction && (
            <Button
              label={secondaryAction.label}
              color="primary"
              variant="stroke"
              size="md"
              onClick={secondaryAction.onClick as React.MouseEventHandler<HTMLButtonElement>}
            />
          )}
        </div>
        {tertiaryAction && (
          <Link
            label={tertiaryAction.label}
            href={tertiaryAction.href ?? '#'}
            color="primary"
            size="md"
            onClick={tertiaryAction.onClick as React.MouseEventHandler<HTMLAnchorElement>}
          />
        )}
      </div>
    </div>
  )
}

export function Drawer({
  title            = 'Sunshine Co.',
  eyebrow          = 'PENDING APPROVAL',
  requiredLabel    = '*Required',
  minimizedTitle   = 'TRADE RESEARCH',
  minimizedEyebrow = 'BUY',
  popOut           = true,
  minimized        = false,
  children,
  footer,
  footerFixed      = false,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  onClose,
  onExpand,
  onPopOut,
  className,
}: DrawerProps) {
  const classes = [
    'drawer',
    popOut ? 'drawer--pop-out' : 'drawer--docked',
    minimized && 'drawer--minimized',
    className ?? '',
  ].filter(Boolean).join(' ')

  const hasFooter = Boolean(
    footer || primaryAction || secondaryAction || tertiaryAction,
  )

  if (minimized) {
    return (
      <aside className={classes} aria-label={title}>
        <div className="drawer-nav drawer-nav--minimized">
          <div className="drawer-minimized-title">
            <span className="drawer-minimized-label">{minimizedTitle}</span>
            <span className="drawer-minimized-sep" aria-hidden="true">|</span>
            <span className="drawer-minimized-eyebrow">{minimizedEyebrow}</span>
          </div>
          <div className="drawer-icons">
            {popOut && (
              <IconButton label="Expand" onClick={onExpand}>
                <ExpandIcon />
              </IconButton>
            )}
            <IconButton label={popOut ? 'Dock' : 'Pop out'} onClick={onPopOut}>
              <PopOutIcon docked={popOut} />
            </IconButton>
            <IconButton label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className={classes} aria-label={title}>
      <div className="drawer-nav">
        <div className="drawer-nav-spacer" />
        <div className="drawer-icons">
          {popOut && (
            <IconButton label="Expand" onClick={onExpand}>
              <ExpandIcon />
            </IconButton>
          )}
          <IconButton label={popOut ? 'Pop out' : 'Pop out'} onClick={onPopOut}>
            <PopOutIcon />
          </IconButton>
          <IconButton label="Close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      <div className="drawer-body">
        <div className="drawer-header">
          <div className="drawer-header-text">
            {eyebrow && <p className="drawer-eyebrow">{eyebrow}</p>}
            {title && <h2 className="drawer-title">{title}</h2>}
          </div>
          {requiredLabel !== false && requiredLabel && (
            <p className="drawer-required">{requiredLabel}</p>
          )}
        </div>

        {children && <div className="drawer-content">{children}</div>}
      </div>

      {hasFooter && !footerFixed && (
        <DrawerFooter
          footer={footer}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          tertiaryAction={tertiaryAction}
        />
      )}

      {hasFooter && footerFixed && (
        <DrawerFooter
          footer={footer}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          tertiaryAction={tertiaryAction}
          fixed
        />
      )}
    </aside>
  )
}
