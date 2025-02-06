import { QuestId, QuestStageId } from "../quests";
import { Game } from "./game";


export function setQuestProgress(game: Game, questId: QuestId, questStageId: QuestStageId): void {
    const questDefinition = game.definition.allQuests.find(quest => quest.id === questId);
    if (!questDefinition) {
        throw new Error(`Quest with id ${questId} not found`);
    }

    const questStageDefinition = questDefinition.stages.find(stage => stage.id === questStageId);
    if (!questStageDefinition) {
        throw new Error(`Quest with id ${questId} does not have stage ${questStageId}`);
    }

    const existingQuest = game.journal.entries.find(entry => entry.id === questId);

    if (existingQuest) {
        // only add history item if it's not already there
        if (existingQuest.history.every(stage => stage.id !== questStageId)) {
            existingQuest.history.push(questStageDefinition);
            existingQuest.isFinished = !!questStageDefinition.isFinished;
        }
    } else {
        game.journal.entries.push({
            id: questId,
            history: [questStageDefinition],
            isFinished: !!questStageDefinition.isFinished
        });
    }
}
