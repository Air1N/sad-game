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
let players = {};
let projectiles = [];

let world = {
    gravity: 0.5,
    bottom: 950
};

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

    socket.on('jump', function(uID) {
        io.emit('jump', uID);

        players[uID].velocity.y = -20;
    });
    
    socket.on('left', function(uID) {
        io.emit('left', uID);

        players[uID].velocity.x = -5;
    });
    
    socket.on('right', function(uID) {
        io.emit('right', uID);

        players[uID].velocity.x = 5;
    });
    
    socket.on('idle', function(uID) {
        io.emit('idle', uID);

        players[uID].velocity.x = 0;
    });
});

http.listen(port, function() {
    console.log('listening on *:' + (port).toString());
});

function Player() {
    this.x = 0;
    this.y = 0;

    this.velocity = {
        x: 0,
        y: 0
    };

    this.width = 250;
    this.height = 200;

    this.onground = false;
}

function move() {
    for (let id in players) {
        players[id].velocity.y += world.gravity;
        players[id].y += players[id].velocity.y;

        if (players[id].y + players[id].height < world.bottom) {
            players[id].onground = false;
        } else {
            players[id].onground = true;
        }

        if (players[id].onground) {
            players[id].y = world.bottom - players[id].height;
            players[id].velocity.y = 0;
        }
    }
}

setInterval(move, 1000 / 100);