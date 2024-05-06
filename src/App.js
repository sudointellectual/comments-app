import Comments from './components/Comments'
import CommentForm from './components/CommentForm'

import axios from 'axios'
import { useState, useEffect } from 'react'

import './App.css'

const App = () => {
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
        let ignore = false
        setIsLoading(true)

        const fetchData = async () => {
            const response = await axios
                .get(
                    `http://localhost:4000/getComments?page=${page}&pageSize=5`
                )
                .then((response) => {
                    return response.data
                })

            return response
        }

        fetchData()
            .then((data) => {
                if (!ignore) {
                    setComments((prev) => [...prev, ...data.comments])
                    setErrorMessage('')
                    setShowLoadMore(data.totalPages > page)
                }
            })
            .catch((err) => {
                // set the error msg
                console.log('error: ', err)
                setErrorMessage('Something went wrong, Please try again later')
            })
            .finally(() => {
                setIsLoading(false)
            })
        return () => {
            ignore = true
        }
    }, [page])

    return (
        <div className="App">
            <header>
                <h1>Comments App</h1>
            </header>

            <CommentForm handleSubmit={addComment} />

            <Comments comments={comments} />

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
        </div>
    )
}

export default App
