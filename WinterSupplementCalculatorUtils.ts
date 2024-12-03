import { WinterSupplementInput, WinterSupplementOutput } from './types';

function isValidWinterSupplementInput(
  input: any
): input is WinterSupplementInput {
  return (
    typeof input.id === 'string' &&
    typeof input.numberOfChildren === 'number' &&
    input.numberOfChildren >= 0 &&
    (input.familyComposition === 'single' ||
      input.familyComposition === 'couple') &&
    typeof input.familyUnitInPayForDecember === 'boolean'
  );
}

export function calculateWinterSupplement(
  input: WinterSupplementInput
): WinterSupplementOutput {
  const {
    id,
    numberOfChildren,
    familyComposition,
    familyUnitInPayForDecember,
  } = input;

  if (!isValidWinterSupplementInput(input)) {
    throw new Error('Invalid WinterSupplementInput format');
  }

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
