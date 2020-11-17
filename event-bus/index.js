const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())

app.post('/events', (req, res) => {
    const event = req.body
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
    res.send({ status: 'OK' })
    console.log('event emitted')
})

app.listen(port, _ => console.log(`Event-Bus running on port ${port}`))
