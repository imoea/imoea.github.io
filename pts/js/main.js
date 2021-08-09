/**
 * This script implements the main loop.
 */
import { Player } from './entity/player.js';
import { input } from './input.js';

const space = new CanvasSpace('pts').setup({ bgcolor: '#fff', offscreen: true });
const form = space.getForm();

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
        // main game loop
        if (!input.paused) {
            // update
            player.update(time, ftime);

            // render
            form.renderOffscreen();
            player.render(form);
        }
    },

    action: (type, x, y, event) => { }
});

space.bindMouse().play();

export { space };
