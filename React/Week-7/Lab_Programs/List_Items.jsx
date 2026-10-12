
function ListItems() {
  const items = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js'
  ];

  return (
    <div>
      <h2>Technology List</h2>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
