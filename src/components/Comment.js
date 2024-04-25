const Comment = ({comment}) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    
    const created = new Date(comment.created).toLocaleDateString("en-US", options);
    
    return (
        <div className="comment">
            <p className="comment__message">{comment.message}</p>
            <div className="comment__author">
                <span>{comment.name}</span> on <span>{created}</span>
            </div>
        </div>
    )
}

export default Comment