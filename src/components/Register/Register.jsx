// Register.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../reducers/authSlice';
import { Navigate } from 'react-router-dom';
import css from './Register.module.css';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); // State to control error message visibility
  const dispatch = useDispatch();
  const { user, status, error } = useSelector(state => state.auth);

  const handleSubmit = event => {
    if (password.length < 7) {
      alert('Password must be at least 7 characters long.');
      event.preventDefault();
      return;
    }
    event.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (error) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleError = () => {
    return <p>E-mail is already taken.</p>;
  };

  if (user) {
    return <Navigate to="/contacts" />;
  }

  return (
    <form className={css.registerForm} onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <ul>
        <li>
          Login:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </li>
        <li>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </li>
        <li>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </li>
      </ul>
      <button
        className={css.okButton}
        type="submit"
        disabled={status === 'loading'}
      >
        Register
      </button>
      {error && showError && handleError()}
    </form>
  );
};
