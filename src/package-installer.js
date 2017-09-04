/*--- Package Installer ---*/
(function() {
    'use strict';

    class Package {
        constructor(name, dependencyName) {
            this.name = name;
            this.dependencyName = dependencyName;
        }
    }
    
    class PackageInstaller {
        constructor() {
            this.init();
        }

        init() {
            this.promptText = 'Please enter the packages you\'d like to install:\n';
            this.validationErrorText = 'Item(s) in your list are not formed properly. Please try again.';
            this.cycleErrorText = 'Your list contains a dependency cycle! Please try again.';
            this.packageList = [];
            this.installOrder = [];
            this.cycleExists = false;
        }
    
        // Prompt and convert input into array:
        showPrompt() {
            let callback = (response) => {
                let inputList = response.replace('[', '').replace(']', '');
                inputList = inputList.split(',');

                if (this.validateInput(inputList)) {
                    this.processPackages(inputList);
                } else {
                    process.stdin.write(this.validationErrorText);
                }
            };

            process.stdout.write(this.promptText);
            process.stdin.once('data', (data) => { 
                callback(data.toString()); 
                process.exit(); 
            });
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

        // Process input list array;
        processPackages(packageList) {
            for (let i = 0; i < packageList.length; i++) {
                let inputPackage = packageList[i].split(':');
                let packageName = inputPackage[0].trim();
                let dependencyName = inputPackage[1].trim();
                let newPackage = new Package(packageName, dependencyName);

                this.packageList[packageName] = newPackage;
            }
        }
    }
    
    // Create a new instance of PackageInstaller and expose on npm start:
    let pi = new PackageInstaller();
    pi.showPrompt();
    
    // Export for unit testing:
    module.exports = PackageInstaller;
}());