"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WinterSupplementCalculatorUtils_1 = require("./WinterSupplementCalculatorUtils");
describe('calculateWinterSupplement', function () {
    it('should return supplement amount of 0 when familyUnitInPayForDecember is false', function () {
        var input = {
            id: '0',
            numberOfChildren: 2,
            familyComposition: 'single',
            familyUnitInPayForDecember: false,
        };
        var output = {
            id: '0',
            isEligible: false,
            baseAmount: 0,
            childrenAmount: 0,
            supplementAmount: 0,
        };
        expect((0, WinterSupplementCalculatorUtils_1.calculateWinterSupplement)(input)).toEqual(output);
    });
    it('should return base amount of 60, children amount of 0, and supplement amount of 60 for a single parent family with no children', function () {
        var input = {
            id: '0',
            numberOfChildren: 0,
            familyComposition: 'single',
            familyUnitInPayForDecember: true,
        };
        var output = {
            id: '0',
            isEligible: true,
            baseAmount: 60,
            childrenAmount: 0,
            supplementAmount: 60,
        };
        expect((0, WinterSupplementCalculatorUtils_1.calculateWinterSupplement)(input)).toEqual(output);
    });
    it('should return base amount of 120, children amount of 0, and supplement amount of 120 for a couple with no children', function () {
        var input = {
            id: '0',
            numberOfChildren: 0,
            familyComposition: 'couple',
            familyUnitInPayForDecember: true,
        };
        var output = {
            id: '0',
            isEligible: true,
            baseAmount: 120,
            childrenAmount: 0,
            supplementAmount: 120,
        };
        expect((0, WinterSupplementCalculatorUtils_1.calculateWinterSupplement)(input)).toEqual(output);
    });
    it('should return base amount of 120, children amount of 40, and supplement amount of 160 for a single parent with 2 children', function () {
        var input = {
            id: '0',
            numberOfChildren: 2,
            familyComposition: 'single',
            familyUnitInPayForDecember: true,
        };
        var output = {
            id: '0',
            isEligible: true,
            baseAmount: 120,
            childrenAmount: 40,
            supplementAmount: 160,
        };
        expect((0, WinterSupplementCalculatorUtils_1.calculateWinterSupplement)(input)).toEqual(output);
    });
    it('should return base amount of 120, children amount of 40, and supplement amount of 180 for a couple with 2 children', function () {
        var input = {
            id: '0',
            numberOfChildren: 2,
            familyComposition: 'couple',
            familyUnitInPayForDecember: true,
        };
        var output = {
            id: '0',
            isEligible: true,
            baseAmount: 120,
            childrenAmount: 40,
            supplementAmount: 180,
        };
        expect((0, WinterSupplementCalculatorUtils_1.calculateWinterSupplement)(input)).toEqual(output);
    });
});
