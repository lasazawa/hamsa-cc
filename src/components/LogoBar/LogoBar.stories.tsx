import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { iconData } from '../Icon/icons'
import { LogoBar } from './LogoBar'

const iconNames = Object.keys(iconData)

const meta: Meta<typeof LogoBar> = {
  title: 'Components/LogoBar',
  component: LogoBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    logoName: {
      control: 'radio',
      options: ['hamsa', 'jpm'],
      description: 'Built-in brand logo (themeable in light/dark)',
    },
    productTitle: {
      control: 'text',
      description: 'Product label to the right of the logo',
    },
    productIconName: {
      control: 'select',
      options: [null, ...iconNames],
      description: 'Optional icon before the product label. Default: subaccounting. Set to None to hide.',
    },
    section: {
      control: 'text',
      description: 'Current navigation section to the right of product',
    },
    showSearch: { control: 'boolean' },
    showUser: { control: 'boolean' },
    showActions: { control: 'boolean' },
    showAi: { control: 'boolean' },
    showAiFilter: { control: 'boolean' },
    userVariant: { control: 'radio', options: ['filled', 'outline'] },
    userLeading: { control: 'radio', options: ['avatar', 'icon', 'wallet'] },
    logo: { control: false },
    secondaryLogo: { control: false },
    pageName: { control: false },
  },
  args: {
    logoName: 'jpm',
    productTitle: 'Subaccounting',
    productIconName: 'subaccounting',
    section: undefined,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          maxWidth: 1235,
          padding: 16,
          background: 'var(--page-bg, var(--surface-page-bg))',
        }}
      >
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof LogoBar>

export const UclExplorer: Story = {
  name: 'UCL Explorer',
  args: {
    logoName: 'jpm',
    productTitle: 'Subaccounting',
    section: undefined,
    searchPlaceholder: 'Search by Address / Txn Hash / Block / Token',
    userName: 'Elizabeth',
    userLeading: 'avatar',
    userVariant: 'filled',
    showSearch: false,
    showUser: true,
  },
}

export const WithSection: Story = {
  name: 'Product + section',
  args: {
    logoName: 'hamsa',
    productTitle: 'UCL Wallet',
    section: 'Trade',
    showSearch: false,
    userVariant: 'outline',
    userLeading: 'wallet',
    userName: '0x6D…B303',
  },
}

export const WithIconButtons: Story = {
  name: 'Search + icons + user',
  args: {
    logoName: 'hamsa',
    productTitle: 'Name of Product',
    section: undefined,
    searchPlaceholder: 'Search',
    userName: 'Elizabeth',
    userLeading: 'avatar',
    userVariant: 'filled',
    iconActions: [
      { id: 'lang', label: 'Language', iconName: 'language' },
      { id: 'notify', label: 'Notifications', iconName: 'notifications' },
      { id: 'settings', label: 'Settings', iconName: 'settings-default' },
    ],
    showActions: true,
    actionsLabel: 'Create',
  },
}

export const InteractiveSearch: Story = {
  name: 'Search hover / focus',
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <LogoBar
        {...args}
        searchValue={value}
        onSearchChange={(e) => setValue(e.target.value)}
        onSearchClear={() => setValue('')}
        searchPlaceholder="Search — hover and tab to focus"
        userName="Elizabeth"
      />
    )
  },
  args: {
    logoName: 'hamsa',
    productTitle: 'UCL Explorer',
  },
}

export const UserStates: Story = {
  name: 'User name variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <LogoBar
        showSearch={false}
        logoName="hamsa"
        productTitle="Filled avatar"
        userVariant="filled"
        userLeading="avatar"
        userName="Elizabeth"
      />
      <LogoBar
        showSearch={false}
        logoName="hamsa"
        productTitle="Filled icon"
        userVariant="filled"
        userLeading="icon"
        userName="User Name"
      />
      <LogoBar
        showSearch={false}
        logoName="hamsa"
        productTitle="Outline avatar"
        userVariant="outline"
        userLeading="avatar"
        userName="Elizabeth"
      />
      <LogoBar
        showSearch={false}
        logoName="hamsa"
        productTitle="Wallet"
        userVariant="outline"
        userLeading="wallet"
        userName="0x6D53…B303"
      />
    </div>
  ),
}

export const JpmWithAi: Story = {
  name: 'JPM + AI button',
  args: {
    logoName: 'jpm',
    productTitle: undefined,
    section: 'Trade',
    showSearch: false,
    userVariant: 'outline',
    userLeading: 'avatar',
    userName: 'Elizabeth',
    showActions: true,
    actionsLabel: 'Actions',
    actionsIconRightName: 'chevron-down',
    showAi: true,
  },
}

export const JpmAiFilter: Story = {
  name: 'JPM AI filter',
  args: {
    logoName: 'jpm',
    productTitle: undefined,
    section: 'Trade',
    showSearch: false,
    userVariant: 'outline',
    userName: 'Elizabeth',
    showAiFilter: true,
  },
}

export const LogoComparison: Story = {
  name: 'Logo options (Hamsa / JPM)',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <LogoBar {...args} logoName="hamsa" productTitle="UCL Explorer" section="Overview" />
      <LogoBar {...args} logoName="jpm" productTitle="Markets" section="Trade" />
    </div>
  ),
  args: {
    showSearch: false,
    showUser: true,
    userName: 'Elizabeth',
    userVariant: 'outline',
  },
}
