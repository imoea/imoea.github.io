/**
 * This script defines all the entities.
 */

import { input } from '../input.js';
import { weapons } from '../template.js';

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
        this.color = color;
        this.shape = shape;
        this.size = size;
        this.speed = speed;
        this.weapon = 0;
        this.bullets = [];
    }

    update(space, time, ftime) {
        /**
         * Player constructor.
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
            this.add(d.unit().$multiply(this.speed));
            this.x = Num.clamp(this.x, this.size, space.size.x - this.size);
            this.y = Num.clamp(this.y, this.size, space.size.y - this.size);
        }

        // update firing
        if (input.mouse[0]) {
            weapons[this.weapon].fire(this, space.pointer, time, ftime);
        }

        // update weapon swap
        if (-1 < input.weaponSwap && input.weaponSwap < weapons.length) {
            this.weapon = input.weaponSwap;
            input.weaponSwap = -1;
        }

        // update bullets
        this.bullets.forEach(bullet => bullet.update());
        while (this.bullets.length > 0 &&
            (!Num.within(this.bullets[0].trail.q1.x, 0, space.size.x) ||
                !Num.within(this.bullets[0].trail.q1.y, 0, space.size.y))) {
            this.bullets.shift();
        }
    }

    render(form) {
        form.fillOnly(this.color).point(this, this.size, this.shape);
        this.bullets.forEach(bullet => bullet.render(form));
    }
}

export { Player };
