const express = require('express'),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    app = express(),
    port = process.env.PORT || 5000,
    events = []

app.use(bodyParser.json())

app.post('/events', (req, res) => {
    const event = req.body
    events.push(event)
    axios.post('http://nkoster-posts/events', event)
    // axios.post('http://localhost:4001/events', event)
    // axios.post('http://localhost:4002/events', event)
    // axios.post('http://localhost:4003/events', event)
    res.send({ status: 'OK' })
    console.log('event emitted')
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(port, _ => {
    console.log('v0.0.5')
    console.log(`Event-Bus running on port ${port}`)
})
