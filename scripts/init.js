const display = document.getElementById("canvas");
const ctx = display.getContext("2d");

var socket = io();

let mouseDown = false;

let lmx = 0;
let lmy = 0;

let userID = null;

let players = [];

let sadReact = new Image();
sadReact.src = "./assets/sad.png";

let world = {
    gravity: 0.5,
    bottom: 950
};