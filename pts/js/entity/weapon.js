/**
 * This script implements the Weapon class.
 */

import { Bullet } from "./bullet.js";

class Weapon {
    constructor(accuracy, damage, knockback, rps, shots, speed) {
        /**
         * Weapon constructor.
         * @param {Number} accuracy weapon accuracy, between 0 and 1
         * @param {Number} damage weapon damage
         * @param {Number} knockback knockback per round
         * @param {Number} rps rounds per second
         * @param {Number} shots shots per round
         * @param {Number} speed bullet speed
         * @return {Weapon}
        */

        this.cooldown = 1000 / rps;                 // cooldown between rounds
        this.damage = damage;
        this.knockback = 0.06 * knockback / shots;  // spread across shots
        this.lastFired = 0;                         // last fired time
        this.rate = 1000 / rps;                     // rate of fire
        this.shots = shots;
        this.speed = speed;
        this.spread = 0.5 * (1 - accuracy);         // bullet spread
    }

    fire(owner, target, time, ftime) {
        /**
         * Fire the weapon.
         * @param {Player} owner owner of the weapon
         * @param {Pt} target target of the shot
         * @param {Number} time in milliseconds
         * @param {Number} ftime in milliseconds
        */

        if (time > this.lastFired + this.rate) {
            this.cooldown = this.rate;
        }
        this.cooldown += ftime;
        if (this.cooldown > this.rate) {
            let velocity =
                target.$subtract(owner).unit().$multiply(this.speed);
            for (let i = 0; i < this.shots; i++) {
                let shotVelocity = velocity.clone();
                if (this.spread > 0) {
                    shotVelocity
                        .rotate2D(Num.randomRange(-this.spread, this.spread));
                }
                owner.bullets.push(new Bullet(owner, shotVelocity));
            }
            this.cooldown = Num.boundValue(this.cooldown, 0, this.rate);
            this.lastFired = time;
        }

    }
}

export { Weapon };
