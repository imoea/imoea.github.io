/**
 * This script creates default templates.
 */

import { BossAI } from "../ai/boss.js";
import { PlayerAI } from "../ai/player.js";
import { Weapon } from "./weapon.js";

const ais = {
    boss: new BossAI(),
    player: new PlayerAI()
}

const weapons = [
    new Weapon(1.0, 0, 3, 3, 1, 30),  // pistol
    new Weapon(0.8, 0, 5, 10, 1, 30),  // assault rifle
    new Weapon(0.5, 0, 7, 1, 7, 30),  // shotgun
    new Weapon(1.0, 0, 5, 2, 1, 10)  // boss gun
];

export { ais, weapons };
