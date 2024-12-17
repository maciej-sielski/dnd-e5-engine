import { Character, DamageTypes } from "./models";

export interface Encounter {
    enemies: Character[];
    xpReward: number;
    description: string;
}

export interface Attack {
    damageDice: string;
    damageType: DamageTypes;
    toHitBonus: number;
    range: {
        normal: number;
        long?: number; // optional for ranged weapons
    };
}
