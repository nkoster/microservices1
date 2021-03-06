const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    axios = require('axios'),
    { randomBytes } = require('crypto'),
    port = process.env.PORT || 4000,
    posts = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = { id, title }
    await axios.post('http://nkoster-event-bus/events', {
        type: 'PostCreated',
        data: { id, title }
    })
    res.status(201).send(posts[id])
    console.log('POST [posts]', posts[id])
})

app.post('/events', (req, res) => {
    console.log('Received event:', req.body.type)
    res.send({})
})

app.listen(port, _ => {
    console.log('v0.0.5')
    console.log(`Blog Posts micro service running at ${port}`)
})
