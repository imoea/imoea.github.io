/**
 * This script handles player inputs.
 */

import { space } from "./main.js";
import { weapons } from "./entity/template.js";

const input = {
    key: {
        16: false,  // LShift   Run
        27: false,  // Esc      Pause
        32: false,  // Space    Dodge
        65: false,  // A        Move Left
        68: false,  // D        Move Right
        83: false,  // S        Move Down
        87: false   // W        Move Up
    },
    mouse: {
        0: false,   // LMB      Shoot
        1: false,   // MMB
        2: false    // RMB
    },
    pause: false,
    resume: false,
    weaponSwap: -1
}

window.onkeydown = function (e) {
    input.key[e.keyCode] = true;

    if (e.keyCode === 27) { // ESC to pause
        input.pause = !input.pause;
        if (input.pause) space.pause();
        else {
            input.resume = true;
            space.resume();
        }
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
