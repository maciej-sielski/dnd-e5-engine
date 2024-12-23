import { checkRandom } from "../utils";
import { findBestRoute } from "./find-best-route";
import { Stage, StageFieldName, StageFieldRoute } from "./stage";

export interface MoveToStageFieldResult<T extends StageFieldName> {
    reachedFieldName: T;
    moveCost: number;
    availableMovePoints: number;
    shouldRaiseCardEvent: boolean;
}

export function moveToStageField<T extends StageFieldName>(stage: Stage<T>, sourceFieldName: T, targetFieldName: T, availableMovePoints: number): MoveToStageFieldResult<T> {
    const route = findBestRoute(stage, sourceFieldName, targetFieldName);

    let nextField = route.shift();
    let currentField: StageFieldRoute<T> | undefined;
    let moveCost = 0;
    let shouldRaiseCardEvent = false;
    availableMovePoints = Math.max(availableMovePoints, 0);

    while (!!nextField && availableMovePoints >= nextField.moveCost) {
        currentField = nextField;
        nextField = route.shift();

        availableMovePoints -= currentField.moveCost;
        moveCost += currentField.moveCost;

        shouldRaiseCardEvent = checkRandom(stage.fields.find(field => field.name === currentField!.toStageName)?.cardProbability || 0);
        if (shouldRaiseCardEvent) {
            break;
        }
    }

    return {
        reachedFieldName: currentField ? currentField.toStageName : sourceFieldName,
        moveCost,
        availableMovePoints,
        shouldRaiseCardEvent
    };
}
