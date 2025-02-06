import { calculateRandom } from "./calculate-random";

export function checkRandom(requiredLimit: number): boolean {
    return calculateRandom() >= requiredLimit;
}
