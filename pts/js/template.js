/**
 * This script creates default templates.
 */

import { PlayerAI } from "./ai/player.js";
import { Weapon } from "./weapon.js";

const ais = {
    player: new PlayerAI()
}

const weapons = [
    new Weapon(1.0, 0, 3, 1, 30),  // pistol
    new Weapon(0.8, 0, 10, 1, 30),  // assault rifle
    new Weapon(0.5, 0, 1, 7, 30)   // shotgun
];

export { ais, weapons };
