import { Inventory } from "../items";
import { AttributeName, CharacterClasses, CharacterRaces, Skill } from "../models";

export type NPCId = string;

export interface NPC extends Character {
    npcId: NPCId;
}

export interface Character {
    armorClass: number;
    name: string;
    race: CharacterRaces;
    class: CharacterClasses;
    level: number;
    hp: {
        current: number;
        max: number;
    };
    attributes: {
        [key in AttributeName]: number;
    };
    modifiers: {
        [key in AttributeName]: number;
    };
    skills: Skill[];
    inventory: Inventory;
}
