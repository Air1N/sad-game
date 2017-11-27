let activeKeys = [];

function keyEvents() {
    if (keyDown("w")) {
        if (players[userID].onground) {
            players[userID].velocity.y = -20;
        }
    }
}

window.onkeydown = function(e) {
    activeKeys.push(e.keyCode);
};

window.onkeyup = function(e) {
    var z = activeKeys.indexOf(e.keyCode);
    toggle = true;
    for (i = activeKeys.length; i > 0; i--) {
        if (z == -1) break;
        activeKeys.splice(z, 1);
        z = activeKeys.indexOf(e.keyCode);
    }
};

function keyDown(key) {
    if (activeKeys.indexOf(keys[key.toLowerCase()]) > -1) return true;
    return false;
}

window.onmousedown = function(e) {
    mouseDown = true;
};

window.onmouseup = function(e) {
    mouseDown = false;
};

window.onmousemove = function(e) {
    mousex = (e.clientX - display.getBoundingClientRect().left) * (display.width / display.clientWidth);
    mousey = (e.clientY - display.getBoundingClientRect().top) * (display.height / display.clientHeight);

    if (mouseDown) {

    }

    lmx = mousex;
    lmy = mousey;
};

window.onmousewheel = function(e) {
    delta = e.wheelDelta / 60;
    mousex = (e.clientX - display.getBoundingClientRect().left) * (display.width / display.clientWidth);
    mousey = (e.clientY - display.getBoundingClientRect().top) * (display.height / display.clientHeight);
};

Array.prototype.getLast = function() {
    return this[this.length - 1];
};