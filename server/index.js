const express = require('express')
const app =  express()
const server = require('http').Server(app)

const port = 3002

app.use(express.static(__dirname + '/../client'))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname, + '/../client/index.html')
// })

server.listen(port, () => console.log('... listening on port:' + server.address().port))