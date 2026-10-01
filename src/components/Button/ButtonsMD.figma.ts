// url=https://www.figma.com/design/jtGUaQnxvmqa16d9fEYRT9/DS-Lauren?node-id=3-5193
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance

const label = instance.getString('Button Name')
const color = instance.getEnum('color', {
  primary: 'primary',
  secondary: 'secondary',
  neutral: 'neutral',
  // Figma has error; Storybook Button does not — fall back to primary
  error: 'primary',
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
})
const showIconLeft = instance.getBoolean('show icon left')
const showIconRight = instance.getBoolean('show icon right')
const hasBadge = instance.getBoolean('hasBadge')

export default {
  example: figma.code`
    <Button
      label="${label}"
      color="${color}"
      variant="${variant}"
      size="md"
      ${disabled ? 'disabled' : ''}
      ${showIconLeft ? 'iconLeftName="search"' : ''}
      ${showIconRight ? 'iconRightName="search"' : ''}
      ${hasBadge ? 'badge={12}' : ''}
    />
  `,
  imports: ["import { Button } from './Button'"],
  id: 'button-md',
  metadata: { nestable: true },
}
