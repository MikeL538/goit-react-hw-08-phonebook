// Login.jsx
import { useState } from 'react';
import css from './Login.module.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    alert(`Logginig: ${username}, with password: ${password}`);
  };

  return (
    <form className={css.loginForm} onSubmit={handleLogin}>
      <ul>
        <li>
          Login:
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          ></input>
        </li>
        <li>
          Password:
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          ></input>
        </li>
      </ul>
      <button className={css.okButton} type="submit">
        OK!
      </button>
    </form>
  );
};
