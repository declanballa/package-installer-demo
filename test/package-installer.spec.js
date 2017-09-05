/*-- Unit Tests for Package Installer --*/
(function() {
    'use strict';

    var jasmine = require('jasmine');
    const PackageInstaller = require('../src/package-installer.js');
    const pi = new PackageInstaller();
    const sampleInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: Leetmeme','Ice: '];
    const sampleIncorrectFormat = ['KittService', 'Leetmeme- '];
    const validationErrorText = '\n' + 'Item(s) in your list are not formed properly. Please try again.' + ' \n';
    const sampleCycledDependency = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];
    const cycleErrorText = '\n' + 'Your list contains a dependency cycle! Please try again.' + ' \n';
    
    describe('Package Installer Tests --', () => {
        describe('Properties and Functions:', () => {
            it('promptText should be type of string', () => {
                expect(typeof pi.promptText).toBe('string');
            });
        
            it('validationErrorText should be type of string', () => {
                expect(typeof pi.validationErrorText).toBe('string');
            });
    
            it('cycleErrorText should be type of string', () => {
                expect(typeof pi.cycleErrorText).toBe('string');
            });
        
            it('packageList should be type of array', () => {
                expect(Array.isArray(pi.packageList)).toBe(true);
            });
    
            it('packageInstallOrder should be type of array', () => {
                expect(Array.isArray(pi.packageInstallOrder)).toBe(true);
            });
    
            it('cycleExists should be type of boolean', () => {
                expect(typeof pi.cycleExists).toBe('boolean');
            });
    
            it('processPackageIngestion should be a type of function', () => {
                expect(typeof pi.processPackageIngestion).toBe('function');
            });
    
            it('validateInput should be a type of function', () => {
                expect(typeof pi.validateInput).toBe('function');
            });
    
            it('validateInput should return a type of boolean', () => {
                expect(typeof pi.validateInput(sampleInput)).toBe('boolean');
            });
    
            it('processPackages should be a type of function', () => {
                expect(typeof pi.processPackages).toBe('function');
            });
    
            it('scanPackageList should be a type of function', () => {
                expect(typeof pi.scanPackageList).toBe('function');
            });
    
            it('checkForDependencyCycling should be a type of function', () => {
                expect(typeof pi.checkForDependencyCycling).toBe('function');
            });
        });
    
        describe('Error Handling:', () => {
            it('error should be thrown when items without colons are entered', () => {
                var spy = spyOn(console, 'log');

                pi.processPackageIngestion(sampleIncorrectFormat);

                expect(spy).toHaveBeenCalledWith(validationErrorText);
            });

            it('error should be thrown when a list contains a dependency cycle', () => {
                var spy = spyOn(console, 'log');
                
                pi.processPackageIngestion(sampleCycledDependency);

                expect(spy).toHaveBeenCalledWith(cycleErrorText);
            });
        });
    });
}());