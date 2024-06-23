// Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/authSlice';
import { Navigate } from 'react-router-dom';
import css from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorLogin, setShowError] = useState(false); // State to control error message visibility
  const dispatch = useDispatch();
  const { user, status, error: errorLogin } = useSelector(state => state.auth);

  const handleSubmit = event => {
    event.preventDefault();

    if (password.length < 7) {
      alert('Password must be at least 7 characters long.');
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (errorLogin) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorLogin]);

  if (user) {
    return <Navigate to="/contacts" />;
  }

  const handleError = () => {
    return <p>Wrong Password or E-mail</p>;
  };

  return (
    <form className={css.loginForm} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <ul>
        <li>
          Email:
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
        Login
      </button>
      {errorLogin && showErrorLogin && handleError()}
    </form>
  );
};
