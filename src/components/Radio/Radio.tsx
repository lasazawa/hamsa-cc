import './Radio.css'

type Size = 'md' | 'sm' | 'xs' | 'xxs'

interface RadioProps {
  size?:           Size
  checked?:        boolean
  defaultChecked?: boolean
  onChange?:       React.ChangeEventHandler<HTMLInputElement>
  label?:          string
  name?:           string
  value?:          string
  disabled?:       boolean
  className?:      string
}

const sizeConfig: Record<Size, { radio: number; dot: number; gap: number; font: string }> = {
  md:  { radio: 14, dot: 8, gap: 8, font: 'var(--font-body-md)' },
  sm:  { radio: 13, dot: 7, gap: 8, font: 'var(--font-body-sm)' },
  xs:  { radio: 12, dot: 6, gap: 6, font: 'var(--font-body-xs)' },
  xxs: { radio: 11, dot: 5, gap: 6, font: 'var(--font-body-xxs)' },
}

export function Radio({
  size         = 'md',
  checked,
  defaultChecked,
  onChange,
  label,
  name,
  value,
  disabled     = false,
  className,
}: RadioProps) {
  const { radio, dot, gap, font } = sizeConfig[size]
  const classes = ['radio', disabled ? 'radio-disabled' : '', className ?? ''].filter(Boolean).join(' ')

  return (
    <label className={classes} style={{ gap }}>
      <span className="radio-control" style={{ width: radio, height: radio }}>
        <input
          type="radio"
          className="radio-input"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          name={name}
          value={value}
          disabled={disabled}
        />
        <span className="radio-visual" aria-hidden="true">
          <svg className="radio-dot" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" style={{ width: dot, height: dot }}>
            <circle cx="4" cy="4" r="4" fill="currentColor" />
          </svg>
        </span>
      </span>
      {label && (
        <span className="radio-label" style={{ fontSize: font }}>
          {label}
        </span>
      )}
    </label>
  )
}
