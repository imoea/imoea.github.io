/**
 * This script controls AIs.
 */

import { weapons } from "../entity/template.js";
import { input } from "../input.js";
import { space } from "../main.js";

class PlayerAI {
    constructor() { }

    update(owner, time, ftime) {
        /**
         * Update AI using player's inputs.
         * @param {Player} owner owner of the AI
         * @param {Number} time milliseconds since the start
         * @param {Number} ftime milliseconds since the previous render
        */

        // update movement
        let d = new Pt();
        if (input.key[87]) d.y -= 1;  // W
        if (input.key[65]) d.x -= 1;  // A
        if (input.key[83]) d.y += 1;  // S
        if (input.key[68]) d.x += 1;  // D
        if (d.x != 0 || d.y != 0) {
            owner.add(d.unit().$multiply(owner.speed * ftime));
        }

        // update firing
        if (input.mouse[0]) {
            weapons[owner.weapon].fire(owner, space.pointer, time, ftime);
        }

        // update weapon swap
        if (-1 < input.weaponSwap && input.weaponSwap < weapons.length - 1) {
            owner.weapon = input.weaponSwap;
            input.weaponSwap = -1;
        }
    }
}

export { PlayerAI };
