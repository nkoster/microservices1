const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    PORT = process.env.PORT || 4002,
    posts = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (_, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body
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

    res.send({})
})

app.listen(PORT, _ => 
    console.log(`Blog Query micro service running at ${PORT}`)
)
