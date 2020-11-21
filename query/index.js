const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 4002
const posts = {}

app.use(bodyParser())
app.use(cors())

app.get('/posts', (req, res) => {
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
        const { id, content, postId } = data
        posts[postId].comments.push({ id, content })
        console.log(type, data)
    }

    res.send({})
})

app.listen(PORT, _ => 
    console.log(`Blog Query micro service running at ${PORT}`)
)
