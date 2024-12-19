import { Stage, StageFieldName, StageFieldRoute } from "./stage";

export function findBestRoute(stage: Stage, from: StageFieldName, to: StageFieldName): StageFieldRoute[] {
    const routesMap: { [key: string]: StageFieldRoute[] } = {};
    stage.routes.forEach(route => {
        if (!routesMap[route.fromStageName]) {
            routesMap[route.fromStageName] = [];
        }
        routesMap[route.fromStageName].push(route);
    });

    const visited = new Set<StageFieldName>();
    const queue: { path: StageFieldRoute[], cost: number }[] = [{ path: [], cost: 0 }];
    let bestPath: StageFieldRoute[] = [];
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

