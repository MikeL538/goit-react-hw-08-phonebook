// Register.jsx
import { useState } from 'react';
import css from './Register.module.css';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = e => {
    e.preventDefault();
    alert(
      `Registered as: ${username}, password set to: ${password}, for E-mail: ${email}`
    );
  };

  return (
    <form className={css.registerForm} onSubmit={handleRegister}>
      <ul>
        <li>
          Username:
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
        <li>
          E-mail:
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
