import CommentForm from './CommentForm'
import Comments from './Comments'

import axios from 'axios'
import { useState, useEffect } from 'react'

const CommentsList = () => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [page, setPage] = useState(1)
    const [showLoadMore, setShowLoadMore] = useState(true)

    const addComment = (name, comment) => {
        axios
            .post('http://localhost:4000/createComment', {
                name: name,
                message: comment,
            })
            .catch((error) => console.error(error))
    }

    const deleteComments = () => {
        if (window.confirm('Are you sure you want to clear ALL comments?')) {
            axios
                .delete('http://localhost:4000/deleteComments')
                .then((response) => {
                    console.log(`comments deleted`)
                })
        } else {
            console.log('crisis averted')
        }
    }

    const loadMore = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        setIsLoading(true)
        axios
            .get(`http://localhost:4000/getComments?page=${page}&pageSize=5`)
            .then((response) => {
                setComments((prev) => [...prev, ...response.data.comments])
                setErrorMessage('')
                setShowLoadMore(response.data.totalPages > page)
            })
            .catch((err) => {
                // set the error msg
                console.log('error: ', err)
                setErrorMessage('Something went wrong, Please try again later')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [page])

    return (
        <>
            <header>
                <h1>Comments App</h1>
            </header>

            <CommentForm handleSubmit={addComment} />

            <section>
                <Comments comments={comments} />
            </section>

            {errorMessage && <p className="error-msg">{errorMessage}</p>}

            {showLoadMore && (
                <button onClick={loadMore} className="centered">
                    {isLoading ? 'Loading...' : 'Load More'}
                </button>
            )}

            {/* only show delete button when comments are present */}
            {comments.length && (
                <>
                    <button
                        className="centered warning"
                        onClick={deleteComments}
                    >
                        DELETE ALL COMMENTS
                    </button>
                </>
            )}
        </>
    )
}

export default CommentsList
