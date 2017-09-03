/*-- Unit Tests for app.js --*/
var PackageInstaller = require('../src/app.js');

describe('Package Installer Tests --', function() {
    var app = new PackageInstaller();

    it('Static list return type should be object', function() {
        expect(typeof(app.getStaticList())).toEqual('object');
    });
});