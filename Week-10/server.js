const express = require('express');

const app = express();

const PORT = 3000;

const students = [
    {
        id: 1,
        name: "Arun",
        age: 20,
        department: "Computer Science",
        email: "arun@gmail.com"
    },
    {
        id: 2,
        name: "Priya",
        age: 21,
        department: "Information Technology",
        email: "priya@gmail.com"
    },
    {
        id: 3,
        name: "Rahul",
        age: 22,
        department: "Electronics",
        email: "rahul@gmail.com"
    }
];

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const student = students.find(
        s => s.id === parseInt(req.params.id)
    );

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({
            message: "Student not found"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
