import { StageFieldName, Stage } from "./stage";

export function analyzeStage<T extends StageFieldName>(stage: Stage<T>): { noOutgoingRoutes: T[]; noIngoingRoutes: T[]; oneWayRoutes: [T, T][]; } {
    const fieldNames = new Set(stage.fields.map(field => field.name));
    const outgoingRoutes = new Map<T, Set<T>>();
    const ingoingRoutes = new Map<T, Set<T>>();
    const oneWayRoutes: [T, T][] = [];

    stage.routes.forEach(route => {
        if (!outgoingRoutes.has(route.fromStageName)) {
            outgoingRoutes.set(route.fromStageName, new Set());
        }
        if (!ingoingRoutes.has(route.toStageName)) {
            ingoingRoutes.set(route.toStageName, new Set());
        }
        outgoingRoutes.get(route.fromStageName)!.add(route.toStageName);
        ingoingRoutes.get(route.toStageName)!.add(route.fromStageName);
    });

    const noOutgoingRoutes = Array.from(fieldNames).filter(name => !outgoingRoutes.has(name));
    const noIngoingRoutes = Array.from(fieldNames).filter(name => !ingoingRoutes.has(name));

    fieldNames.forEach(from => {
        outgoingRoutes.get(from)?.forEach(to => {
            if (!outgoingRoutes.get(to)?.has(from)) {
                oneWayRoutes.push([from, to]);
            }
        });
    });

    return {
        noOutgoingRoutes,
        noIngoingRoutes,
        oneWayRoutes: oneWayRoutes.filter(([from, to]) => !noOutgoingRoutes.includes(from) && !noOutgoingRoutes.includes(to))
    };
}
