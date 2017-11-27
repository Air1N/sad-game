function update() {
    keyEvents();
    move();
}

function move() {
    for (let player of players) {
        player.velocity.y += world.gravity;
        player.y += player.velocity.y;

        if (player.y + player.height < world.bottom) {
            player.onground = false;
        } else {
            player.onground = true;
        }
        
        if (player.onground) {
            player.y = world.bottom - player.height;
            player.velocity.y = 0;
        }
    }
}

function render() {
    ctx.clearRect(0, 0, display.width, display.height);

    for (let player of players) {
        ctx.drawImage(sadReact, player.x, player.y, player.width, player.height);
    }

    requestAnimationFrame(render);
}

socket.on('initValues', function(data) {
    players = data.players;
});

socket.on('id', function(uID) {
    if (userID === null) userID = uID;
});

setInterval(update, 1000 / 100);
requestAnimationFrame(render);
