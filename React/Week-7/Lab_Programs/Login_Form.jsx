
import { useState } from 'react';

function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const validName = 'Bhuvan';
  const validEmail = 'bhuvan@gmail.com';
  const validPassword = '12345';

  function handleSubmit(e) {
    e.preventDefault();

    if (
      name === validName &&
      email === validEmail &&
      password === validPassword
    ) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Invalid name, email, or password.');
    }
  }

  if (loggedIn) {
    return <h2>Welcome, {name}!</h2>;
  }

  return (
    <div>
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginForm;
