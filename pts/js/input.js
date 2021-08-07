/*
This script handles player inputs.
*/

'use strict';

const input = {
    key: { 65: false, 68: false, 83: false, 87: false },
    mouse: { 0: false, 1: false, 2: false },
}
var paused = false;

window.onkeydown = function (e) {
    input.key[e.keyCode] = true;

    if (e.keyCode === 27) { // ESC to pause
        paused = !paused;
        if (paused) space.pause();
        else space.resume();
    }
};

window.onkeypress = function (e) {
    if (e.keyCode === 49) player.weapon = weapons.pistol;
    if (e.keyCode === 50) player.weapon = weapons.assault_rifle;
    if (e.keyCode === 51) player.weapon = weapons.shotgun;
}

window.onkeyup = function (e) {
    input.key[e.keyCode] = false;
}

window.onmousedown = function (e) {
    input.mouse[e.button] = true;
}

window.onmouseup = function (e) {
    input.mouse[e.button] = false;
}
