var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 80;

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/', express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

let userID = 0;
let clientID = 0;
let idList = [];
let players = [];
let projectiles = [];

io.on('connection', function(socket) {
    userID = socket.handshake.address;
    userID = userID.replace(/::ffff:/gi, "").replace(/\./gi, "");
    
    console.log('ID: ' + userID + ' connected.');
    
    if (idList.indexOf(userID) == -1) {
        players[userID] = new Player();
        idList.push(userID);
    }

    io.emit('initValues', {
        players: players
    });
    
    io.emit('id', userID);
});

http.listen(port, function() {
    console.log('listening on *:' + (port).toString());
});

function Player() {
    this.x = 0;
    this.y = 0;
    
    this.width = 10;
    this.height = 10;
}
