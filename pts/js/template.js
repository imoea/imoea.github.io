/**
 * This script creates default templates.
 */

import { Weapon } from "./weapon.js";

const weapons = [
    new Weapon(1.0, 0, 2, 1, 30),  // pistol
    new Weapon(0.8, 0, 5, 1, 30),  // assault rifle
    new Weapon(0.5, 0, 1, 7, 30)   // shotgun
];

export { weapons };
