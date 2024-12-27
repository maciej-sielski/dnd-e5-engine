import { Item } from "../items";
import { Game } from "./game";
import { setQuestProgress } from "./set-quest-progress";


export function pickUpItem(game: Game, itemSword: Item): void {
    game.player.inventory.items.push(itemSword);

    if (itemSword.questProgress) {
        setQuestProgress(game, itemSword.questProgress.questId, itemSword.questProgress.stageId);
    }
}
