import { Stage } from "./stage";

export type Stage1FieldName = 'blacksmith' | 'before-blacksmith' | 'tavern' | 'warriors-lodge' | 'before-warriors-lodge'
    | 'before-tavern' | 'above-monument-and-before-mages-lodge' | 'monument' | 'below-monument-and-before-chief' | 'chiefs-house' | 'mages-lodge' 
    | 'before-alchemist' | 'right-of-monument' | 'alchemists-house' | 'before-house-of-a' | 'house-of-a' | 'alley-behind-alchemist' | 'temple' 
    | 'before-temple' | 'before-tower' | 'tower' | 'before-gate' | 'gate';

export const stage1: Stage<Stage1FieldName> = {
    id: 'stage1',
    fields: [
        { id: 'blacksmith' },
        { id: 'before-blacksmith' },
        { id: 'tavern' },

        { id: 'warriors-lodge' },
        { id: 'before-warriors-lodge' },
        { id: 'before-tavern' },

        { id: 'above-monument-and-before-mages-lodge' },
        { id: 'monument' },
        { id: 'below-monument-and-before-chief' },
        { id: 'chiefs-house' },

        { id: 'mages-lodge' },
        { id: 'before-alchemist' },
        { id: 'right-of-monument' },
        { id: 'chiefs-house' },

        { id: 'alchemists-house' },
        { id: 'before-house-of-a' },
        { id: 'house-of-a' },

        { id: 'alley-behind-alchemist' },

        { id: 'temple' },
        { id: 'before-temple' },
        { id: 'before-tower' },
        { id: 'tower' },

        { id: 'before-gate' },
        { id: 'gate' },
    ],
    routes: [
        // Column 1
        { fromStageName: 'before-blacksmith', toStageName: 'blacksmith', moveCost: 1 },
        { fromStageName: 'before-blacksmith', toStageName: 'before-warriors-lodge', moveCost: 1 },

        // Column 2
        { fromStageName: 'before-warriors-lodge', toStageName: 'warriors-lodge', moveCost: 1 },
        { fromStageName: 'before-warriors-lodge', toStageName: 'above-monument-and-before-mages-lodge', moveCost: 1 },
        { fromStageName: 'before-warriors-lodge', toStageName: 'monument', moveCost: 0.5 },
        { fromStageName: 'before-warriors-lodge', toStageName: 'below-monument-and-before-chief', moveCost: 1 },
        { fromStageName: 'before-warriors-lodge', toStageName: 'before-tavern', moveCost: 1 },
        { fromStageName: 'before-warriors-lodge', toStageName: 'before-blacksmith', moveCost: 1 },
        { fromStageName: 'before-tavern', toStageName: 'before-warriors-lodge', moveCost: 1 },
        { fromStageName: 'before-tavern', toStageName: 'monument', moveCost: 0.5 },
        { fromStageName: 'before-tavern', toStageName: 'below-monument-and-before-chief', moveCost: 1 },
        { fromStageName: 'before-tavern', toStageName: 'tavern', moveCost: 1 },

        // Column 3
        { fromStageName: 'above-monument-and-before-mages-lodge', toStageName: 'mages-lodge', moveCost: 1 },
        { fromStageName: 'above-monument-and-before-mages-lodge', toStageName: 'before-alchemist', moveCost: 1 },
        { fromStageName: 'above-monument-and-before-mages-lodge', toStageName: 'right-of-monument', moveCost: 1 },
        { fromStageName: 'above-monument-and-before-mages-lodge', toStageName: 'monument', moveCost: 0.5 },
        { fromStageName: 'above-monument-and-before-mages-lodge', toStageName: 'before-warriors-lodge', moveCost: 1 },
        { fromStageName: 'monument', toStageName: 'above-monument-and-before-mages-lodge', moveCost: 0.5 },
        { fromStageName: 'monument', toStageName: 'before-alchemist', moveCost: 0.5 },
        { fromStageName: 'monument', toStageName: 'right-of-monument', moveCost: 0.5 },
        { fromStageName: 'monument', toStageName: 'below-monument-and-before-chief', moveCost: 0.5 },
        { fromStageName: 'monument', toStageName: 'before-tavern', moveCost: 0.5 },
        { fromStageName: 'monument', toStageName: 'before-warriors-lodge', moveCost: 0.5 },
        { fromStageName: 'below-monument-and-before-chief', toStageName: 'monument', moveCost: 0.5 },
        { fromStageName: 'below-monument-and-before-chief', toStageName: 'right-of-monument', moveCost: 1 },
        { fromStageName: 'below-monument-and-before-chief', toStageName: 'chiefs-house', moveCost: 1 },
        { fromStageName: 'below-monument-and-before-chief', toStageName: 'before-tavern', moveCost: 1 },
        { fromStageName: 'below-monument-and-before-chief', toStageName: 'before-warriors-lodge', moveCost: 1 },

        // Column 4
        { fromStageName: 'before-alchemist', toStageName: 'alchemists-house', moveCost: 1 },
        { fromStageName: 'before-alchemist', toStageName: 'alley-behind-alchemist', moveCost: 1 },
        { fromStageName: 'before-alchemist', toStageName: 'before-house-of-a', moveCost: 1 },
        { fromStageName: 'before-alchemist', toStageName: 'right-of-monument', moveCost: 1 },
        { fromStageName: 'before-alchemist', toStageName: 'monument', moveCost: 0.5 },
        { fromStageName: 'before-alchemist', toStageName: 'above-monument-and-before-mages-lodge', moveCost: 1 },
        { fromStageName: 'right-of-monument', toStageName: 'before-alchemist', moveCost: 1 },
        { fromStageName: 'right-of-monument', toStageName: 'before-house-of-a', moveCost: 1 },
        { fromStageName: 'right-of-monument', toStageName: 'below-monument-and-before-chief', moveCost: 1 },
        { fromStageName: 'right-of-monument', toStageName: 'monument', moveCost: 0.5 },
        { fromStageName: 'right-of-monument', toStageName: 'above-monument-and-before-mages-lodge', moveCost: 1 },

        // Column 5
        { fromStageName: 'before-house-of-a', toStageName: 'before-alchemist', moveCost: 1 },
        { fromStageName: 'before-house-of-a', toStageName: 'alley-behind-alchemist', moveCost: 1 },
        { fromStageName: 'before-house-of-a', toStageName: 'before-temple', moveCost: 1 },
        { fromStageName: 'before-house-of-a', toStageName: 'before-tower', moveCost: 1 },
        { fromStageName: 'before-house-of-a', toStageName: 'house-of-a', moveCost: 1 },
        { fromStageName: 'before-house-of-a', toStageName: 'right-of-monument', moveCost: 1 },
        { fromStageName: 'alley-behind-alchemist', toStageName: 'before-temple', moveCost: 0.7 },
        { fromStageName: 'alley-behind-alchemist', toStageName: 'before-tower', moveCost: 1 },
        { fromStageName: 'alley-behind-alchemist', toStageName: 'before-house-of-a', moveCost: 1 },
        { fromStageName: 'alley-behind-alchemist', toStageName: 'before-alchemist', moveCost: 0.7 },

        // Column 6
        { fromStageName: 'before-temple', toStageName: 'temple', moveCost: 1 },
        { fromStageName: 'before-temple', toStageName: 'before-gate', moveCost: 1 },
        { fromStageName: 'before-temple', toStageName: 'before-tower', moveCost: 1 },
        { fromStageName: 'before-temple', toStageName: 'before-house-of-a', moveCost: 1 },
        { fromStageName: 'before-temple', toStageName: 'alley-behind-alchemist', moveCost: 0.7 },

        { fromStageName: 'before-tower', toStageName: 'before-temple', moveCost: 1 },
        { fromStageName: 'before-tower', toStageName: 'before-gate', moveCost: 1 },
        { fromStageName: 'before-tower', toStageName: 'tower', moveCost: 1 },
        { fromStageName: 'before-tower', toStageName: 'before-house-of-a', moveCost: 1 },
        { fromStageName: 'before-tower', toStageName: 'alley-behind-alchemist', moveCost: 1 },

        // Column 7
        { fromStageName: 'before-gate', toStageName: 'gate', moveCost: 1 },
        { fromStageName: 'before-gate', toStageName: 'before-temple', moveCost: 1 },
        { fromStageName: 'before-gate', toStageName: 'before-tower', moveCost: 1 },
    ],
};
