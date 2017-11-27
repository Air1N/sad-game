function update() {
    keyEvents();
    move();
}

function move() {
    for (let id in players) {
        players[id].velocity.y += world.gravity;
        players[id].y += players[id].velocity.y;
        
        players[id].x += players[id].velocity.x;
        
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

function render() {
    ctx.clearRect(0, 0, display.width, display.height);

    for (let id in players) {
        ctx.drawImage(sadReact, players[id].x, players[id].y, players[id].width, players[id].height);
    }

    requestAnimationFrame(render);
}

socket.on('initValues', function(data) {
    players = data.players;
});

socket.on('id', function(uID) {
    if (userID === null) userID = uID;
});

socket.on('jump', function(uID) {
    if (uID !== userID) {
        players[userID].velocity.y = -20;
    }
});

socket.on('left', function(uID) {
    if (uID !== userID) {
        players[userID].velocity.x = -5;
    }
});

socket.on('right', function(uID) {
    if (uID !== userID) {
        players[userID].velocity.x = 5;
    }
});

socket.on('idle', function(uID) {
    if (uID !== userID) {
        players[userID].velocity.x = 0;
    }
});

setInterval(update, 1000 / 100);
requestAnimationFrame(render);
