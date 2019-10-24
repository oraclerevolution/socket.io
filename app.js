var http = require('http')
var fs = require('fs')

//chargement du fichier index.html affiché au client
var server = http.createServer((req, res)=>{
    fs.readFile('./index.html', 'utf-8', (error, content)=>{
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(content)
    })
})

//chargement de socket.io
var io = require('socket.io').listen(server)

//quand un client se connecte, on le note dans la console

io.sockets.on('connection', (socket)=>{
    console.log('un client est connecté !')
    socket.emit('message', 'Vous êtes bien connecté')

    //quand le serveur recoit un signal de type 'message' du client

    socket.on('message',(message)=>{
        console.log('le client veut te parler ! il dit: ' + message)
    })
})

server.listen(8080)