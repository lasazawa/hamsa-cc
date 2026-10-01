import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../Icon/Icon'
import {
  Table,
  TableHeader,
  TableControls,
  TableScroll,
  TableGrid,
  TableHead,
  TableBody,
  TableRow,
  Th,
  Td,
  TableFooter,
  type TabItem,
} from './Table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Table>

const sampleRows = [
  { text: 'ASDFGH', wallet: '010101010', value: 'No' },
  { text: 'ASDFGH', wallet: '010101010', value: 'No' },
  { text: 'ASDFGH', wallet: '010101010', value: 'No' },
  { text: 'ASDFGH', wallet: '010101010', value: 'No' },
  { text: 'ASDFGH', wallet: '010101010', value: 'No' },
]

const tradeExplorerTabs: TabItem[] = [
  { id: 'reject', label: 'Reject Info' },
  { id: 'comments', label: 'Trade Comments' },
  { id: 'details', label: 'Additional Details' },
  { id: 'dialogs', label: 'Dialogs' },
  { id: 'raw', label: 'Unformatted Data' },
]

function TradeExplorerDemo({
  wide = false,
  tabs = tradeExplorerTabs,
}: {
  wide?: boolean
  tabs?: TabItem[]
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [tab, setTab] = useState(tabs[0]?.id ?? '')

  return (
    <Table>
      <TableHeader
        title="Trade Explorer"
        controls={<TableControls />}
        tabs={tabs}
        activeTabId={tab}
        onTabChange={setTab}
      />

      <TableScroll>
        <TableGrid>
          <TableHead>
            <TableRow interactive={false}>
              <Th variant="blank" showChevron={false} />
              <Th>Text</Th>
              <Th>Text</Th>
              <Th>Text</Th>
              <Th>Investor Wallet</Th>
              <Th>Investor Wallet</Th>
              <Th>Investor Wallet</Th>
              <Th>Investor Wallet</Th>
              {wide && (
                <>
                  <Th>Extra Col A</Th>
                  <Th>Extra Col B</Th>
                  <Th>Extra Col C</Th>
                </>
              )}
              <Th variant="blank" showChevron={false} />
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleRows.map((row, i) => (
              <TableRow
                key={i}
                selected={selected === i}
                onClick={() => setSelected(i === selected ? null : i)}
              >
                <Td variant="icons" icons={<Icon name="inbox" size={18} />} />
                <Td>{row.text}</Td>
                <Td>{row.text}</Td>
                <Td>{row.text}</Td>
                <Td variant="link-copy">{row.wallet}</Td>
                <Td variant="link-copy">{row.wallet}</Td>
                <Td variant="link-copy">{row.wallet}</Td>
                <Td variant="link-copy">{row.wallet}</Td>
                {wide && (
                  <>
                    <Td>Extra data</Td>
                    <Td>Extra data</Td>
                    <Td>Extra data</Td>
                  </>
                )}
                <Td variant="ellipses" />
              </TableRow>
            ))}
          </TableBody>
        </TableGrid>
      </TableScroll>

      <TableFooter>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Total {85} items</span>
        <span style={{ fontSize: 13, color: 'var(--text-default)' }}>
          Total Market Value: 1,987,675.88
        </span>
      </TableFooter>
    </Table>
  )
}

export const Default: Story = {
  render: () => <TradeExplorerDemo />,
}

export const WithoutTabs: Story = {
  name: 'Without tabs',
  render: () => <TradeExplorerDemo tabs={[]} />,
}

export const HorizontalScroll: Story = {
  name: 'Horizontal scroll',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
  render: () => <TradeExplorerDemo wide />,
}

export const ThVariants: Story = {
  name: 'Th variants',
  render: () => (
    <TableGrid>
      <TableHead>
        <TableRow interactive={false}>
          <Th>Header</Th>
          <Th variant="checkbox" />
          <Th variant="expand" />
          <Th variant="blank" showChevron={false} />
          <Th size="small" bordered={false}>Header</Th>
        </TableRow>
      </TableHead>
    </TableGrid>
  ),
}

export const TdVariants: Story = {
  name: 'Td variants',
  render: () => (
    <TableGrid>
      <TableBody>
        <TableRow interactive={false}>
          <Td>No</Td>
          <Td variant="link">No</Td>
          <Td variant="link-copy">010101010</Td>
          <Td variant="label">-2.5%</Td>
          <Td variant="buy" />
          <Td variant="sell" />
          <Td variant="icons" />
          <Td variant="checkbox" />
          <Td variant="flag">No</Td>
          <Td variant="ellipses" />
          <Td variant="expand" />
        </TableRow>
        <TableRow interactive={false}>
          <Td variant="edit">No</Td>
          <Td variant="edit" editMode="multi">No</Td>
          <Td variant="edit" editMode="after">No</Td>
          <Td variant="edit" editMode="add">No</Td>
          <Td variant="edit" editMode="error">No</Td>
          <Td variant="currency">1,234.56</Td>
        </TableRow>
      </TableBody>
    </TableGrid>
  ),
}

export const RowStates: Story = {
  name: 'Row highlight states',
  render: () => (
    <TableGrid style={{ width: '100%' }}>
      <TableBody>
        <TableRow state="hover" interactive={false}>
          <Td>Hover</Td>
          <Td>Row highlight</Td>
        </TableRow>
        <TableRow state="click" interactive={false}>
          <Td>Click / selected</Td>
          <Td>Row highlight</Td>
        </TableRow>
        <TableRow state="delete" interactive={false}>
          <Td>Delete</Td>
          <Td>Row highlight</Td>
        </TableRow>
        <TableRow>
          <Td>Interactive</Td>
          <Td>Hover / click me</Td>
        </TableRow>
      </TableBody>
    </TableGrid>
  ),
}

export const Controls: Story = {
  name: 'Header controls',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TableControls />
      <TableControls showEditMode editModeLabel="Edit Mode Off" />
      <TableControls showAdd showSave showRefresh showDownloadMenu={false} showDownload />
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <Table defaultCollapsed>
      <TableHeader title="Trade Explorer" controls={<TableControls />} />
      <TableScroll>
        <TableGrid>
          <TableBody>
            <TableRow>
              <Td>Hidden when collapsed</Td>
            </TableRow>
          </TableBody>
        </TableGrid>
      </TableScroll>
    </Table>
  ),
}
