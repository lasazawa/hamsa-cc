type Variant = 'success' | 'error' | 'error-long'

interface AlertProps {
  variant?: Variant
  message: string
  onDismiss?: () => void
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" fill="var(--alert-success-icon)" />
      <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DangerIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 3.5L21.5 20.5H2.5L12 3.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M12 10.5v5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill={color} />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const variantStyle: Record<Variant, React.CSSProperties> = {
  success: {
    borderRadius: 'var(--corner-md)',
    background:   'var(--alert-success-bg)',
    color:        'var(--alert-success-text)',
    boxShadow:    'var(--elevation-small)',
  },
  error: {
    borderRadius: 'var(--corner-md)',
    background:   'var(--alert-error-bg)',
    color:        'var(--alert-error-text)',
    boxShadow:    'var(--elevation-small)',
  },
  'error-long': {
    borderRadius: 'var(--corner-md)',
    background:   'var(--alert-error-long-bg)',
    color:        'var(--alert-error-long-text)',
    boxShadow:    'var(--elevation-small)',
    border:       '1px solid var(--alert-error-long-border)',
  },
}

export function Alert({ variant = 'success', message, onDismiss }: AlertProps) {
  const isLong = variant === 'error-long'

  return (
    <div
      role="alert"
      className={`inline-flex items-center justify-between gap-4 max-w-[515px] ${
        isLong ? 'px-5 pt-5 pb-6' : 'h-[50px] px-4'
      }`}
      style={variantStyle[variant]}
    >
      <div className={`flex items-center ${isLong ? 'flex-1 min-w-0 gap-3' : 'shrink-0 gap-2'}`}>
        {variant === 'success'
          ? <CheckCircleIcon />
          : <DangerIcon color={isLong ? 'var(--alert-error-long-icon, currentColor)' : 'currentColor'} />
        }
        <span
          className={`font-[family-name:var(--font-family-body)] font-[number:var(--font-weight-regular)] text-[length:var(--font-body-lg)] tracking-[var(--font-body-letter-spacing-md)] pb-[1px] ${
            isLong ? 'leading-[var(--font-body-line-height)]' : 'leading-normal whitespace-nowrap'
          }`}
        >
          {message}
        </span>
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 flex items-center justify-center p-[6px] rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        style={{ color: 'inherit' }}
        aria-label="Dismiss"
      >
        <CloseIcon />
      </button>
    </div>
  )
}
