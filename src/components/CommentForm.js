const CommentForm = ({handleSubmit}) => {    
    const comment = {}

    const onSubmit = (event) => {
        console.log(event.target)
        event.preventDefault();
        
        let name = event.target[0].value
        let message = event.target[1].value

        handleSubmit(name, message);

        // empty out our fields
        event.target[0].value = ''
        event.target[1].value = ''
    };

    return (
        <div className="commentForm">
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name: </label>
                <input required type="text" placeholder="name" minLength="2" value={comment.name} />
                <label htmlFor="message">Message: </label>
                <textarea name="message" required placeholder="message" minLength="10" value={comment.message} />
                <button>Comment</button>
            </form>
        </div>
    )
}

export default CommentForm