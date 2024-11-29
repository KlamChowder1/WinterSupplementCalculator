export interface WinterSupplementInput {
  id: string;
  numberOfChildren: number;
  familyComposition: 'single' | 'couple';
  familyUnitInPayForDecember: boolean;
}

export interface WinterSupplementOutput {
  id: string;
  isEligible: boolean;
  baseAmount: number;
  childrenAmount: number;
  supplementAmount: number;
}

export function calculateWinterSupplement(
  input: WinterSupplementInput
): WinterSupplementOutput {
  console.log('input', input);
  const {
    id,
    numberOfChildren,
    familyComposition,
    familyUnitInPayForDecember,
  } = input;

  console.log(
    id,
    numberOfChildren,
    familyComposition,
    familyUnitInPayForDecember
  );
  // familyUnitInPayForDecember determines isEligible
  const isEligible = familyUnitInPayForDecember;

  if (!isEligible) {
    return {
      id,
      isEligible,
      baseAmount: 0,
      childrenAmount: 0,
      supplementAmount: 0,
    };
  }

  let baseAmount = 0;
  let childrenAmount = 0;

  if (numberOfChildren > 0) {
    baseAmount = 120;
    childrenAmount = numberOfChildren * 20;
  } else if (familyComposition === 'single') {
    baseAmount = 60;
  } else if (familyComposition === 'couple') {
    baseAmount = 120;
  }

  const supplementAmount = baseAmount + childrenAmount;

  return {
    id,
    isEligible,
    baseAmount,
    childrenAmount,
    supplementAmount,
  };
}
