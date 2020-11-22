const express = require('express'),
    app = express(),
    axios = require('axios'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    PORT = process.env.PORT || 4002,
    posts = {},
    handleEvent = (type, data) => {
        if (type === 'PostCreated') {
            const { id, title } = data
            posts[id] = { id, title, comments: [] }
            console.log(type, data)
        }
    
        if (type === 'CommentCreated') {
            const { id, content, postId, status } = data
            posts[postId].comments.push({ id, content, status })
            console.log(type, data)
        }
    
        if (type === 'CommentUpdated') {
            const { id, content, postId, status } = data
            const post = posts[postId]
            const comment = post.comments.find(comment => id === comment.id)
            comment.status = status
            comment.content = content
            console.log(type, data)
        }
    }

app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (_, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body
    handleEvent(type, data)
    res.send({})
})

app.listen(PORT, async _ => {
    console.log(`Blog Query micro service running at ${PORT}`)
    const response = await axios.get('http://localhost:5000/events')
    Object.values(response.data).forEach(event => {
        console.log('Processing event', event.type)
        handleEvent(event.type, event.data)
    })
})
