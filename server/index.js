const express = require('express')
const app =  express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)

const port = 3002
const players = {}

app.use(express.static(__dirname + '/../client'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  }

  socket.emit('currentPlayers', players)
  socket.broadcast.emit('newPlayer', players[socket.id])

  console.log('a user connected')

  socket.on('disconnect', () => {
    delete players[socket.id]
    io.emit('disconnect', socket.id)

    console.log('user disconnect')
  })

  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x
    players[socket.id].y = movementData.y
    players[socket.id].rotation = movementData.rotation

    socket.broadcast.emit('playerMoved', players[socket.id])
  })
})



server.listen(port, () => console.log('... listening on port:' + server.address().port))