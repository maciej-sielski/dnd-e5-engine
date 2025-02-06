import { ItemId, Money } from "../items";
import { NPCId } from "../npc";
import { StageFieldId, StageId } from "../stages";

export type QuestId = string;
export type QuestStageId = number;
export type QuestPriority = 'hidden-quest' | 'side-quest' | 'main-quest';

export interface QuestStage {
    id: QuestStageId;
    isFinished?: boolean;
    journalEntry: string;
    conditions?: Condition[];
}

export interface Quest {
    id: QuestId;
    stages: QuestStage[];
    priority: QuestPriority;
    award?: Award;
}

export interface Award {
    money?: Money;
    xp?: number;
}

export interface QuestJournal {
    entries: QuestJournalEntry[];
}

export interface QuestJournalEntry {
    id: QuestId;
    history: QuestStage[];
    isFinished: boolean;
}

export interface QuestProgress {
    questId: QuestId,
    stageId: QuestStageId
}

export interface ConditionQuest {
    type: 'quest';
    questId: QuestId;
    minStageId?: QuestStageId;
    maxStageId?: QuestStageId;
}

export interface ConditionItem {
    type: 'item';
    itemIds: ItemId[];
}

export interface ConditionNpc {
    type: 'npc';
    npcIds: NPCId[];
}

export interface ConditionStage {
    type: 'stage';
    stageIds: StageId[];
}

export interface ConditionStageField {
    type: 'stage-field';
    stageFields: StageFieldId[];
}

export type Condition = ConditionQuest | ConditionItem | ConditionNpc | ConditionStage | ConditionStageField;

export interface DialogueTopic {
    topic: string;
    response: string;
    conditions?: Condition[];
    questProgress?: QuestProgress
}
