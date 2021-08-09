/**
 * This script defines miscellaneous functions.
 */

import { space } from "./main.js";
import { weapons } from "./entity/template.js";

function updateBullets(source, target, time, ftime) {
    let hitBox = target.hitBox();
    let knockback = new Pt();
    let bulletsHit = [];

    for (let i = source.bullets.length - 1; i >= 0; i--) {
        let bullet = source.bullets[i];
        bullet.update(time, ftime)

        if (bullet.used ||
            !Num.within(bullet.q1.x, 0, space.size.x) ||
            !Num.within(bullet.q1.y, 0, space.size.y)) {
            source.bullets.splice(i, 1);
            continue;
        }

        // check for bullets that hit
        if (bullet.hasHit(hitBox)) {
            // accumulate knockback
            if (weapons[source.weapon].knockback > 0) {
                knockback.add(target.$subtract(source).unit()
                    .$multiply(weapons[source.weapon].knockback * ftime));
                bulletsHit.push(bullet);
            }
        }
    }

    // apply knockback to all affected entities
    if (bulletsHit.length > 0) {
        bulletsHit.forEach(bullet => bullet[0].add(knockback));
        target.add(knockback);
    }
}

export { updateBullets };
