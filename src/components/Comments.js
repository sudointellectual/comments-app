import CommentForm from './CommentForm'
import Comment from './Comment'

const Comments = ({ comments }) => {
    return (
        <>
            {comments
                .sort((a, b) => new Date(b.created) - new Date(a.created))
                .map(function (comment) {
                    return (
                        <Comment
                            key={comment.id}
                            name={comment.name}
                            created={comment.created}
                            message={comment.message}
                        />
                    )
                })}
        </>
    )
}

export default Comments
