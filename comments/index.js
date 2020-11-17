const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const { randomBytes } = require('crypto')

const port = process.env.PORT || 4001
const commentsByPostId = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id, content })
    commentsByPostId[req.params.id] = comments
    res.status(201).send(comments)
    console.log('POST [comments]', req.params.id, { id, content })
})

app.listen(port, _ => console.log(`Blog Comments micro service running at ${port}`))