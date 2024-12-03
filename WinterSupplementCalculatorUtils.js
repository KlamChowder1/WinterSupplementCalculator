"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWinterSupplement = calculateWinterSupplement;
function isValidWinterSupplementInput(input) {
    return (typeof input.id === 'string' &&
        typeof input.numberOfChildren === 'number' &&
        input.numberOfChildren >= 0 &&
        (input.familyComposition === 'single' ||
            input.familyComposition === 'couple') &&
        typeof input.familyUnitInPayForDecember === 'boolean');
}
function calculateWinterSupplement(input) {
    var id = input.id, numberOfChildren = input.numberOfChildren, familyComposition = input.familyComposition, familyUnitInPayForDecember = input.familyUnitInPayForDecember;
    if (!isValidWinterSupplementInput(input)) {
        throw new Error('Invalid WinterSupplementInput format');
    }
    var isEligible = familyUnitInPayForDecember;
    if (!isEligible) {
        return {
            id: id,
            isEligible: isEligible,
            baseAmount: 0,
            childrenAmount: 0,
            supplementAmount: 0,
        };
    }
    var baseAmount = 0;
    var childrenAmount = 0;
    if (numberOfChildren > 0) {
        baseAmount = 120;
        childrenAmount = numberOfChildren * 20;
    }
    else if (familyComposition === 'single') {
        baseAmount = 60;
    }
    else if (familyComposition === 'couple') {
        baseAmount = 120;
    }
    var supplementAmount = baseAmount + childrenAmount;
    return {
        id: id,
        isEligible: isEligible,
        baseAmount: baseAmount,
        childrenAmount: childrenAmount,
        supplementAmount: supplementAmount,
    };
}
