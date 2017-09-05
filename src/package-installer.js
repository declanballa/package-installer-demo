/*--- Package Installer ---*/
(function() {
    'use strict';

    class Package {
        constructor(name, dependencyName) {
            this.name = name;
            this.dependencyName = dependencyName;
            this.viewed = false;
            this.processed = false;
        }
    }
    
    class PackageInstaller {
        constructor() {
            this.init();
        }

        init() {
            this.promptText = 'Please enter the packages you\'d like to install:';
            this.validationErrorText = '\n' + 'Item(s) in your list are not formed properly. Please try again.' + ' \n';
            this.cycleErrorText = '\n' + 'Your list contains a dependency cycle! Please try again.' + ' \n';
            this.packageList = [];
            this.packageInstallOrder = [];
            this.cycleExists = false;
        }
    
        // ENTRY POINT:
        // Prompt and convert input into array:
        processPackageIngestion(optionalInput) {
            this.init();
            
            let callback = (response) => {
                let inputList = response.replace('[', '').replace(']', '');
                inputList = inputList.split(',');
                
                if (this.validateInput(inputList)) {
                    this.processPackages(inputList);
                    this.scanPackageList();

                    if (this.cycleExists) {
                        console.log(this.cycleErrorText);
                        this.processPackageIngestion();
                    } else {
                        // EXIT POINT:
                        // Console log for ui review & function return:
                        console.log('\n' + 'SUCCESS! --- Package Install Order:');
                        console.log(this.packageInstallOrder);
                        process.exit();

                        return this.packageInstallOrder;
                    }
                } else {
                    console.log(this.validationErrorText);
                    this.processPackageIngestion();
                }
            };

            if (optionalInput) {
                callback(optionalInput.toString());
            } else {
                console.log(this.promptText);
                process.stdin.once('data', (data) => { 
                    callback(data.toString());
                });
            }
        }

        // Validation to make sure all items are colon delimited:
        validateInput(input) {
            let count = 0;

            for (var item in input) {
                if (input.hasOwnProperty(item)) {
                    count++;

                    if (input[item].indexOf(':') === -1) {
                        return false;
                    }
                    
                    if (count === input.length) {
                        return true;
                    }
                }
            }
        }

        // Process input list array:
        processPackages(packageList) {
            for (let i = 0; i < packageList.length; i++) {
                let inputPackage = packageList[i].split(':');
                let packageName = inputPackage[0].trim().replace('\'', '');
                let dependencyName = inputPackage[1].trim().replace('\'', '');
                let newPackage = new Package(packageName, dependencyName);
                
                this.packageList[packageName] = newPackage;
            }
        }

        // Loop through the packages if they haven't been processed yet:
        scanPackageList() {
            for (let packageName in this.packageList) {
                if (this.packageList.hasOwnProperty(packageName)) {
                    let packageToCheck = this.packageList[packageName];
                    
                    if (!packageToCheck.processed) {
                        this.checkForDependencyCycling(packageToCheck);
                    }
                }
            }
        }

        // And check if they have dependency cycle:
        checkForDependencyCycling(packageToCheck) {
            packageToCheck.viewed = true;

            let packageName = packageToCheck.name;
            let dependencyName = packageToCheck.dependencyName === '' ? null : packageToCheck.dependencyName;
            
            if (dependencyName) {
                let dependency = this.packageList[dependencyName];

                if (!dependency.viewed) {
                    this.checkForDependencyCycling(dependency);
                } else if(!dependency.processed) {
                    this.cycleExists = true;
                }
            }

            packageToCheck.processed = true;
            this.packageInstallOrder.push(packageName);
        }
    }
    
    // Create a new instance of PackageInstaller and expose on npm start:
    let pi = new PackageInstaller();
    pi.processPackageIngestion();
    
    // Export for unit testing:
    module.exports = PackageInstaller;
}());