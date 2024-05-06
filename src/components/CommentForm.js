const CommentForm = ({ handleSubmit }) => {
    const comment = {}

    const onSubmit = (event) => {
        event.preventDefault()

        // pass values from form submission to parent
        handleSubmit(event.target[0].value, event.target[1].value)

        // empty out our fields
        event.target.reset()
    }

    return (
        <form className="commentForm" onSubmit={onSubmit}>
            <label htmlFor="name">Name: </label>
            <input
                required
                type="text"
                placeholder="name"
                minLength="2"
                value={comment.name}
            />
            <label htmlFor="message">Message: </label>
            <textarea
                name="message"
                required
                placeholder="message"
                minLength="5"
                value={comment.message}
            />
            <button>Comment</button>
        </form>
    )
}

export default CommentForm
