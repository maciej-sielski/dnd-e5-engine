import { Stage, StageFieldId, StageFieldRoute } from "./stage";

export function findBestRoute<T extends StageFieldId>(stage: Stage<T>, from: T, to: T): StageFieldRoute<T>[] {
    const routesMap: { [key: string]: StageFieldRoute<T>[] } = {};
    stage.routes.forEach(route => {
        if (!routesMap[route.fromStageName]) {
            routesMap[route.fromStageName] = [];
        }
        routesMap[route.fromStageName].push(route);
    });

    const visited = new Set<StageFieldId>();
    const queue: { path: StageFieldRoute<T>[], cost: number }[] = [{ path: [], cost: 0 }];
    let bestPath: StageFieldRoute<T>[] = [];
    let bestCost = Infinity;

    while (queue.length > 0) {
        const { path, cost } = queue.shift()!;
        const current = path.length > 0 ? path[path.length - 1].toStageName : from;

        if (current === to) {
            if (cost < bestCost) {
                bestCost = cost;
                bestPath = path;
            }
            continue;
        }

        if (visited.has(current)) {
            continue;
        }
        visited.add(current);

        const nextRoutes = routesMap[current] || [];
        nextRoutes.forEach(route => {
            queue.push({ path: [...path, route], cost: cost + route.moveCost });
        });
    }

    return bestPath;
}

