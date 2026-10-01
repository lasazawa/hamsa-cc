import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CommentBox, type WrittenComment } from './CommentBox'

const sampleViewOnly: WrittenComment[] = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing. Vestibulum pulvinar euismod augue volutpat auctor. Aliquam erat volutpat. Nunc ut velit rhoncus nisi pharetra ultricies quis a diam. Etiam lobortis gravida tortor.',
    userName: 'USER NAME',
    userId: '1234567799',
    dateTime: '00/00/00, 1:14PM',
  },
]

const sampleTable: WrittenComment[] = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur',
    userName: 'John Smith',
    userId: 'DSG654',
    dateTime: '05/22/2024 1:23:56',
  },
]

const meta: Meta<typeof CommentBox> = {
  title: 'Components/CommentBox',
  component: CommentBox,
  parameters: { layout: 'padded' },
  argTypes: {
    title:                  { control: 'text' },
    autoCommentPlaceholder: { control: 'text' },
    commentsPlaceholder:    { control: 'text' },
    maxLength:              { control: 'number' },
    rows:                   { control: 'number' },
    showCommentType:        { control: 'boolean' },
    showCTAs:               { control: 'boolean' },
    submitDisabled:         { control: 'boolean' },
    showWrittenComments:    { control: 'boolean' },
    writtenCommentsVariant: { control: 'select', options: ['view-only', 'table'] },
  },
  args: {
    title:                  '*ADD COMMENT',
    autoCommentPlaceholder: 'Auto Comment',
    commentsPlaceholder:    'Comments',
    maxLength:              300,
    rows:                   4,
    showCommentType:        false,
    showCTAs:               false,
    submitDisabled:         true,
    showWrittenComments:    false,
    writtenCommentsVariant: 'view-only',
  },
}
export default meta
type Story = StoryObj<typeof CommentBox>

export const Default: Story = {}

export const WithCommentType: Story = {
  render: (args) => {
    const [commentType, setCommentType] = useState<'trade' | 'break'>('trade')
    return (
      <CommentBox
        {...args}
        showCommentType
        commentType={commentType}
        onCommentTypeChange={setCommentType}
      />
    )
  },
}

export const WithCTAs: Story = {
  args: { showCTAs: true, submitDisabled: true },
}

export const WithWrittenViewOnly: Story = {
  args: {
    showWrittenComments: true,
    writtenCommentsVariant: 'view-only',
    writtenComments: sampleViewOnly,
  },
}

export const WithWrittenTable: Story = {
  args: {
    showWrittenComments: true,
    writtenCommentsVariant: 'table',
    writtenComments: sampleTable,
  },
}

export const Full: Story = {
  render: (args) => {
    const [commentType, setCommentType] = useState<'trade' | 'break'>('trade')
    return (
      <CommentBox
        {...args}
        showCommentType
        commentType={commentType}
        onCommentTypeChange={setCommentType}
        showCTAs
        submitDisabled
        showWrittenComments
        writtenCommentsVariant="view-only"
        writtenComments={sampleViewOnly}
      />
    )
  },
}

export const AllVariants: Story = {
  render: () => {
    const [commentType, setCommentType] = useState<'trade' | 'break'>('trade')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 520 }}>
        <CommentBox />
        <CommentBox
          showCommentType
          commentType={commentType}
          onCommentTypeChange={setCommentType}
          showCTAs
          submitDisabled
        />
        <CommentBox
          showWrittenComments
          writtenCommentsVariant="view-only"
          writtenComments={sampleViewOnly}
        />
        <CommentBox
          showWrittenComments
          writtenCommentsVariant="table"
          writtenComments={sampleTable}
        />
      </div>
    )
  },
}
