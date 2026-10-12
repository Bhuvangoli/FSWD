const fs = require('fs');

fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err.message);
        return;
    }

    try {
        const users = JSON.parse(data);

        users.forEach((user) => {
            console.log('Name:', user.name);
            console.log('Age:', user.age);
            console.log('Email:', user.email);
            console.log('------------------');
        });
    } catch (err) {
        console.log('Invalid JSON:', err.message);
    }
});