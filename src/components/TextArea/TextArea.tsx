import { useState } from 'react'
import './TextArea.css'

type Color = 'default' | 'comment'

interface TextAreaProps {
  color?:          Color
  label?:          string
  placeholder?:    string
  value?:          string
  defaultValue?:   string
  onChange?:       React.ChangeEventHandler<HTMLTextAreaElement>
  supportingText?: string
  maxLength?:      number
  rows?:           number
  error?:          boolean
  disabled?:       boolean
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

export function TextArea({
  color        = 'default',
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  supportingText,
  maxLength,
  rows         = 3,
  error        = false,
  disabled     = false,
  className,
}: TextAreaProps) {
  const [internalLength, setInternalLength] = useState(defaultValue?.length ?? 0)

  const currentLength = value !== undefined ? value.length : internalLength
  const remaining     = maxLength !== undefined ? maxLength - currentLength : undefined

  const classes = [
    'ta',
    error && !disabled ? 'ta-error' : '',
    disabled ? 'ta-disabled' : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  function handleInput(e: React.SyntheticEvent<HTMLTextAreaElement>) {
    if (value === undefined) {
      setInternalLength((e.target as HTMLTextAreaElement).value.length)
    }
  }

  return (
    <div className={classes} style={colorVars[color] as React.CSSProperties}>
      <textarea
        className="ta-input"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onInput={handleInput}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
      />
      {maxLength !== undefined && (
        <div className={`ta-char-count${remaining !== undefined && remaining <= 15 ? ' ta-char-count-warn' : ''}`}>
          {remaining}
        </div>
      )}
      {label && <span className="ta-label">{label}</span>}
      {supportingText && <span className="ta-supporting">{supportingText}</span>}
    </div>
  )
}
