import { useState, useEffect } from "react";

import Comment from "./Comment"
import CommentForm from "./CommentForm"

const Comments = () => {
    const [comments, setComments] = useState([])
    const [commentsLength, setCommentsLength] = useState(0)
    
    const addComment = (name, comment) => {
        fetch('http://localhost:4000/createComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, message: comment })
        })
        .then(response => {
            response.json()
            setCommentsLength(commentsLength + 1)
        })
        .catch(error => console.error(error));
    };

    const deleteComments = () => {
        if (window.confirm("Are you sure you want to clear ALL comments?")) {
            fetch('http://localhost:4000/deleteComments', {
                method: 'DELETE',
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch(error => console.error(error));
        } else {
            console.log("crisis averted")
        }
    };

    useEffect(() => {
        fetch('http://localhost:4000/getComments', {
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then((data) => {
            // newest comments first
            data.sort((a, b) => new Date(b.created) - new Date(a.created));
            setComments(data)
        })
        .catch(error => console.error(error));
      }, [commentsLength]);
    
    return (
        <div>
            <CommentForm handleSubmit={addComment} />
            
            {comments && comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                />
            ))}

            <button className="centered" onClick={deleteComments}>DELETE ALL COMMENTS</button>

        </div>
    )
}

export default Comments