/**
 * This script implements weapons.
 */

class Bullet {
    constructor(source, velocity) {
        /**
         * Bullet constructor.
         * @param {Pt} source bullet source
         * @param {Pt} velocity bullet velocity
         * @return {Bullet}
        */

        this.color = '#f00';
        this.shape = 'circle';
        this.size = 1;
        this.trail = new Group(source.clone(), source.$subtract(velocity));
        this.velocity = velocity;
    }

    update() {
        this.trail.moveBy(this.velocity.x, this.velocity.y);
    }

    render(form) {
        form.stroke('#00f').line(this.trail);
        form.fillOnly(this.color).point(this.trail.p1, this.size, this.shape);
    }
}

class Weapon {
    constructor(accuracy, damage, rps, shots, speed) {
        /**
         * Weapon constructor.
         * @param {Number} accuracy weapon accuracy, between 0 and 1
         * @param {Number} damage weapon damage
         * @param {Number} rps rounds per second
         * @param {Number} shots shots per round
         * @param {Number} speed bullet speed
         * @return {Weapon}
        */

        this.cooldown = 1000 / rps;  // cooldown between rounds
        this.damage = damage;
        this.lastFired = 0;  // time weapon was last fired
        this.rate = 1000 / rps;  // rate of fire
        this.shots = shots;
        this.speed = speed;
        this.spread = 0.5 * (1 - accuracy);  // bullet spread
    }

    fire(owner, target, time, ftime) {
        /**
         * Fire the weapon.
         * @param {Player} owner owner of the weapon
         * @param {Pt} target target of the shot
         * @param {Number} time
         * @param {Number} ftime
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
