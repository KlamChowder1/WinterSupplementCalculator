"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WinterSupplementCalculatorUtils_1 = require("./WinterSupplementCalculatorUtils");
describe('calculateWinterSupplement', function () {
    it('should supplement amount of 60 for single parent family with no children', function () {
        var input = {
            id: '0',
            numberOfChildren: 0,
            familyComposition: 'single',
            familyUnitInPayForDecember: true,
        };
        var expectedOutput = {
            id: '0',
            isEligible: true,
            baseAmount: 60,
            childrenAmount: 0,
            supplementAmount: 60,
        };
        expect((0, WinterSupplementCalculatorUtils_1.calculateWinterSupplement)(input)).toEqual(expectedOutput);
    });
});
