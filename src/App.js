import { useState, useEffect } from 'react'

import Comments from './components/Comments'
import CommentForm from './components/CommentForm'

import './App.css'

const App = () => {
    const [comments, setComments] = useState([])
    const [commentsLength, setCommentsLength] = useState(0)

    const addComment = (name, comment) => {
        fetch('http://localhost:4000/createComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, message: comment }),
        })
            .then(() => {
                setCommentsLength(commentsLength + 1)
            })
            .catch((error) => console.error(error))
    }

    const deleteComments = () => {
        if (window.confirm('Are you sure you want to clear ALL comments?')) {
            fetch('http://localhost:4000/deleteComments', {
                method: 'DELETE',
                credentials: 'same-origin',
            }).catch((error) => console.error(error))
        } else {
            console.log('crisis averted')
        }
    }

    useEffect(() => {
        fetch('http://localhost:4000/getComments', {
            credentials: 'same-origin',
        })
            .then((response) => response.json())
            .then((data) => {
                // newest comments first
                data.sort((a, b) => new Date(b.created) - new Date(a.created))
                setComments(data)
            })
            .catch((error) => console.error(error))
    }, [commentsLength])

    return (
        <div className="App">
            <h1>Comments App</h1>
            <CommentForm handleSubmit={addComment} />

            <Comments comments={comments} />

            {/* only show delete button when comments are present */}
            {comments.length && (
                <button className="centered warning" onClick={deleteComments}>
                    DELETE ALL COMMENTS
                </button>
            )}
        </div>
    )
}

export default App
