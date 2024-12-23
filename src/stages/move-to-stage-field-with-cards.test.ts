import { moveToStageField } from "./move-to-stage-field";
import { stage1 } from "./stage1";

jest.mock('../utils', () => ({
    checkRandom: () => true
}));

describe('moveToStageField - with random cards', () => {

    test('should break route because of random card event', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-tavern', 5);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-warriors-lodge',
            moveCost: 1,
            availableMovePoints: 4,
            shouldRaiseCardEvent: true
        });
    });
});

jest.clearAllMocks();
