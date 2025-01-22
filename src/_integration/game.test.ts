import { setQuestProgress, getDialoguesForNPC, Game, pickUpItem } from "../game";
import { Item, ItemId } from "../items";
import { NPC } from "../npc";
import { DialogueTopic, Quest } from "../quests";
import { stage1 } from "../stages";

const swordItemId: ItemId = 'sword_001';

const sampleQuest: Quest = {
    id: 'quest_001',
    stages: [
        {
            id: 1,
            journalEntry: 'Find the sword.',
        },
        {
            id: 2,
            journalEntry: 'Found the sword. Give it to NPC.',
            conditions: [
                {
                    type: 'item',
                    itemIds: [swordItemId],
                },
            ],
        },
        {
            id: 3,
            journalEntry: 'Gave the sword to the NPC.',
            isFinished: true
        },
    ],
    priority: 'main-quest',
    award: {
        xp: 100,
        money: {
            goldCoins: 100
        }
    }
};

const itemSword: Item = {
    id: swordItemId,
    description: "",
    weight: 0,
    isMagical: false,
    value: {
        copperCoins: 0
    },
    questProgress: {
        questId: sampleQuest.id,
        stageId: sampleQuest.stages[1].id,
    }
};

const sampleNPC: NPC = {
    npcId: 'npc_001',
    name: "Fili Testinson",
    race: "dwarf",
    class: "barbarian",
    level: 1,
    hp: {
        current: 10,
        max: 20
    },
    attributes: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    },
    skills: [],
    inventory: {
        items: [],
        money: {
            copperCoins: 10
        },
        equipped: {
        }
    },
    armorClass: 10,
    modifiers: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    }
};

const sampleDialogues: DialogueTopic[] = [
    {
        topic: 'Quest initializer',
        conditions: [
            { type: 'stage', stageIds: [stage1.id] },
        ],
        response: 'Start new quest.',
        questProgress: {
            questId: sampleQuest.id,
            stageId: sampleQuest.stages[0].id,
        }
    },
    {
        topic: 'Quest details',
        conditions: [
            { type: 'quest', questId: sampleQuest.id, maxStageId: 1 },
        ],
        response: 'Please find the sword.',
    },
    {
        topic: 'Finish Quest',
        response: 'Thank you for giving me the sword.',
        conditions: [
            { type: 'quest', questId: sampleQuest.id, minStageId: 2 },
            { type: 'npc', npcIds: [sampleNPC.npcId] },
        ],
        questProgress: {
            questId: sampleQuest.id,
            stageId: sampleQuest.stages[0].id,
        }
    },
];

const game: Game = {
    journal: {
        entries: []
    },
    player: {
        name: "Balin Testinson",
        race: "dwarf",
        class: "barbarian",
        level: 1,
        hp: {
            current: 10,
            max: 20
        },
        attributes: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        },
        skills: [],
        inventory: {
            items: [],
            money: {
                copperCoins: 10
            },
            equipped: {
            }
        },
        armorClass: 10,
        modifiers: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    },
    currentStage: stage1.id,
    currentStageField: stage1.fields[0].id,
    allStages: [stage1],
    allDialogues: sampleDialogues,
    allQuests: [sampleQuest],
    allNpcs: [sampleNPC],
};

describe('Game logic should work', () => {
    it('should return the correct dialogue topics', () => {
        // initial - nothing
        expect(game.journal.entries).toHaveLength(0);

        // ask for gossip -> initialize quest
        const topics = getDialoguesForNPC(game, sampleNPC.npcId);
        expect(topics).toEqual([sampleDialogues[0]]);

        // first stage
        setQuestProgress(game, sampleQuest.id, sampleQuest.stages[0].id);
        expect(game.journal.entries).toEqual([
            {
                id: sampleQuest.id,
                history: [sampleQuest.stages[0]],
                isFinished: false
            },
        ]);

        // second stage
        pickUpItem(game, itemSword);
        expect(game.journal.entries).toEqual([
            {
                id: sampleQuest.id,
                history: [sampleQuest.stages[0], sampleQuest.stages[1]],
                isFinished: false
            },
        ]);

        // third stage
        setQuestProgress(game, sampleQuest.id, sampleQuest.stages[2].id);
        expect(game.journal.entries).toEqual([
            {
                id: sampleQuest.id,
                history: [sampleQuest.stages[0], sampleQuest.stages[1], sampleQuest.stages[2]],
                isFinished: true
            },
        ]);
    });
});
