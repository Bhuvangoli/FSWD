const fs = require('fs');
fs.readFile('users.json', 'utf8', (err, data) => {

    if (err) {
        console.log("Error reading JSON file:", err.message);
        return;
    }

    try {
        const users = JSON.parse(data);

        users.forEach((user) => {
            console.log("Name:", user.name);
            console.log("Age:", user.age);
            console.log("Email:", user.email);
            console.log("-------------------");
        });

    } catch (error) {
        console.log("Invalid JSON format.");
    }
});