import { moveToStageField } from "./move-to-stage-field";
import { stage1 } from "./stage1";

jest.mock('../utils', () => ({
    checkRandom: () => false
}));

describe('moveToStageField - with no random cards', () => {

    test('should return correct result when route is found', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-tavern', 5);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-tavern',
            moveCost: 2,
            availableMovePoints: 3,
            shouldRaiseCardEvent: false
        });
    });

    test('should return source field name when no route is found', () => {
        const actualResult = moveToStageField(stage1, 'blacksmith', 'before-tavern', 5);
        expect(actualResult).toEqual({
            reachedFieldName: 'blacksmith',
            moveCost: 0,
            availableMovePoints: 5,
            shouldRaiseCardEvent: false
        });
    });

    test('should return correct result when move points are exactly enough', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-tavern', 2);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-tavern',
            moveCost: 2,
            availableMovePoints: 0,
            shouldRaiseCardEvent: false
        });
    });

    test('should return correct result when move points are not enough', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-tavern', 1);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-warriors-lodge',
            moveCost: 1,
            availableMovePoints: 0,
            shouldRaiseCardEvent: false
        });
    });

    test('should handle single step route', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-warriors-lodge', 1);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-warriors-lodge',
            moveCost: 1,
            availableMovePoints: 0,
            shouldRaiseCardEvent: false
        });
    });

    test('should handle multiple steps route', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-tavern', 2);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-tavern',
            moveCost: 2,
            availableMovePoints: 0,
            shouldRaiseCardEvent: false
        });
    });

    test('should handle zero move points', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-tavern', 0);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-blacksmith',
            moveCost: 0,
            availableMovePoints: 0,
            shouldRaiseCardEvent: false
        });
    });

    test('should handle negative move points', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-tavern', -1);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-blacksmith',
            moveCost: 0,
            availableMovePoints: 0,
            shouldRaiseCardEvent: false
        });
    });

    test('should handle large move points', () => {
        const actualResult = moveToStageField(stage1, 'before-blacksmith', 'before-tavern', 987);
        expect(actualResult).toEqual({
            reachedFieldName: 'before-tavern',
            moveCost: 2,
            availableMovePoints: 985,
            shouldRaiseCardEvent: false
        });
    });
});

jest.clearAllMocks();
