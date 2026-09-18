const students = [
    { name: "A", marks: 35 },
    { name: "B", marks: 78 },
    { name: "C", marks: 42 },
    { name: "D", marks: 90 }
];

// map() - extract marks
const marks = students.map(student => student.marks);

// reduce() - calculate total
const total = marks.reduce((sum, mark) => sum + mark, 0);

// Calculate average
const average = total / students.length;

// filter() - find students who passed
const passedStudents = students.filter(student => student.marks >= 40);

console.log("Marks:", marks);
console.log("Class Average:", average);

console.log("Passed Students:");

passedStudents.forEach(student => {
    console.log(student.name + " - " + student.marks);
});