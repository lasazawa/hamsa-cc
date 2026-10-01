import './Checkbox.css'

type Size = 'md' | 'sm' | 'xs' | 'xxs'

interface CheckboxProps {
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

const sizeConfig: Record<Size, { box: number; gap: number; font: string }> = {
  md:  { box: 14, gap: 8, font: 'var(--font-body-md)' },
  sm:  { box: 13, gap: 8, font: 'var(--font-body-sm)' },
  xs:  { box: 12, gap: 6, font: 'var(--font-body-xs)' },
  xxs: { box: 11, gap: 6, font: 'var(--font-body-xxs)' },
}

export function Checkbox({
  size         = 'md',
  checked,
  defaultChecked,
  onChange,
  label,
  name,
  value,
  disabled     = false,
  className,
}: CheckboxProps) {
  const { box, gap, font } = sizeConfig[size]
  const classes = ['checkbox', disabled ? 'checkbox-disabled' : '', className ?? ''].filter(Boolean).join(' ')

  return (
    <label className={classes} style={{ gap }}>
      <span className="checkbox-control" style={{ width: box, height: box }}>
        <input
          type="checkbox"
          className="checkbox-input"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          name={name}
          value={value}
          disabled={disabled}
        />
        <span className="checkbox-visual" aria-hidden="true">
          <svg className="checkbox-check" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline
              points="1.5,5 4,7.5 8.5,2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      {label && (
        <span className="checkbox-label" style={{ fontSize: font }}>
          {label}
        </span>
      )}
    </label>
  )
}
