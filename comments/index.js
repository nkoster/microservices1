const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    cors = require('cors'),
    { randomBytes } = require('crypto'),
    port = process.env.PORT || 4001,
    commentsByPostId = []

app.use(bodyParser.json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id, content, status: 'pending' })
    commentsByPostId[req.params.id] = comments
    await axios.post('http://nkoster-event-bus/events', {
        type: 'CommentCreated',
        data: {
            id,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    res.status(201).send(comments)
    console.log('POST [comments]', req.params.id, { id, content })
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    if (type === 'CommentModerated') {
        const { id, postId, content, status } = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => comment.id === id)
        comment.status = status
        console.log('STATUS', comment.status)
        await axios.post('http://nkoster-event-bus/events', {
            type: 'CommentUpdated',
            data: { id, content, postId, status }
        })
    }
    console.log('Received event:', req.body.type)
    res.send({})
})

app.listen(port, _ => {
    console.log('v0.0.4')
    console.log(`Blog Comments micro service running at ${port}`)
})
