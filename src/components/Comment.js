import * as utils from '../utils/dateFormatting'

const Comment = ({ comment }) => {
    return (
        <article className="comment">
            <p className="comment__message">{comment.message}</p>
            <div className="comment__author">
                <span>{comment.name}</span> on{' '}
                <span>{utils.getDateCreated(comment.created)}</span>
            </div>
        </article>
    )
}

export default Comment
