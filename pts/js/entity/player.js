/**
 * This script defines all the entities.
 */

import { space } from '../main.js';
import { ais } from '../template.js';

class Player extends Pt {
    constructor(loc, color = '#000', shape = 'square', size = 5, speed = 5) {
        /**
         * Player constructor.
         * @param {Pt} loc start location
         * @param {String} color colour
         * @param {String} shape shape
         * @param {Number} size size
         * @param {Number} speed movement speed
         * @return {Player}
        */

        super(loc);
        this.ai = ais.player;
        this.color = color;
        this.shape = shape;
        this.size = size;
        this.speed = speed;
        this.weapon = 0;
        this.bullets = [];
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
         * @param {Number} time
         * @param {Number} ftime
        */

        // update player actions
        this.ai.update(this, time, ftime);

        // update bullets
        this.bullets.forEach(bullet => bullet.update());
        while (this.bullets.length > 0 &&
            (!Num.within(this.bullets[0].trail.q1.x, 0, space.size.x) ||
                !Num.within(this.bullets[0].trail.q1.y, 0, space.size.y))) {
            this.bullets.shift();
        }
    }

    render(form) {
        /**
         * Render the player.
         * @param {Form} form
        */

        form.fillOnly(this.color).point(this, this.size, this.shape);
        this.bullets.forEach(bullet => bullet.render(form));
    }
}

export { Player };
