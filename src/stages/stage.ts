import { EventCard } from "../events";

export type StageId = string;
export type StageFieldId = string;

export interface Stage<T extends StageFieldId> {
    id: StageId;
    fields: StageField<T>[];
    routes: StageFieldRoute<T>[];
}

export interface StageField<T extends StageFieldId> {
    id: T;
    cardProbability?: number;
    currentCards?: EventCard[];
}

export interface StageFieldRoute<T extends StageFieldId> {
    fromStageName: T;
    toStageName: T;
    moveCost: number;
}

