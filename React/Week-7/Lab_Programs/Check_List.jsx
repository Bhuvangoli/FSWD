
import { useState } from 'react';

function Checklist() {
  const options = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js'
  ];

  const [selected, setSelected] = useState([]);

  function handleChange(e) {
    const { value, checked } = e.target;

    setSelected((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  }

  return (
    <div>
      <h2>Technology Checklist</h2>

      {options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="checkbox"
              value={option}
              checked={selected.includes(option)}
              onChange={handleChange}
            />
            {option}
          </label>
        </div>
      ))}

      <h3>Selected Options:</h3>

      {selected.length > 0 ? (
        <ul>
          {selected.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No options selected.</p>
      )}
    </div>
  );
}

export default Checklist;
