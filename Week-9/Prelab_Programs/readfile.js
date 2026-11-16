const fs = require('fs');

const filename = process.argv[2];

if (!filename) {
    console.log("Please provide a filename.");
    process.exit(1);
}

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.log("Error: File does not exist or cannot be read.");
        return;
    }

    console.log("File Content:");
    console.log(data);
});