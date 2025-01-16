import { AttributeName, CharacterSkills, DamageTypes, WeaponProperties, WeaponTypes } from "../models";
import { QuestProgress } from "../quests";
import { Money } from "./money";

export type ItemId = string;

export interface Item {
    id: ItemId;
    description: string;
    weight: number;
    isMagical: boolean;
    value: Money;

    questProgress?: QuestProgress;
}

export interface Weapon extends Item {
    weaponType: WeaponTypes;
    damage: {
        dice: string;
        type: DamageTypes;
    };
    toHitBonus?: number;
    properties: WeaponProperties[];
    requirements?: {
        /** Skills required to wield this weapon effectively */
        skills?: CharacterSkills[];
        /** Minimum require attributes values */
        attributes?: {
            [key in AttributeName]: number;
        };
    };
    range: {
        normal: number;
        long?: number; // optional for ranged weapons
    };
}

export interface Shield extends Item {
    armorClassBonus: number;
    strengthRequirement?: number;
    stealthDisadvantage: boolean;
}

export interface Armor extends Item {
    armorClass: number;
    strengthRequirement?: number;
    stealthDisadvantage: boolean;
}

export interface Ring extends Item {
    magicalEffect: string;
}

export interface Helmet extends Item {
    armorClassBonus: number;
    magicalEffect?: string;
}

export interface Shoes extends Item {
    speedBonus: number;
    magicalEffect?: string;
}

export interface Cloak extends Item {
    stealthBonus: number;
    magicalEffect?: string;
}
