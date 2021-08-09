/**
 * This script controls AIs.
 */

import { weapons } from "../entity/template.js";
import { entities } from "../main.js";

class BossAI {
    constructor() { }

    update(owner, time, ftime) {
        /**
         * Update AI using player's inputs.
         * @param {Player} owner owner of the AI
         * @param {Number} time milliseconds since the start
         * @param {Number} ftime milliseconds since the previous render
        */

        // update movement
        owner.add(entities.player.$subtract(owner).unit()
            .$multiply(owner.speed * ftime));

        // update firing
        weapons[owner.weapon].fire(owner, entities.player, time, ftime);
    }
}

export { BossAI };
