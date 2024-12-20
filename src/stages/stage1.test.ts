import { analyzeStage } from './stage';
import { stage1 } from './stage1';

describe('stage1', () => {
    test('should be valid', () => {
        const { noOutgoingRoutes, noIngoingRoutes, oneWayRoutes } = analyzeStage(stage1);
        expect(noOutgoingRoutes).toEqual(['blacksmith', 'tavern', 'warriors-lodge', 'chiefs-house', 'mages-lodge', 'alchemists-house', 'house-of-a', 'temple', 'tower', 'gate']);
        expect(noIngoingRoutes).toEqual([]);
        expect(oneWayRoutes).toEqual([]);
    });
});
