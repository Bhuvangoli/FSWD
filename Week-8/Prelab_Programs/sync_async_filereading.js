const fs = require('fs');

console.log('Synchronous File Reading:');

try {
    const data = fs.readFileSync('input.txt', 'utf8');
    console.log('File content:');
    console.log(data);
    console.log('Synchronous reading completed.\n');
} catch (err) {
    console.log(err.message);
}

console.log('Asynchronous File Reading:');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log('File content:');
    console.log(data);
    console.log('Asynchronous reading completed.');
});

console.log('Reading started.');