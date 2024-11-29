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
