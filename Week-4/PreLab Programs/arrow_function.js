let students = ["Rahul", "Priya", "Arun", "Sneha"];

let displayStudent = (name) => `Student Name: ${name}`;

students.forEach((name) => {
    console.log(displayStudent(name));
});