import './CommentBox.css'
import { TextField } from '../TextField/TextField'
import { TextArea } from '../TextArea/TextArea'
import { Button } from '../Button/Button'
import { Radio } from '../Radio/Radio'

type CommentType = 'trade' | 'break'

export type WrittenCommentVariant = 'view-only' | 'table'

export interface WrittenComment {
  text:     string
  userName: string
  userId:   string
  dateTime: string
}

interface CommentBoxProps {
  title?:                    string
  autoCommentPlaceholder?:   string
  commentsPlaceholder?:      string
  maxLength?:                number
  rows?:                     number
  showCommentType?:          boolean
  commentType?:              CommentType
  onCommentTypeChange?:      (type: CommentType) => void
  showCTAs?:                 boolean
  onSubmit?:                 () => void
  submitDisabled?:           boolean
  showWrittenComments?:      boolean
  writtenCommentsVariant?:   WrittenCommentVariant
  writtenComments?:          WrittenComment[]
  writtenCommentsTitle?:     string
  className?:                string
}

function WrittenCommentsViewOnly({
  title,
  comments,
}: {
  title:    string
  comments: WrittenComment[]
}) {
  return (
    <div className="cb-written cb-written--view-only">
      {comments.map((comment, i) => (
        <div key={i} className="cb-written-block">
          {i === 0 && <p className="cb-written-heading">{title}</p>}
          <div className="cb-written-body">
            <p className="cb-written-text">{comment.text}</p>
            <div className="cb-written-stamp">
              <span className="cb-written-stamp-meta">
                {comment.userName}, ID:{comment.userId}
              </span>
              <span className="cb-written-stamp-divider" aria-hidden="true" />
              <span className="cb-written-stamp-meta">{comment.dateTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function WrittenCommentsTable({ comments }: { comments: WrittenComment[] }) {
  return (
    <div className="cb-written cb-written--table">
      <table className="cb-written-table">
        <thead>
          <tr>
            <th className="cb-written-th cb-written-th--datetime" scope="col">date/time</th>
            <th className="cb-written-th" scope="col">user name</th>
            <th className="cb-written-th" scope="col">user ID</th>
            <th className="cb-written-th cb-written-th--comment" scope="col">COMMENT</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, i) => (
            <tr key={i}>
              <td className="cb-written-td cb-written-td--datetime">{comment.dateTime}</td>
              <td className="cb-written-td">{comment.userName}</td>
              <td className="cb-written-td">{comment.userId}</td>
              <td className="cb-written-td cb-written-td--comment">{comment.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CommentBox({
  title               = '*ADD COMMENT',
  autoCommentPlaceholder = 'Auto Comment',
  commentsPlaceholder = 'Comments',
  maxLength           = 300,
  rows                = 4,
  showCommentType     = false,
  commentType,
  onCommentTypeChange,
  showCTAs            = false,
  onSubmit,
  submitDisabled      = false,
  showWrittenComments = false,
  writtenCommentsVariant = 'view-only',
  writtenComments     = [],
  writtenCommentsTitle = 'Comments',
  className,
}: CommentBoxProps) {
  const classes = ['cb-root', className ?? ''].filter(Boolean).join(' ')
  const hasWritten = showWrittenComments && writtenComments.length > 0

  return (
    <div className={classes}>
      <div className="cb">
        <div className="cb-header">
          <span className="cb-title">{title}</span>
          <span className="cb-choose-options">Choose 1 or both options:</span>
        </div>

        <TextField
          color="comment"
          placeholder={autoCommentPlaceholder}
          showChevron
          className="cb-field"
        />

        <TextArea
          color="comment"
          placeholder={commentsPlaceholder}
          maxLength={maxLength}
          rows={rows}
          className="cb-field"
        />

        {showCommentType && (
          <div className="cb-comment-type">
            <span className="cb-comment-type-label">Comment Type:</span>
            <div className="cb-radios">
              {(['trade', 'break'] as const).map((type) => (
                <Radio
                  key={type}
                  size="sm"
                  name="comment-type"
                  value={type}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  checked={commentType === type}
                  onChange={() => onCommentTypeChange?.(type)}
                />
              ))}
            </div>
          </div>
        )}

        {showCTAs && (
          <div className="cb-ctas">
            <Button
              label="Submit"
              color="primary"
              variant="stroke"
              size="xs"
              disabled={submitDisabled}
              onClick={onSubmit}
            />
          </div>
        )}
      </div>

      {hasWritten && writtenCommentsVariant === 'view-only' && (
        <WrittenCommentsViewOnly
          title={writtenCommentsTitle}
          comments={writtenComments}
        />
      )}

      {hasWritten && writtenCommentsVariant === 'table' && (
        <WrittenCommentsTable comments={writtenComments} />
      )}
    </div>
  )
}
