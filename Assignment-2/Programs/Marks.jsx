import { useState } from "react";

function MarksEntry() {
  const questions = [
    { id: 1, max: 10 },
    { id: 2, max: 10 },
    { id: 3, max: 15 },
    { id: 4, max: 15 },
    { id: 5, max: 20 }
  ];

  const [student, setStudent] = useState("");
  const [marks, setMarks] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (id, value, max) => {
    setMarks((prev) => ({ ...prev, [id]: value }));
    setMessage("");

    let error = "";

    if (value !== "") {
      if (
        !/^\d+(\.\d+)?$/.test(value) ||
        Number(value) < 0 ||
        Number(value) > max
      ) {
        error = `Enter marks between 0 and ${max}`;
      }
    }

    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const total = questions.reduce(
    (sum, q) => sum + (Number(marks[q.id]) || 0),
    0
  );

  const maxTotal = questions.reduce(
    (sum, q) => sum + q.max,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    questions.forEach((q) => {
      const value = marks[q.id];

      if (value === undefined || value === "") {
        newErrors[q.id] = "Marks are required";
      } else if (
        !/^\d+(\.\d+)?$/.test(value) ||
        Number(value) < 0 ||
        Number(value) > q.max
      ) {
        newErrors[q.id] =
          `Enter marks between 0 and ${q.max}`;
      }
    });

    setErrors(newErrors);

    if (!student.trim()) {
      setMessage("Please enter the student name.");
    } else if (Object.values(newErrors).some(Boolean)) {
      setMessage("Please correct the errors before submitting.");
    } else {
      setMessage(
        `Submitted successfully! Total: ${total}/${maxTotal}`
      );
    }
  };

  const handleReset = () => {
    setStudent("");
    setMarks({});
    setErrors({});
    setMessage("");
  };

  return (
    <div>
      <h2>Student Marks Entry</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={student}
          onChange={(e) => {
            setStudent(e.target.value);
            setMessage("");
          }}
        />

        {questions.map((q) => (
          <div key={q.id}>
            <label>
              Question {q.id} (Max: {q.max}):{" "}
            </label>

            <input
              type="number"
              min="0"
              max={q.max}
              step="any"
              placeholder="Enter marks"
              value={marks[q.id] ?? ""}
              onChange={(e) =>
                handleChange(q.id, e.target.value, q.max)
              }
            />

            {errors[q.id] && (
              <p style={{ color: "red" }}>
                {errors[q.id]}
              </p>
            )}
          </div>
        ))}

        <h3>Total: {total} / {maxTotal}</h3>

        <button type="submit">Submit</button>{" "}
        <button type="button" onClick={handleReset}>
          Reset
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default MarksEntry;
