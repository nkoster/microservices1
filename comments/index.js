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
    comments.push({ id, content })
    commentsByPostId[req.params.id] = comments
    await axios.post('http://localhost:5000/events', {
        type: 'CommentCreated',
        data: {
            id,
            content,
            postId: req.params.id
        }
    })
    res.status(201).send(comments)
    console.log('POST [comments]', req.params.id, { id, content })
})

app.post('/events', (req, res) => {
    console.log('Received event:', req.body.type)
    res.send({})
})

app.listen(port, _ => console.log(`Blog Comments micro service running at ${port}`))
