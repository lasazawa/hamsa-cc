import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'error-long'] },
  },
  args: {
    message: 'Username or Password is incorrect. Try again.',
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: { variant: 'success' },
}

export const Error: Story = {
  args: { variant: 'error' },
}

export const ErrorLong: Story = {
  args: {
    variant: 'error-long',
    message: 'Username or Password is incorrect. Try again. Lorem ipsum dolor sit amet, consectetur. Username or Password is incorrect. Try again. Lorem ipsum dolor sit amet, consectetur.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="success" message="Username or Password is incorrect. Try again." />
      <Alert variant="error" message="Username or Password is incorrect. Try again." />
      <Alert
        variant="error-long"
        message="Username or Password is incorrect. Try again. Lorem ipsum dolor sit amet, consectetur. Username or Password is incorrect. Try again. Lorem ipsum dolor sit amet, consectetur."
      />
    </div>
  ),
}
