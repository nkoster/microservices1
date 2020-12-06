import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({ id }) => {
    const [content, setContent] = useState('')
    const onSubmit = async evt => {
        evt.preventDefault()
        await axios.post(`http://nkoster.pvdev.portavita.net/posts/${id}/comments`, {
            content
        })
        setContent('')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <hr/>
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
