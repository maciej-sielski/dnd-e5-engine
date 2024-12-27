import { Item } from "./item";
import { Money } from "./money";

export interface Inventory {
    items: Item[];
    money: Money;
}
