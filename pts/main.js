/*
This script implements the main loop.
*/

'use strict';

const space = new CanvasSpace('pts').setup({ bgcolor: '#fff', offscreen: true });
const form = space.getForm();

let player;

space.add({
    start: (bound) => {
        player = new Player(space.center);
        // player.weapon = weapons.assault_rifle;
        form.useOffscreen()
            .fillOnly('#fff')
            .rect(space.innerBound)
            .useOffscreen(false);
    },

    animate: (time, ftime) => {
        if (!paused) {
            player.update(time, ftime);

            form.renderOffscreen();
            player.render();
        }
    },

    action: (type, x, y, event) => { }
});

space.bindMouse().play();
