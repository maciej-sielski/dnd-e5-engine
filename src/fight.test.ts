import { attackRound } from "./fight";
import { Character } from "./npc";
import { rollDice } from "@ms-sol/dice-roll";

jest.mock("@ms-sol/dice-roll", () => ({
    rollDice: jest.fn()
}));

const mockRollDice = rollDice as jest.Mock;

describe('attackRound', () => {

    let attacker: Character;
    let defender: Character;

    beforeEach(() => {
        mockRollDice.mockReset();
        attacker = createAttacker();
        defender = createDefender();
    });

    function createAttacker(): Character {
        return {
            name: "Attacker",
            race: "human",
            class: "fighter",
            level: 1,
            hp: { current: 10, max: 10 },
            attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
            skills: [],
            inventory: {
                items: [],
                money: { copperCoins: 0 },
                equipped: {
                    rightHand: {
                        weaponType: 'melee',
                        damage: { dice: '1d6', type: 'slashing' },
                        isMagical: false,
                        value: { copperCoins: 0 },
                        weight: 0,
                        properties: [],
                        toHitBonus: 2,
                        range: { normal: 5 },
                        description: 'Sword',
                        id: 'sword_001'
                    }
                }
            },
            armorClass: 10,
            modifiers: { strength: 2, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 }
        };
    }

    function createDefender(): Character {
        return {
            name: "Defender",
            race: "orc",
            class: "warlock",
            level: 1,
            hp: { current: 10, max: 10 },
            attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
            skills: [],
            inventory: {
                items: [],
                money: { copperCoins: 0 },
                equipped: {}
            },
            armorClass: 10,
            modifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 }
        };
    }

    it('should hit with melee weapon', () => {
        mockRollDice.mockReturnValueOnce(15).mockReturnValueOnce(4); // Attack roll, Damage roll

        const result = attackRound(attacker, [defender]);

        expect(result).toBe("Attacker hits Defender for 4 slashing damage.");
        expect(defender.hp.current).toBe(6);
    });

    it('should miss with melee weapon', () => {
        mockRollDice.mockReturnValueOnce(1); // Attack roll

        const result = attackRound(attacker, [defender]);

        expect(result).toBe("Attacker misses Defender.");
        expect(defender.hp.current).toBe(10);
    });

    it('should hit with bare hands', () => {
        attacker.inventory.equipped.rightHand = undefined;
        mockRollDice.mockReturnValueOnce(15).mockReturnValueOnce(3); // Attack roll, Damage roll

        const result = attackRound(attacker, [defender]);

        expect(result).toBe("Attacker hits Defender for 3 bludgeoning damage.");
        expect(defender.hp.current).toBe(7);
    });

    it('should miss with bare hands', () => {
        attacker.inventory.equipped.rightHand = undefined;
        mockRollDice.mockReturnValueOnce(5); // Attack roll

        const result = attackRound(attacker, [defender]);

        expect(result).toBe("Attacker misses Defender.");
        expect(defender.hp.current).toBe(10);
    });
});
