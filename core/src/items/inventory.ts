import { Armor, Cloak, Helmet, Item, Ring, Shield, Weapon, Shoes } from "./item";
import { Money } from "./money";

export interface Inventory {
    items: Item[];
    money: Money;
    equipped: Equipped;
}

export interface Equipped {
    armor?: Armor | null;
    ring1?: Ring | null;
    ring2?: Ring | null;
    rightHand?: Weapon | null;
    leftHand?: Weapon | Shield | null;
    shoes?: Shoes | null;
    helmet?: Helmet | null;
    cloak?: Cloak | null;
}
