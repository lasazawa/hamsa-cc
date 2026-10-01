import './ToggleBtnPill.css'

type Color = 'green' | 'perriwinkle'

interface ToggleBtnPillProps {
  text?:     string
  color?:    Color
  selected?: boolean
  dragging?: boolean
  onClick?:  React.MouseEventHandler<HTMLButtonElement>
}

type CSSVars = Record<string, string>

const colorVars: Record<'unselected' | Color, CSSVars> = {
  unselected: {
    '--_bg':     'var(--toggle-pill-unselected-bg)',
    '--_bc':     'var(--toggle-pill-unselected-border)',
    '--_text':   'var(--toggle-pill-unselected-text)',
    '--_bc-h':   'var(--toggle-pill-unselected-border-hover)',
    '--_text-h': 'var(--toggle-pill-unselected-text-hover)',
  },
  green: {
    '--_bg':       'var(--toggle-pill-green-bg)',
    '--_bc':       'var(--toggle-pill-green-border)',
    '--_text':     'var(--toggle-pill-green-text)',
    '--_bg-h':     'var(--toggle-pill-green-bg-hover)',
    '--_bc-h':     'var(--toggle-pill-green-border-hover)',
    '--_text-h':   'var(--toggle-pill-green-text-hover)',
    '--_bg-d':     'var(--toggle-pill-green-bg-drag)',
    '--_bc-d':     'var(--toggle-pill-green-border-drag)',
    '--_text-d':   'var(--toggle-pill-green-text-drag)',
    '--_shadow-d': 'var(--elevation-drag-green)',
  },
  perriwinkle: {
    '--_bg':       'var(--toggle-pill-perriwinkle-bg)',
    '--_bc':       'var(--toggle-pill-perriwinkle-border)',
    '--_text':     'var(--toggle-pill-perriwinkle-text)',
    '--_bg-h':     'var(--toggle-pill-perriwinkle-bg-hover)',
    '--_bc-h':     'var(--toggle-pill-perriwinkle-border-hover)',
    '--_text-h':   'var(--toggle-pill-perriwinkle-text-hover)',
    '--_bg-d':     'var(--toggle-pill-perriwinkle-bg-drag)',
    '--_bc-d':     'var(--toggle-pill-perriwinkle-border-drag)',
    '--_text-d':   'var(--toggle-pill-perriwinkle-text-drag)',
    '--_shadow-d': 'var(--elevation-drag-perriwinkle)',
  },
}

export function ToggleBtnPill({
  text     = 'Trade Research',
  color    = 'perriwinkle',
  selected = true,
  dragging = false,
  onClick,
}: ToggleBtnPillProps) {
  const varsKey = selected ? color : 'unselected'
  const classes = [
    'toggle-pill',
    !selected && 'toggle-pill--unselected',
    dragging   && 'toggle-pill--dragging',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      style={colorVars[varsKey] as React.CSSProperties}
      onClick={onClick}
    >
      <span className="toggle-pill__label">{text}</span>
      <span className="toggle-pill__icon" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 13.7129 13.7129" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ '--fill-0': 'currentColor' } as React.CSSProperties}>
          <path d="M6.85645 13.7129C5.91764 13.7129 5.03353 13.5329 4.2041 13.1729C3.37923 12.8174 2.65007 12.3252 2.0166 11.6963C1.3877 11.0628 0.893229 10.3337 0.533203 9.50879C0.177734 8.67936 0 7.79525 0 6.85645C0 5.91764 0.177734 5.03581 0.533203 4.21094C0.893229 3.38151 1.3877 2.65234 2.0166 2.02344C2.64551 1.38997 3.3724 0.895508 4.19727 0.540039C5.02669 0.180013 5.91081 0 6.84961 0C7.78841 0 8.67253 0.180013 9.50195 0.540039C10.3314 0.895508 11.0605 1.38997 11.6895 2.02344C12.3184 2.65234 12.8128 3.38151 13.1729 4.21094C13.5329 5.03581 13.7129 5.91764 13.7129 6.85645C13.7129 7.79525 13.5329 8.67936 13.1729 9.50879C12.8128 10.3337 12.3184 11.0628 11.6895 11.6963C11.0605 12.3252 10.3314 12.8174 9.50195 13.1729C8.67708 13.5329 7.79525 13.7129 6.85645 13.7129ZM6.85645 12.8311C7.68132 12.8311 8.45378 12.6761 9.17383 12.3662C9.89844 12.0563 10.5342 11.6279 11.0811 11.0811C11.6325 10.5342 12.0609 9.90072 12.3662 9.18066C12.6761 8.45605 12.8311 7.68132 12.8311 6.85645C12.8311 6.03158 12.6761 5.25911 12.3662 4.53906C12.0563 3.81445 11.6279 3.17871 11.0811 2.63184C10.5342 2.0804 9.89844 1.65202 9.17383 1.34668C8.45378 1.03678 7.67904 0.881836 6.84961 0.881836C6.02474 0.881836 5.25 1.03678 4.52539 1.34668C3.80534 1.65202 3.17188 2.0804 2.625 2.63184C2.08268 3.17871 1.65658 3.81445 1.34668 4.53906C1.04134 5.25911 0.888672 6.03158 0.888672 6.85645C0.888672 7.68132 1.04134 8.45605 1.34668 9.18066C1.65658 9.90072 2.08496 10.5342 2.63184 11.0811C3.17871 11.6279 3.81217 12.0563 4.53223 12.3662C5.25228 12.6761 6.02702 12.8311 6.85645 12.8311ZM4.46387 9.67969C4.34993 9.67969 4.24967 9.63867 4.16309 9.55664C4.08105 9.47005 4.04004 9.36751 4.04004 9.24902C4.04004 9.13053 4.08333 9.03027 4.16992 8.94824L6.24805 6.86328L4.16992 4.77832C4.08333 4.69629 4.04004 4.59603 4.04004 4.47754C4.04004 4.35905 4.08105 4.26107 4.16309 4.18359C4.24967 4.10156 4.34993 4.06055 4.46387 4.06055C4.58691 4.06055 4.69173 4.10384 4.77832 4.19043L6.84961 6.26855L8.94141 4.19043C9.03255 4.09473 9.13281 4.04688 9.24219 4.04688C9.36523 4.04688 9.46777 4.08789 9.5498 4.16992C9.63184 4.25195 9.67285 4.35221 9.67285 4.4707C9.67285 4.58919 9.62956 4.69173 9.54297 4.77832L7.45801 6.86328L9.53613 8.94141C9.62272 9.02799 9.66602 9.13053 9.66602 9.24902C9.66602 9.36751 9.625 9.47005 9.54297 9.55664C9.46094 9.63867 9.36068 9.67969 9.24219 9.67969C9.1237 9.67969 9.01888 9.63184 8.92773 9.53613L6.84961 7.46484L4.78516 9.53613C4.69857 9.63184 4.59147 9.67969 4.46387 9.67969Z" fill="var(--fill-0, currentColor)" />
        </svg>
      </span>
    </button>
  )
}
