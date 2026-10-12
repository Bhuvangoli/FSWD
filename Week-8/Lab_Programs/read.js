const fs = require('fs');
const filename = process.argv[2];

if (!filename) {
    console.log('Please provide a filename.');
    process.exit(1);
}

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.log('Error:', err.message);
        return;
    }

    console.log('File content:');
    console.log(data);
});