import { calculateWinterSupplement } from './WinterSupplementCalculatorUtils';
import { WinterSupplementInput, WinterSupplementOutput } from './types';

describe('calculateWinterSupplement', () => {
  it('should supplement amount of 60 for a single parent family with no children', () => {
    const input: WinterSupplementInput = {
      id: '0',
      numberOfChildren: 0,
      familyComposition: 'single',
      familyUnitInPayForDecember: true,
    };

    const output: WinterSupplementOutput = {
      id: '0',
      isEligible: true,
      baseAmount: 60,
      childrenAmount: 0,
      supplementAmount: 60,
    };

    expect(calculateWinterSupplement(input)).toEqual(output);
  });
});
