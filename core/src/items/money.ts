const silverGoldConversion = 10;
const copperSilverConversion = 10;

export interface Money {
    goldCoins?: number;
    silverCoins?: number;
    copperCoins?: number;
}

export function validateMoney(money: Money): boolean {
    const { goldCoins, silverCoins, copperCoins } = money;

    if (
        (goldCoins === undefined || (Number.isFinite(goldCoins) && goldCoins >= 0)) &&
        (silverCoins === undefined || (Number.isFinite(silverCoins) && silverCoins >= 0)) &&
        (copperCoins === undefined || (Number.isFinite(copperCoins) && copperCoins >= 0))
    ) {
        return !!goldCoins || !!silverCoins || !!copperCoins;
    }

    return false;
}

export function hasEnoughMoneyInBudget(budget: Money, delta: Money): boolean {
    return compareMoney(budget, delta) !== -1;
}

export function compareMoney(a: Money, b: Money): -1 | 0 | 1 {
    const totalCopperA = (a.goldCoins || 0) * silverGoldConversion * copperSilverConversion +
        (a.silverCoins || 0) * copperSilverConversion +
        (a.copperCoins || 0);

    const totalCopperB = (b.goldCoins || 0) * silverGoldConversion * copperSilverConversion +
        (b.silverCoins || 0) * copperSilverConversion +
        (b.copperCoins || 0);

    if (totalCopperA > totalCopperB) {
        return 1;
    } else if (totalCopperA < totalCopperB) {
        return -1;
    } else {
        return 0;
    }
}

export function updateBudget(budget: Money, delta: Money, isAddition: boolean): Money {
    if (!isAddition && !hasEnoughMoneyInBudget(budget, delta)) {
        throw new Error('Cannot subtract more money than is available');
    }

    const totalCopperBudget = (budget.goldCoins || 0) * silverGoldConversion * copperSilverConversion +
        (budget.silverCoins || 0) * copperSilverConversion +
        (budget.copperCoins || 0);

    const totalCopperDelta = (delta.goldCoins || 0) * silverGoldConversion * copperSilverConversion +
        (delta.silverCoins || 0) * copperSilverConversion +
        (delta.copperCoins || 0);

    const newTotalCopper = isAddition ? totalCopperBudget + totalCopperDelta : totalCopperBudget - totalCopperDelta;

    const newGoldCoins = Math.floor(newTotalCopper / (silverGoldConversion * copperSilverConversion));
    const remainingCopperAfterGold = newTotalCopper % (silverGoldConversion * copperSilverConversion);

    const newSilverCoins = Math.floor(remainingCopperAfterGold / copperSilverConversion);
    const newCopperCoins = remainingCopperAfterGold % copperSilverConversion;

    return {
        goldCoins: newGoldCoins,
        silverCoins: newSilverCoins,
        copperCoins: newCopperCoins
    };
}
