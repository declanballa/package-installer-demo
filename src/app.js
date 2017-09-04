/*--- Package Installer ---*/
(function() {
    'use strict';
    
    class PackageInstaller {
        constructor(showPrompt) {
            showPrompt = showPrompt;
            this.init();
        }

        init() {
            this.promptText = 'Please enter the packages you\'d like to install:\n';
            this.inputList = [];
            this.packageList = [];
        }
    
        // Prompt and accept an input (array):
        showPrompt() {
            process.stdout.write(this.promptText);
            
            process.stdin.once('data', function(data) {
                this.inputList = data.toString().replace('[', '').replace(']', '');
                this.packageList = this.inputList.split(',');

                process.exit();
            });
        }
    
        // Process and install packages:
    
        // Output the install ordered array:
    
        // Error handling for cycled dependencies:
        
    }
    
    // Create a new instance of package installer and expose on npm start:
    const app = new PackageInstaller();
    app.showPrompt();
    
    // Export for unit testing:
    module.exports = PackageInstaller;
}());