const
    PORT = process.env.PORT || 4003
    express = require('express'),
    app = express(),
    axios = require('axios'),
    bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange')
            ? 'rejected' : 'approved'
        await axios.post('http://localhost:5000/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status
            }
        })
        console.log(req.body)
    }
    res.send({ event: req.body.type })
})

app.listen(PORT, _ =>
    console.log(`Moderation Service running at ${PORT}`))
