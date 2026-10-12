
import { useState } from 'react';

function SearchFilter() {
  const [search, setSearch] = useState('');

  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Grapes',
    'Pineapple'
  ];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Search Filter</h2>

      <input
        type="text"
        placeholder="Search fruits..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {filteredItems.length === 0 && <p>No items found.</p>}
    </div>
  );
}

export default SearchFilter;
