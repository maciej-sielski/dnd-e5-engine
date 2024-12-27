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
    properties: WeaponProperties[];
    requirements?: {
        /** Skills required to wield this weapon effectively */
        skills?: CharacterSkills[];
        /** Minimum require attributes values */
        attributes?: {
            [key in AttributeName]: number;
        };
    };
}
