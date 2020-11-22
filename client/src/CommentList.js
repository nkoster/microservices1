import React from 'react'

const CommentList = ({ comments }) => {

    const renderedComments = comments.map(comment => {
        let content
        if (comment.status === 'approved') {
            content = comment.content
        }
        if (comment.status === 'rejected') {
            content = 'rejected'
        }
        if (comment.status === 'pending') {
            content = 'pending...'
        }
        return (
            <li key={comment.id}>{content}</li>
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
