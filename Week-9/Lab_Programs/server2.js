const express = require('express');

const app = express();
app.use(express.json());

let users = [
    { id: 1, name: "John", age: 22 },
    { id: 2, name: "David", age: 25 },
    { id: 3, name: "Smith", age: 21 }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length > 0
            ? Math.max(...users.map(u => u.id)) + 1
            : 1,
        name: req.body.name,
        age: req.body.age
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(index, 1);

    res.json({
        message: "User deleted successfully"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
