import './TextField.css'
import { Icon, type IconName } from '../Icon/Icon'

type Color = 'default' | 'comment'

interface TextFieldProps {
  color?:          Color
  label?:          string
  placeholder?:    string
  value?:          string
  defaultValue?:   string
  onChange?:       React.ChangeEventHandler<HTMLInputElement>
  supportingText?: string
  error?:          boolean
  disabled?:       boolean
  iconLeft?:       boolean
  showChevron?:    boolean
  /** Optional trailing icon (overrides chevron when set). */
  iconRightName?:  IconName
  duo?:            boolean
  duoLabel?:       string
  onDuoClick?:     () => void
  /** Shows a clear control in the duo panel before the chevron. */
  duoClearable?:   boolean
  onDuoClear?:     () => void
  className?:      string
}

type CSSVars = Record<string, string>

const colorVars: Record<Color, CSSVars> = {
  default: {
    '--_border':   'var(--input-border)',
    '--_border-h': 'var(--input-border-hover)',
    '--_border-f': 'var(--input-border-focus)',
    '--_bg':       'var(--input-bg)',
  },
  comment: {
    '--_border':   'var(--input-comment-border)',
    '--_border-h': 'var(--input-comment-border-hover)',
    '--_border-f': 'var(--input-comment-border)',
    '--_border-a': 'var(--input-comment-border-active)',
    '--_bg':       'var(--input-comment-bg)',
  },
}

function ChevronIcon() {
  return (
    <span className="tf-chevron">
      <svg width="8" height="4" viewBox="0 0 10 5" fill="none" aria-hidden="true">
        <path d="M5 5L0 0H10L5 5Z" fill="currentColor" />
      </svg>
    </span>
  )
}

function SearchIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 15.8519 16" fill="none" style={{ flexShrink: 0, color: 'inherit' }} aria-hidden="true">
      <path d="M15.6482 14.6431L11.3962 10.3911C12.3719 9.22819 12.9567 7.72773 12.9567 6.09277C12.9567 2.42783 9.98449 0 6.47838 0C2.97228 0 0 2.97228 0 6.47838C0 9.98449 2.97228 12.9567 6.47838 12.9567C7.97884 12.9567 9.35793 12.4539 10.4598 11.6027L14.7541 15.8969C14.9152 16.0581 15.1591 16.0581 15.3203 15.8969L15.6482 15.5691C15.8094 15.4079 15.8094 15.1043 15.6482 14.6431ZM6.47838 11.5902C3.72568 11.5902 1.36652 9.23102 1.36652 6.47838C1.36652 3.72568 3.72568 1.36652 6.47838 1.36652C9.23102 1.36652 11.5902 3.72568 11.5902 6.47838C11.5902 9.23102 9.23102 11.5902 6.47838 11.5902Z" fill="currentColor" />
    </svg>
  )
}

export function TextField({
  color        = 'default',
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  supportingText,
  error        = false,
  disabled     = false,
  iconLeft     = false,
  showChevron  = true,
  iconRightName,
  duo          = false,
  duoLabel     = 'Name',
  onDuoClick,
  duoClearable = false,
  onDuoClear,
  className,
}: TextFieldProps) {
  const classes = [
    'tf',
    error && !disabled ? 'tf-error' : '',
    disabled ? 'tf-disabled' : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  const trailingIcon = iconRightName
    ? <Icon name={iconRightName} size={15} />
    : showChevron
      ? <ChevronIcon />
      : null

  return (
    <div className={classes} style={colorVars[color] as React.CSSProperties}>
      {duo && (
        <div
          className="tf-duo-panel"
          onClick={disabled ? undefined : onDuoClick}
          onKeyDown={
            disabled || !onDuoClick
              ? undefined
              : (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onDuoClick()
                  }
                }
          }
          role={onDuoClick ? 'button' : undefined}
          tabIndex={disabled || !onDuoClick ? undefined : 0}
          aria-disabled={disabled || undefined}
        >
          <span className="tf-duo-label">{duoLabel}</span>
          <span className="tf-duo-icons">
            {duoClearable && (
              <button
                type="button"
                className="tf-duo-clear"
                aria-label="Clear"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation()
                  onDuoClear?.()
                }}
              >
                <Icon name="circle-x" size={13} />
              </button>
            )}
            <ChevronIcon />
          </span>
        </div>
      )}
      <div className="tf-inner">
        {iconLeft && <SearchIcon />}
        <input
          className="tf-input"
          type="text"
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
        />
        {trailingIcon}
      </div>
      {label && <span className="tf-label">{label}</span>}
      {supportingText && <span className="tf-supporting">{supportingText}</span>}
    </div>
  )
}
