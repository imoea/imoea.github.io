/**
 * This script defines all the entities.
 */

import { ais } from "./template.js";

class Boss extends Pt {
    constructor(pos, color = '#f00', shape = 'square', size = 50, speed = 1) {
        /**
         * Boss constructor.
         * @param {Pt} pos start location
         * @param {String} color colour
         * @param {String} shape shape
         * @param {Number} size size
         * @param {Number} speed movement speed
         * @return {Player}
        */

        super(pos);
        this.ai = ais.boss;
        this.color = color;
        this.shape = shape;
        this.size = size;
        this.speed = speed * 0.06;
        this.weapon = 3;
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

        // update boss actions
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

export { Boss };
