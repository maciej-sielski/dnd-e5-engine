import { Weapon } from "./items";
import { DamageTypes } from "./models";
import { Character } from "./npc";
import { rollDice } from "@ms-sol/dice-roll";

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

function createDummyWeaponForBareHandAttack(strengthModifier: number): Weapon {
    return {
        weaponType: 'melee',
        damage: {
            dice: '1d4',
            type: 'bludgeoning'
        },
        isMagical: false,
        value: { copperCoins: 0 },
        weight: 0,
        properties: [],
        toHitBonus: strengthModifier,
        range: {
            normal: 5 // Melee range
        },
        description: 'Unarmed strike',
        id: 'unarmed-strike'
    };
};

export function attackRound(attacker: Character, defenders: Character[]): string {
    if (defenders.length === 0) {
        throw new Error("No defenders to attack.");
    }

    const target = defenders[0]; // For simplicity, attack the first defender
    let attack = attacker.inventory.equipped.rightHand; // Assuming Character has an equippedWeapon property

    const attackRoll = rollDice('k20') + (attack?.toHitBonus ?? 0);
    const targetAC = target.armorClass; // Assuming Character has an armorClass property

    console.log(`${attacker.name} rolls a d20 and gets ${attackRoll} (with bonuses). Target AC is ${targetAC}.`);
    if (attackRoll >= targetAC) {
        if (!attack) {
            attack = createDummyWeaponForBareHandAttack(attacker.modifiers.strength);
        }

        const damageRoll = rollDice(attack?.damage.dice ?? 'k4');
        target.hp.current -= damageRoll; // Assuming Character has hitPoints property
        return `${attacker.name} hits ${target.name} for ${damageRoll} ${attack?.damage.type} damage.`;
    } else {
        return `${attacker.name} misses ${target.name}.`;
    }
}
