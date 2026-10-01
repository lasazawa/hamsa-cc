import './Switch.css'

interface SwitchProps {
  checked?:        boolean
  defaultChecked?: boolean
  onChange?:       React.ChangeEventHandler<HTMLInputElement>
  label?:          string
  name?:           string
  value?:          string
  disabled?:       boolean
  className?:      string
}

export function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  name,
  value,
  disabled = false,
  className,
}: SwitchProps) {
  const classes = ['switch', disabled ? 'switch--disabled' : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <label className={classes}>
      <span className="switch__control">
        <input
          type="checkbox"
          role="switch"
          className="switch__input"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          name={name}
          value={value}
          disabled={disabled}
        />
        <span className="switch__track" aria-hidden="true">
          <span className="switch__thumb" />
        </span>
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  )
}
