import { getDialoguesForNPC } from "./get-dialogues-for-npc";
import { Game } from "./game";
import { NPCId } from "../npc";
import { DialogueTopic, QuestId, QuestStageId } from "../quests";
import { stage1 } from "../stages";

describe('getDialoguesForNPC', () => {
    const npcId: NPCId = 'npc_001';
    const stageId = stage1.id;
    const stageFieldId = stage1.fields[0].id;
    const stageFieldNegativeId = stage1.fields[1].id;
    const questId: QuestId = '1';
    const questStageId: QuestStageId = 2;

    const dialoguesExpected: DialogueTopic[] = [
        {
            topic: 'Greetings',
            response: 'Hello, traveler!',
        },
        {
            topic: 'Quest',
            response: 'I have a task for you.',
            conditions: [{ type: 'quest', questId, minStageId: questStageId, maxStageId: questStageId }],
        },
        {
            topic: 'NPC',
            response: 'Safe travels!',
            conditions: [{ type: 'npc', npcIds: [npcId] }],
        },
        {
            topic: 'Stage',
            response: 'How is the quest going?',
            conditions: [{ type: 'stage', stageIds: [stageId] }],
        },
        {
            topic: 'Stage field',
            response: 'Thank you for completing the quest!',
            conditions: [{ type: 'stage-field', stageFields: [stageFieldId] }],
        },
    ];

    const dialoguesNotExpected: DialogueTopic[] = [
        {
            topic: 'Quest Negative',
            response: 'I have a task for you.',
            conditions: [{ type: 'quest', questId, minStageId: questStageId + 2 }],
        },
        {
            topic: 'Quest Negative 2',
            response: 'I have a task for you.',
            conditions: [{ type: 'quest', questId, maxStageId: questStageId - 2 }],
        },
        {
            topic: 'NPC Negative',
            response: 'Safe travels!',
            conditions: [{ type: 'npc', npcIds: [npcId + 'aa'] }],
        },
        {
            topic: 'Stage Negative',
            response: 'How is the quest going?',
            conditions: [{ type: 'stage', stageIds: [stageId + 'aa'] }],
        },
        {
            topic: 'Stage field Negative',
            response: 'Thank you for completing the quest!',
            conditions: [{ type: 'stage-field', stageFields: [stageFieldNegativeId] }],
        },
    ];

    const game: Game = {
        allDialogues: dialoguesExpected.concat(dialoguesNotExpected),
        currentStage: stageId,
        currentStageField: stageFieldId,
        allNpcs: [{ npcId, name: 'Test NPC' } as any],
        allQuests: [{ id: questId, priority: 'hidden-quest', stages: [{ id: questStageId, journalEntry: '' }] }],
        allStages: [stage1],
        journal: { entries: [{ id: questId, isFinished: false, history: [{ id: questStageId, journalEntry: '' }] }] },
        player: null as any,
    };

    it('should return proper dialogues', () => {
        const result = getDialoguesForNPC(game, npcId);

        expect(result).toEqual(dialoguesExpected);
    });
});
