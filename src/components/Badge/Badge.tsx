type Variant = 'success' | 'error' | 'info' | 'warning'

interface BadgeProps {
  count: number
  variant?: Variant
  max?: number
}

const variantStyles: Record<Variant, string> = {
  success: 'bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] border-[var(--badge-success-border)]',
  error:   'bg-[var(--badge-error-bg)] text-[var(--badge-error-text)] border-[var(--badge-error-border)]',
  info:    'bg-[var(--badge-info-bg)] text-[var(--badge-info-text)] border-[var(--badge-info-border)]',
  warning: 'bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border-[var(--badge-warning-border)]',
}

export function Badge({ count, variant = 'success', max = 99 }: BadgeProps) {
  const label = count > max ? `${max}+` : String(count)

  return (
    <div
      className={`inline-flex items-center justify-center border border-solid rounded-[5px] px-[2px] py-px min-w-[16px] h-[15px] ${variantStyles[variant]}`}
    >
      <span className="font-[family-name:var(--font-family-body)] font-[number:var(--font-weight-medium)] text-[10px] leading-[12px] tracking-[0.5px] whitespace-nowrap pb-[1px]">
        {label}
      </span>
    </div>
  )
}
