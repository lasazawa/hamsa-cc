// url=https://www.figma.com/design/jtGUaQnxvmqa16d9fEYRT9/DS-Lauren?node-id=3-5513
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance

const label = instance.getString('Button Name')
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
  disabled: true,
})
const showIconLeft = instance.getBoolean('show icon left')
const showIconRight = instance.getBoolean('show icon right')

export default {
  example: figma.code`
    <Button
      label="${label}"
      color="${color}"
      variant="${variant}"
      size="xs"
      ${disabled ? 'disabled' : ''}
      ${showIconLeft ? 'iconLeftName="search"' : ''}
      ${showIconRight ? 'iconRightName="chevron-down"' : ''}
    />
  `,
  imports: ["import { Button } from './Button'"],
  id: 'button-xs',
  metadata: { nestable: true },
}
