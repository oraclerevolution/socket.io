var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent') //permet de bloquer les caractères HTML


//chargement de la page index.html
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection', (socket, pseudo) => {
    //Des qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', (pseudo) =>{
        pseudo = ent.encode(pseudo)
        socket.pseudo = pseudo
        socket.broadcast.emit('nouveau_client', pseudo)
    })

    //Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes

    socket.on('message', (message) => {
        message = ent.encode(message)
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message})
    })
})

server.listen(8080)