/**
 * This script defines all the entities.
 */

import { ais } from "./template.js";

class Player extends Pt {
    constructor(pos, color = '#000', shape = 'square', size = 5, speed = 2) {
        /**
         * Player constructor.
         * @param {Pt} pos start location
         * @param {String} color colour
         * @param {String} shape circle / square
         * @param {Number} size size
         * @param {Number} speed movement speed
         * @return {Player}
        */

        super(pos);
        this.ai = ais.player;
        this.color = color;
        this.shape = shape;
        this.size = size;
        this.speed = speed * 0.06;
        this.weapon = 0;
        this.bullets = new Group();
    }

    hitBox() {
        /**
         * Hit box.
         * @return {Group} represents a hit box
        */

        return Rectangle.fromCenter(this, 2 * this.size);
    }

    update(time, ftime) {
        /**
         * Update the player.
         * @param {Number} time in milliseconds
         * @param {Number} ftime in milliseconds
        */

        // update player actions
        this.ai.update(this, time, ftime);
    }

    render(form) {
        /**
         * Render the player.
         * @param {Form} form
        */

        this.bullets.forEach(bullet => bullet.render(form));
        form.fillOnly(this.color).point(this, this.size, this.shape);
    }
}

export { Player };
