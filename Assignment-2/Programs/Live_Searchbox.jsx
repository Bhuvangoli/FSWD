import { useState } from "react";

function LiveSearch() {
  const names = [
    "Bhuvan", "Arjun", "Priya", "Rahul", "Sneha",
    "Ananya", "Kiran", "Rohit", "Divya", "Vikram"
  ];

  const [search, setSearch] = useState("");

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Live Search Box</h2>

      <input
        type="text"
        placeholder="Search names"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      {filteredNames.length === 0 && <p>No names found.</p>}
    </div>
  );
}

export default LiveSearch;
