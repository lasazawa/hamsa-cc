import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu, DropdownSection, DropdownHeader, DropdownItem, DropdownFooter } from './DropdownMenu'
import { Checkbox } from '../Checkbox/Checkbox'
import { Radio } from '../Radio/Radio'

const meta: Meta = {
  title: 'Components/DropdownMenu',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const TextList: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownSection>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownSection>
        <DropdownHeader>Actions</DropdownHeader>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  ),
}

export const MultiSection: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownSection>
        <DropdownHeader>Actions</DropdownHeader>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
      </DropdownSection>
      <DropdownSection>
        <DropdownHeader>Actions</DropdownHeader>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  ),
}

export const WithCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['active'])
    const toggle = (val: string) =>
      setSelected((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val])
    const options = ['Active', 'Revised Allocation', 'Syndicated', 'Closed', 'Reopen', 'Passed']
    return (
      <DropdownMenu>
        <DropdownSection>
          {options.map((opt) => (
            <DropdownItem key={opt}>
              <Checkbox
                size="sm"
                label={opt}
                checked={selected.includes(opt.toLowerCase())}
                onChange={() => toggle(opt.toLowerCase())}
              />
            </DropdownItem>
          ))}
          <DropdownFooter onApply={() => {}} onClear={() => setSelected([])} />
        </DropdownSection>
      </DropdownMenu>
    )
  },
}

export const WithRadios: Story = {
  render: () => {
    const [selected, setSelected] = useState('syndicated')
    const options = ['Syndicated', 'Closed', 'Reopen', 'Passed']
    return (
      <DropdownMenu>
        <DropdownSection>
          {options.map((opt) => (
            <DropdownItem key={opt}>
              <Radio
                size="sm"
                name="dropdown-radio"
                label={opt}
                value={opt.toLowerCase()}
                checked={selected === opt.toLowerCase()}
                onChange={() => setSelected(opt.toLowerCase())}
              />
            </DropdownItem>
          ))}
          <DropdownFooter onApply={() => {}} onClear={() => setSelected('')} />
        </DropdownSection>
      </DropdownMenu>
    )
  },
}

export const WithAccentSection: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownSection>
        <DropdownHeader>Actions</DropdownHeader>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
      </DropdownSection>
      <DropdownSection accent>
        <DropdownHeader>Actions</DropdownHeader>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
        <DropdownItem onClick={() => {}}>Mark Worked</DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  ),
}
