/*-- Unit Tests for Package Installer --*/
(function() {
    'use strict';

    const PackageInstaller = require('../src/package-installer.js');
    const pi = new PackageInstaller();
    const sampleInput = [
        'ReportService: AnalyticsService',
        'AnalyticsService'
    ];
    
    describe('Package Installer Tests --', function() {
        it('promptText should be type of string', function() {
            expect(typeof pi.promptText).toBe('string');
        });
    
        it('validationErrorText should be type of string', function() {
            expect(typeof pi.validationErrorText).toBe('string');
        });

        it('cycleErrorText should be type of string', function() {
            expect(typeof pi.cycleErrorText).toBe('string');
        });
    
        it('packageList should be type of object (array)', function() {
            expect(typeof pi.packageList).toBe('object');
        });

        it('installOrder should be type of object (array)', function() {
            expect(typeof pi.installOrder).toBe('object');
        });

        it('cycleExists should be type of boolean', function() {
            expect(typeof pi.cycleExists).toBe('boolean');
        });

        it('showPrompt should be a type of function', function() {
            expect(typeof pi.showPrompt).toBe('function');
        });

        it('validateInput should be a type of function', function() {
            expect(typeof pi.validateInput).toBe('function');
        });

        it('validateInput should return a type of boolean', function() {
            expect(typeof pi.validateInput(sampleInput)).toBe('boolean');
        });
    });
}());