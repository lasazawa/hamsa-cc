import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Filter,
  FilterHeader,
  FilterBody,
  FilterButtonRow,
  FilterCount,
  FilterFields,
  FilterPanel,
  FilterToolbar,
  FilterSavedCriteria,
  FilterSummary,
} from './Filter'
import { Tabs } from '../Tabs/Tabs'
import { TextField } from '../TextField/TextField'

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['default', 'vertical-search', 'vertical-tabs', 'horizontal'],
    },
    defaultCollapsed: { control: 'boolean' },
  },
  args: {
    layout: 'default',
    defaultCollapsed: false,
  },
}
export default meta
type Story = StoryObj<typeof Filter>

const field = (i: number, opts?: { duo?: boolean; chevron?: boolean }) => (
  <TextField
    key={i}
    placeholder="Input Text"
    duo={opts?.duo}
    duoLabel="Name"
    showChevron={opts?.chevron ?? !opts?.duo}
  />
)

const defaultFields = (
  <FilterFields columns={4}>
    {field(0, { chevron: true })}
    {field(1, { chevron: false })}
    {field(2, { chevron: false })}
    {field(3, { duo: true })}
    {field(4, { chevron: true })}
    {field(5, { chevron: false })}
    {field(6, { duo: true })}
    {field(7, { chevron: true })}
  </FilterFields>
)

const summaryCols = [
  Array.from({ length: 5 }, () => ({ label: 'Label Name:', value: 'Data Value' })),
  Array.from({ length: 5 }, () => ({ label: 'Label Name:', value: 'Data Value' })),
]

export const Default: Story = {
  render: (args) => (
    <Filter {...args} layout="default">
      <FilterPanel>
        <FilterHeader title="Search Criteria" requiredLabel="*Required" count={12} />
        <FilterBody>
          {defaultFields}
          <FilterButtonRow />
        </FilterBody>
      </FilterPanel>
    </Filter>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <Filter layout="default" defaultCollapsed>
      <FilterPanel>
        <FilterHeader title="Search Criteria" count={12} />
        <FilterBody>
          {defaultFields}
          <FilterButtonRow />
        </FilterBody>
      </FilterPanel>
    </Filter>
  ),
}

export const VerticalNestSearch: Story = {
  render: () => (
    <Filter layout="vertical-search">
      <FilterPanel nested>
        <FilterHeader
          title="Search Criteria"
          requiredLabel="*Required | **Either/Both Required"
        >
          <FilterSavedCriteria />
        </FilterHeader>
      </FilterPanel>
      <FilterBody>
        <FilterToolbar count={0} />
        {defaultFields}
        <FilterButtonRow />
      </FilterBody>
    </Filter>
  ),
}

export const VerticalNestTabs: Story = {
  render: () => {
    const [tab, setTab] = useState('family')
    return (
      <Filter layout="vertical-tabs">
        <FilterPanel nested>
          <FilterHeader requiredLabel="*Required">
            <Tabs
              size="large"
              weight="medium"
              items={[
                { id: 'family', label: 'Fund Family Level' },
                { id: 'fund', label: 'Fund Level' },
              ]}
              activeId={tab}
              onChange={setTab}
            />
          </FilterHeader>
        </FilterPanel>
        <FilterBody>
          <FilterFields columns={4}>
            {Array.from({ length: 16 }, (_, i) =>
              field(i, {
                duo: i % 4 === 3,
                chevron: i % 4 === 0 || i % 4 === 2,
              }),
            )}
          </FilterFields>
          <FilterButtonRow />
        </FilterBody>
      </Filter>
    )
  },
}

export const Horizontal: Story = {
  render: () => (
    <Filter layout="horizontal">
      <FilterPanel>
        <FilterHeader title="Search Criteria" showAccordion={false} requiredLabel={false} />
        <FilterBody>
          <FilterFields columns={1}>
            {field(0, { chevron: true })}
            {field(1, { chevron: false })}
            {field(2, { chevron: false })}
          </FilterFields>
          <FilterButtonRow />
        </FilterBody>
      </FilterPanel>
      <FilterBody>
        <FilterHeader title="Search Criteria" requiredLabel="*Required" count={12} />
        <FilterSummary columns={summaryCols} />
      </FilterBody>
    </Filter>
  ),
}

export const InteractiveCollapse: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>
          Accordion {collapsed ? 'collapsed' : 'expanded'} — click the circle to toggle.
        </p>
        <Filter layout="default" collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <FilterPanel>
            <FilterHeader title="Search Criteria" requiredLabel="*Required" count={12} />
            <FilterBody>
              {defaultFields}
              <FilterButtonRow />
            </FilterBody>
          </FilterPanel>
        </Filter>
        {!collapsed && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Standalone count:</span>
            <FilterCount count={12} />
          </div>
        )}
      </div>
    )
  },
}

export const AllLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Filter layout="default">
        <FilterPanel>
          <FilterHeader title="Search Criteria" requiredLabel="*Required" count={12} />
          <FilterBody>
            {defaultFields}
            <FilterButtonRow />
          </FilterBody>
        </FilterPanel>
      </Filter>
      <Filter layout="default" defaultCollapsed>
        <FilterPanel>
          <FilterHeader title="Search Criteria" count={12} />
          <FilterBody>{defaultFields}<FilterButtonRow /></FilterBody>
        </FilterPanel>
      </Filter>
    </div>
  ),
}
