import { NPCId } from "../npc";
import { Condition, ConditionQuest, ConditionItem, ConditionStage, ConditionStageField, ConditionNpc } from "../quests";
import { Game } from "./game";

export function evaluateConditions(game: Game, npcIdContext: NPCId | null, conditions: Condition[] | undefined): boolean {
    if (!conditions?.length) {
        return true;
    }

    return conditions.every(condition => {
        switch (condition.type) {
            case 'quest':
                return evaluateQuestCondition(game, condition);
            case 'item':
                return evaluateItemCondition(game, condition);
            case "npc":
                return evaluateNpcCondition(game, npcIdContext, condition);
            case "stage":
                return evaluateStageCondition(game, condition);
            case "stage-field":
                return evaluateStageFieldCondition(game, condition);
            default:
                throw new Error(`Unknown condition type: ${condition['type']}`);
        }
    });
}

function evaluateQuestCondition(game: Game, condition: ConditionQuest): boolean {
    const questEntry = game.journal.entries.find(entry => entry.id === condition.questId);
    if (!questEntry) {
        return false;
    }

    const requiredStageId = questEntry.history[questEntry.history.length - 1].id;

    return (condition.minStageId === undefined || requiredStageId >= condition.minStageId)
        && (condition.maxStageId === undefined || requiredStageId <= condition.maxStageId);
}

function evaluateItemCondition(game: Game, condition: ConditionItem): boolean {
    return condition.itemIds.every(itemId => game.player.inventory.items.some(i => i.id === itemId));
}

function evaluateStageCondition(game: Game, condition: ConditionStage): boolean {
    return condition.stageIds.includes(game.currentStage);
}

function evaluateStageFieldCondition(game: Game, condition: ConditionStageField): boolean {
    return condition.stageFields.includes(game.currentStageField);
}

function evaluateNpcCondition(_game: Game, npcIdContext: NPCId | null, condition: ConditionNpc): boolean {
    return !!npcIdContext && condition.npcIds.includes(npcIdContext);
}
