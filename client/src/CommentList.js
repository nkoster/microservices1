import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = ({ id }) => {

    const [comments, setComments] = useState([])

    const fetchComments = async _ => {
        const response = await axios.get(`http://localhost:4001/posts/${id}/comments`)
        setComments(response.data)
    }

    useEffect(_ => {
        fetchComments()
    }, [])

    const renderedComments = comments.map(comment => {
        return (
            <li key={comment.id}>{comment.content}</li>
        )
    })

    return (
        <div>
            <ul>
                {renderedComments}
            </ul>
        </div>
    )

}

export default CommentList
