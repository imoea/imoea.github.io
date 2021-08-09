/**
 * This script implements the Bullet class.
 */

class Bullet extends Group {
    constructor(source, velocity) {
        /**
         * Bullet constructor.
         * @param {Pt} source bullet source
         * @param {Pt} velocity bullet velocity
         * @return {Bullet}
        */

        super(source.clone(), source.$subtract(velocity));
        this.color = '#f00';
        this.shape = 'circle';
        this.size = 1;
        this.source = source.clone();  // source of bullet
        this.used = false;  // bullet is used when it hits a target
        this.velocity = velocity.$multiply(0.06);
    }

    hasHit(hitBox) {
        /**
         * Check if the bullet intersects a hit box.
         * @param {Rectangle} hitBox bullet source
         * @return {Boolean}
        */

        let hit;
        if (Rectangle.withinBound(hitBox, this.p1)) {
            // in case the entire bullet trail is within the hit box
            hit = Rectangle.sides(hitBox)
                .map(l => Line.intersectLineWithRay2D(l, this))
                .filter(Boolean);
        } else {
            hit = Line.intersectRect2D(this, hitBox);
        }

        // move bullet position to point of impact
        switch (hit.length) {
            case 0:
                return false;
            case 1:
                this[0] = hit.p1;
                break;
            default:
                // choose position closest to the source
                let d = new Pt(
                    hit.map(p => p.$subtract(this.source).magnitudeSq()));
                this[0] = hit[d.minValue().index];
        }
        this.used = true;  // mark bullet as used for clean up
        this.size *= 3;  // increase bullet size for impact
        return true;
    }

    update(time, ftime) {
        /**
         * Update the bullet's position.
         * @param {Number} time in milliseconds
         * @param {Number} ftime in milliseconds
        */

        this.add(this.velocity.$multiply(ftime));
    }

    render(form) {
        /**
         * Render the bullet and its trail.
         * @param {Form} form
        */

        form.stroke('#00f').line(this);
        form.fillOnly(this.color).point(this.p1, this.size, this.shape);
    }
}

export { Bullet };
