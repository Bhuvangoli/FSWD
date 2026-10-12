const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const upperData = data.toUpperCase();

    fs.writeFile('output.txt', upperData, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Content written in uppercase successfully!');
    });
});