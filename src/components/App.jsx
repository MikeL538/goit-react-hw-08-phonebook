// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserMenu } from './UserMenu/UserMenu';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import { Contacts } from './Contacts/Contacts';
import css from './App.module.css';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  return user ? children : <Navigate to="/login" />;
};

export const App = () => {
  return (
    <Router>
      <div className={css.container}>
        <UserMenu />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};
