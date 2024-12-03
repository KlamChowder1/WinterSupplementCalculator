import { calculateWinterSupplement } from './WinterSupplementCalculatorUtils';
import { WinterSupplementInput, WinterSupplementOutput } from './types';

describe('calculateWinterSupplement', () => {
  it('should return base amount of 0, children amount of 0, and supplement amount of 0 when familyUnitInPayForDecember is false', () => {
    const input: WinterSupplementInput = {
      id: '0',
      numberOfChildren: 2,
      familyComposition: 'single',
      familyUnitInPayForDecember: false,
    };

    const output: WinterSupplementOutput = {
      id: '0',
      isEligible: false,
      baseAmount: 0,
      childrenAmount: 0,
      supplementAmount: 0,
    };

    expect(calculateWinterSupplement(input)).toEqual(output);
  });

  it('should return base amount of 60, children amount of 0, and supplement amount of 60 for a single parent family with no children', () => {
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

  it('should return base amount of 120, children amount of 0, and supplement amount of 120 for a couple with no children', () => {
    const input: WinterSupplementInput = {
      id: '0',
      numberOfChildren: 0,
      familyComposition: 'couple',
      familyUnitInPayForDecember: true,
    };

    const output: WinterSupplementOutput = {
      id: '0',
      isEligible: true,
      baseAmount: 120,
      childrenAmount: 0,
      supplementAmount: 120,
    };

    expect(calculateWinterSupplement(input)).toEqual(output);
  });

  it('should return base amount of 120, children amount of 40, and supplement amount of 160 for a single parent with 2 children', () => {
    const input: WinterSupplementInput = {
      id: '0',
      numberOfChildren: 2,
      familyComposition: 'single',
      familyUnitInPayForDecember: true,
    };

    const output: WinterSupplementOutput = {
      id: '0',
      isEligible: true,
      baseAmount: 120,
      childrenAmount: 40,
      supplementAmount: 160,
    };

    expect(calculateWinterSupplement(input)).toEqual(output);
  });

  it('should return base amount of 120, children amount of 40, and supplement amount of 160 for a couple with 2 children', () => {
    const input: WinterSupplementInput = {
      id: '0',
      numberOfChildren: 2,
      familyComposition: 'couple',
      familyUnitInPayForDecember: true,
    };

    const output: WinterSupplementOutput = {
      id: '0',
      isEligible: true,
      baseAmount: 120,
      childrenAmount: 40,
      supplementAmount: 160,
    };

    expect(calculateWinterSupplement(input)).toEqual(output);
  });

  describe('invalid inputs for WinterSupplementInput', () => {
    it('should throw an error when the input id is not a string', () => {
      const input: any = {
        id: 123,
        numberOfChildren: 2,
        familyComposition: 'couple',
        familyUnitInPayForDecember: true,
      };

      expect(() => calculateWinterSupplement(input)).toThrow(
        'Invalid WinterSupplementInput format'
      );
    });

    it('should throw an error when the numberOfChildren is a negative number', () => {
      const input: any = {
        id: '123',
        numberOfChildren: -2,
        familyComposition: 'couple',
        familyUnitInPayForDecember: true,
      };

      expect(() => calculateWinterSupplement(input)).toThrow(
        'Invalid WinterSupplementInput format'
      );
    });

    it('should throw an error when the familyComposition is not `single` or `couple`', () => {
      const input: any = {
        id: '123',
        numberOfChildren: 2,
        familyComposition: 'married',
        familyUnitInPayForDecember: true,
      };

      expect(() => calculateWinterSupplement(input)).toThrow(
        'Invalid WinterSupplementInput format'
      );
    });

    it('should throw an error when familyUnitInPayForDecember is not a boolean', () => {
      const input: any = {
        id: '123',
        numberOfChildren: 2,
        familyComposition: 'couple',
        familyUnitInPayForDecember: 'true',
      };

      expect(() => calculateWinterSupplement(input)).toThrow(
        'Invalid WinterSupplementInput format'
      );
    });
  });
});
