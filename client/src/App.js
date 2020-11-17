import React from 'react'
import PostCreate from './PostCreate'
import PostList from './PostList'

export default _ => {
    return (
        <div className='container'>
            <h2>Create Post</h2>
            <PostCreate/>
            <hr/>
            <PostList/>
        </div>
    )
}
