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
    axios.post('http://nkoster-comments/events', event)
    axios.post('http://nkoster-query/events', event)
    axios.post('http://nkoster-moderation/events', event)
    res.send({ status: 'OK' })
    console.log('event emitted')
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(port, _ => {
    console.log('v0.0.8')
    console.log(`Event-Bus running on port ${port}`)
})
