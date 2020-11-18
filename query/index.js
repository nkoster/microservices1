const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 4002

app.use(bodyParser())
app.use(cors())

app.get('/posts', (req, res) => {

})

app.post('/events', (req, res) => {
    const { type, data } = req.body
    if (type === 'PostCreated') {
        console.log(type, data)
    }

    if (type === 'CommentCreated') {
        console.log(type, data)
    }

    res.send({})
})

app.listen(PORT, _ => 
    console.log(`Blog Query micro service running at ${PORT}`)
)
