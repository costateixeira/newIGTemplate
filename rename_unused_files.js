const fs = require('fs');
const path = require('path');

// Function to rename file with _NO suffix in both name and extension
function renameWithNoSuffix(filePath) {
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const basename = path.basename(filePath, ext);
    const newPath = path.join(dir, `${basename}_NO${ext}_NO`);

    try {
        if (fs.existsSync(filePath)) {
            fs.renameSync(filePath, newPath);
            console.log(`✓ Renamed: ${filePath} -> ${newPath}`);
            return true;
        } else {
            console.log(`✗ Not found: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`✗ Error renaming ${filePath}: ${error.message}`);
        return false;
    }
}

const basePath = 'c:\\work\\ImplementationGuides\\template2\\local-template\\package';

// List of all unused files to rename
const unusedFiles = [
    // Unused Fragment Files
    'includes/fragment-base-navtabs.html',
    'includes/fragment-css.html',
    'includes/fragment-footer.html',
    'includes/fragment-header.html',
    'includes/fragment-intro.html',
    'includes/fragment-modelType.html',
    'includes/fragment-notes.html',
    'includes/fragment-profile-navtabs.html',
    'includes/fragment-simpletable.html',

    // Unused Utility Files
    'includes/custom.js',
    'includes/custom-index.js',
    'includes/custom-data.json',
    'includes/canonical-index.xhtml',
    'includes/fix_linenos.html',
    'includes/changes.xml',
    'includes/globals-table.xhtml',
    'includes/spec.md',
    'includes/spec2.md',

    // Unused CSS Files
    'content/assets/css/bootstrap-glyphicons.css',
    'content/assets/css/colors.css',
    'content/assets/css/cqf.css',
    'content/assets/css/hl7.css',
    'content/assets/css/jquery-ui.structure.min.css',
    'content/assets/css/jquery-ui.theme.min.css',
    'content/assets/css/just-the-docs-dark.scss',
    'content/assets/css/just-the-docs-light.scss',
    'content/assets/css/prism-fhirpath.css',
    'content/assets/css/xml.css',

    // Unused JavaScript Files
    'content/assets/js/anchor-hover.js',
    'content/assets/js/anchor.min.js',
    'content/assets/js/bootstrap.min.js',
    'content/assets/js/clipboard.min.js',
    'content/assets/js/clipboard-btn.js',
    'content/assets/js/fhir.js',
    'content/assets/js/html5shiv.js',
    'content/assets/js/mermaid-init.js',
    'content/assets/js/mermaid.js',
    'content/assets/js/prism-fhirpath.js',
    'content/assets/js/prism.js',
    'content/assets/js/respond.min.js',
    'content/assets/js/topofpage.js',
    'content/assets/js/xml.js',
    'content/assets/js/readme.txt',

    // Unused Image Files
    'content/assets/images/large-image.jpg',
    'content/assets/images/small-image.jpg',
    'content/assets/ico/noun_copy to clipboard_1669410.png',

    // Documentation files
    'content/_sass/vendor/normalize.scss/README.md',
    'content/_sass/vendor/OneDarkJekyll/LICENSE',
    'content/_sass/vendor/OneLightJekyll/LICENSE'
];

console.log('Starting to rename unused files with _NO suffix...\n');

let successCount = 0;
let failCount = 0;

unusedFiles.forEach(file => {
    const fullPath = path.join(basePath, file);
    if (renameWithNoSuffix(fullPath)) {
        successCount++;
    } else {
        failCount++;
    }
});

console.log(`\n========================================`);
console.log(`Total files processed: ${unusedFiles.length}`);
console.log(`Successfully renamed: ${successCount}`);
console.log(`Failed/Not found: ${failCount}`);
console.log(`========================================`);
