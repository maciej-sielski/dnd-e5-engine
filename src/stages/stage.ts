import { EventCard } from "../events";

export type StageFieldName = string;

export interface Stage<T extends StageFieldName> {
    fields: StageField<T>[];
    routes: StageFieldRoute<T>[];
}

export interface StageField<T extends StageFieldName> {
    name: T;
    cardProbability?: number;
    currentCards?: EventCard[];
}

export interface StageFieldRoute<T extends StageFieldName> {
    fromStageName: T;
    toStageName: T;
    moveCost: number;
}

