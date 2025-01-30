import { NPCId } from "../npc";
import { DialogueTopic } from "../quests";
import { evaluateConditions } from "./evaluate-conditions";
import { Game } from "./game";

export function getDialoguesForNPC(game: Game, npcId: NPCId): DialogueTopic[] {
    return game.definition.allDialogues.filter(dialogue => evaluateConditions(game, npcId, dialogue.conditions));
}
