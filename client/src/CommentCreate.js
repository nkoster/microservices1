import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({ id }) => {
    const [content, setContent] = useState('')
    const onSubmit = async evt => {
        evt.preventDefault()
        await axios.post(`http://localhost:4001/posts/${id}/comments`, {
            content
        })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input
                        className='form-control'
                        value={content}
                        // works magically also without setting value={content} 
                        onChange={evt => setContent(evt.target.value)}
                    />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate
