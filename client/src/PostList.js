import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = _ => {

    const [posts, setPosts] = useState({})

    const fetchPosts = async _ => {
        const response = await axios.get('http://localhost:4002/posts')
        setPosts(response.data)
    }

    useEffect(_ => {
        fetchPosts()
    }, [])

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
                    <CommentList comments={post.comments}/>
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
