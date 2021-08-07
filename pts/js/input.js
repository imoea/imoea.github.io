/**
 * This script handles player inputs.
 */

import { space } from './main.js';
import { weapons } from './template.js';

const input = {
    key: {
        65: false,  // A
        68: false,  // D
        83: false,  // S
        87: false   // W
    },
    mouse: {
        0: false,  // LMB
        1: false,  // MMB
        2: false   // RMB
    },
    paused: false,
    weaponSwap: -1
}

window.onkeydown = function (e) {
    input.key[e.keyCode] = true;

    if (e.keyCode === 27) { // ESC to pause
        input.paused = !input.paused;
        if (input.paused) space.pause();
        else space.resume();
    }
};

window.onkeyup = function (e) {
    input.key[e.keyCode] = false;
}

// for swapping weapons
window.onkeypress = function (e) {
    if (49 <= e.keyCode && e.keyCode < 49 + weapons.length) {
        input.weaponSwap = e.keyCode - 49;
    }
}

// for attacking
window.onmousedown = function (e) {
    input.mouse[e.button] = true;
}

window.onmouseup = function (e) {
    input.mouse[e.button] = false;
}

export { input };
