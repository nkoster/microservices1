import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'

const PostList = _ => {

    const [posts, setPosts] = useState({})

    const fetchPosts = async _ => {
        const response = await axios.get('http://localhost:4000/posts')
        setPosts(response.data)
    }

    useEffect(_ => {
        fetchPosts()
    }, [posts])

    // Return an array of objects from an object
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div
                className='card'
                key={post.id}
                style={{
                    width: '30%',
                    marginBottom: '20px'
                }}
            >
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <CommentCreate id={post.id}/>
                </div>
            </div>
        )
    })

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    )

}

export default PostList
