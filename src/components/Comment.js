import * as utils from '../utils/dateFormatting'

const Comment = (props) => {
    return (
        <article className="comment">
            <p className="comment__message">{props.message}</p>
            <div className="comment__author">
                <span>{props.name}</span> on{' '}
                <span>{utils.getDateCreated(props.created)}</span>
            </div>
        </article>
    )
}

export default Comment
