import { EventCard } from "../events";

export type StageFieldName = string;

export interface Stage {
    fields: StageField[];
    routes: StageFieldRoute[];
}

export interface StageField {
    name: StageFieldName;
    cardProbability: number;
    currentCards?: EventCard[];
}

export interface StageFieldRoute {
    fromStageName: StageFieldName;
    toStageName: StageFieldName;
    moveCost: number;
}
