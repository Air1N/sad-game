const display = document.getElementById("canvas");
const ctx = display.getContext("2d");

var socket = io();

let mouseDown = false;

let lmx = 0;
let lmy = 0;

let userID = null;

let players = [new Player()];

let sadReact = new Image();
sadReact.src = "assets/sad.png";

let world = {
    gravity: 0.5,
    bottom: 950
};

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