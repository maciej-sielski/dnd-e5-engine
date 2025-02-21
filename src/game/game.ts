import { Character, NPC } from "../npc";
import { QuestJournal, Quest, DialogueTopic } from "../quests";
import { StageId, StageFieldId, Stage } from "../stages";

export interface Game {
    currentStage: StageId;
    currentStageField: StageFieldId;
    journal: QuestJournal;
    player: Character;

    definition: GameDefinition;
}

export interface GameDefinition {
    allStages: Stage<StageFieldId>[];
    allQuests: Quest[];
    allDialogues: DialogueTopic[];
    allNpcs: NPC[];   
}
