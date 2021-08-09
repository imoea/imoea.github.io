/**
 * This script implements the main loop.
 */

import { Boss } from "./entity/boss.js";
import { Player } from "./entity/player.js";
import { input } from "./input.js";
import { updateBullets } from "./util.js";

const space = new CanvasSpace('pts').setup({ bgcolor: '#fff', offscreen: true });
const form = space.getForm();

let entities = {};

space.add({
    start: (bound) => {
        entities.boss = new Boss(space.center);
        entities.player = new Player(space.center.$add(0, 150));

        form.useOffscreen()
            .fillOnly('#fff')
            .rect(space.innerBound)
            .useOffscreen(false);
    },

    animate: (time, ftime) => {
        if (input.resume) {
            input.resume = false;
            time = 0, ftime = 0;
        }

        // update
        Object.values(entities).forEach(e => e.update(time, ftime));

        updateBullets(entities.boss, entities.player, time, ftime);
        updateBullets(entities.player, entities.boss, time, ftime);

        // keep entities within the map
        Object.values(entities).forEach(e => {
            e.x = Num.clamp(e.x, e.size, space.size.x - e.size);
            e.y = Num.clamp(e.y, e.size, space.size.y - e.size);
        })

        // render
        form.renderOffscreen();
        Object.values(entities).forEach(e => e.render(form));
    },

    action: (type, x, y, event) => { }
});

space.bindMouse().play();

export { entities, space };
