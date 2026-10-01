// url=https://www.figma.com/design/jtGUaQnxvmqa16d9fEYRT9/DS-Lauren?node-id=2-268
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance

const label = instance.getString('button name')
const color = instance.getEnum('color', {
  primary: 'primary',
  secondary: 'secondary',
  neutral: 'neutral',
})
const variant = instance.getEnum('style', {
  solid: 'solid',
  stroke: 'stroke',
})
const disabled = instance.getEnum('state', {
  default: false,
  hover: false,
  active: false,
  focus: false,
  inactive: true,
  disabled: true,
})
const showIconLeft = instance.getBoolean('show icon left')
const showIconRight = instance.getBoolean('show Icon right')
const hasBadge = instance.getBoolean('hasBadge')

export default {
  example: figma.code`
    <Button
      label="${label}"
      color="${color}"
      variant="${variant}"
      size="lg"
      ${disabled ? 'disabled' : ''}
      ${showIconLeft ? 'iconLeftName="search"' : ''}
      ${showIconRight ? 'iconRightName="chevron-down"' : ''}
      ${hasBadge ? 'badge={12}' : ''}
    />
  `,
  imports: ["import { Button } from './Button'"],
  id: 'button-lg',
  metadata: { nestable: true },
}
