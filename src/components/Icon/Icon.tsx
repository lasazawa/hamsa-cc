import './Icon.css'
import { iconData, type IconName } from './icons'

export type { IconName }

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  const icon = iconData[name]
  if (!icon) return null

  return (
    <span
      className={`icon${className ? ` ${className}` : ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox={icon.viewBox}
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        dangerouslySetInnerHTML={{
          __html: icon.pathTransform
            ? `<g transform="${icon.pathTransform}">${icon.paths.join('')}</g>`
            : icon.paths.join('')
        }}
      />
    </span>
  )
}
