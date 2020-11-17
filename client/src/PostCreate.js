import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = _ => {
    const [title, setTitle] = useState('')
    const onSubmit = async evt => {
        evt.preventDefault()
        await axios.post('http://localhost:4000/posts', {
            title
        })
        setTitle('')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>{title ? 'Title: ' + title : 'Title'}</label>
                    <input
                        value={title}
                        className='form-control'
                        onChange={evt => setTitle(evt.target.value)}
                    />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default PostCreate
