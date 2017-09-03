/*--- Package Installer ---*/
(function() {
    'use strict';
    
    class PackageInstaller {
        constructor(getStaticList, outputList) {
            getStaticList = getStaticList;
            outputList = outputList;
        }
    
        // Static dependency list for testing:
        getStaticList() {
            return [
                'ReportService: AnalyticsService', 
                'AnalyticsService: '
            ];
        }
    
        // Prompt and accept an input (array):
        outputList() {
            console.log(this.getStaticList());
        }
    
        // Process and install packages:
    
    
    
    
        // Output the install ordered array:
    
    
    
    
        // Error handling for cycled dependencies:
    
    
    }
    
    var app = new PackageInstaller();
    console.log(app.getStaticList());
    
    module.exports = PackageInstaller;
}());