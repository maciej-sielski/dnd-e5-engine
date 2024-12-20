import { findBestRoute } from './find-best-route';
import { Stage } from './stage';

describe('find-best-route', () => {
    type StageTestName = 'A' | 'B' | 'C' | 'D';
    const testStage: Stage<StageTestName> = {
        fields: [
            { name: 'A', cardProbability: 0.1 },
            { name: 'B', cardProbability: 0.2 },
            { name: 'C', cardProbability: 0.3 },
            { name: 'D', cardProbability: 0.4 },
        ],
        routes: [
            { fromStageName: 'A', toStageName: 'B', moveCost: 5 },
            { fromStageName: 'B', toStageName: 'C', moveCost: 2 },
            { fromStageName: 'A', toStageName: 'C', moveCost: 3 },
            { fromStageName: 'C', toStageName: 'D', moveCost: 4 },

            { fromStageName: 'D', toStageName: 'B', moveCost: 2 },
            { fromStageName: 'B', toStageName: 'A', moveCost: 2 },
            { fromStageName: 'D', toStageName: 'C', moveCost: 2 },
            { fromStageName: 'C', toStageName: 'A', moveCost: 2 },
        ]
    };

    test('should find the effective path', () => {
        const bestRoute = findBestRoute(testStage, 'A', 'D');
        expect(bestRoute).toEqual([testStage.routes[2], testStage.routes[3]]);
    });

    test('should find the effective path (1 of 2)', () => {
        const bestRoute = findBestRoute(testStage, 'D', 'A');
        expect(bestRoute).toEqual([testStage.routes[4], testStage.routes[5]]);
    });

    test('should return empty array when route not found', () => {
        const bestRoute = findBestRoute(testStage, 'D', 'F');
        expect(bestRoute).toEqual([]);
    });
});
