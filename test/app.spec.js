/*-- Unit Tests for Package Installer --*/
const PackageInstaller = require('../src/app.js');
const pi = new PackageInstaller();

describe('Package Installer Tests --', function() {
    it('prompt text should be type of string', function() {
        expect(typeof pi.promptText).toBe('string');
    });

    it('input list should be type of object (array)', function() {
        expect(typeof pi.inputList).toBe('object');
    });

    it('package list should be type of object (array)', function() {
        expect(typeof pi.packageList).toBe('object');
    });

    it('show prompt should a type of function', function() {
        console.log(typeof pi.showPrompt);
        expect(typeof pi.showPrompt).toBe('function');
    });
});