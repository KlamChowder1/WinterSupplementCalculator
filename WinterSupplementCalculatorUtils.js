"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWinterSupplement = calculateWinterSupplement;
function calculateWinterSupplement(input) {
    // console.log('input', input);
    var id = input.id, numberOfChildren = input.numberOfChildren, familyComposition = input.familyComposition, familyUnitInPayForDecember = input.familyUnitInPayForDecember;
    // console.log(
    //   id,
    //   numberOfChildren,
    //   familyComposition,
    //   familyUnitInPayForDecember
    // );
    // familyUnitInPayForDecember determines isEligible
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
