const fs = require('fs');

fs.writeFile('data.txt', 'Hello Node.js!\n', (err) => {
    if (err) throw err;

    console.log('File written successfully.');

    fs.appendFile('data.txt', 'Welcome to file handling.\n', (err) => {
        if (err) throw err;

        console.log('Data appended successfully.');
    });
});