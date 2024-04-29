import Comment from './Comment'

const Comments = ({ comments }) => {
    return (
        <>
            {comments.map(function (comment) {
                return <Comment key={comment.id} comment={comment} />
            })}
        </>
    )
}

export default Comments
