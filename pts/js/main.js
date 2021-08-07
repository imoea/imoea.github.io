/**
 * This script implements the main loop.
 */
import { Player } from './entity/player.js';
import { input } from './input.js';

let player;

space.add({
    start: (bound) => {
        player = new Player(space.center);
        form.useOffscreen()
            .fillOnly('#fff')
            .rect(space.innerBound)
            .useOffscreen(false);
    },

    animate: (time, ftime) => {
        if (!input.paused) {
            player.update(space, time, ftime);

            form.renderOffscreen();
            player.render(form);
        }
    },

    action: (type, x, y, event) => { }
});

space.bindMouse().play();
