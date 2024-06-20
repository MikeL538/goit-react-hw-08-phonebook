// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Navigation } from './Navigation/Navigation';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import { Contacts } from './Contacts/Contacts';

import css from './App.module.css';

export const App = () => {
  return (
    <Router>
      <div className={css.container}>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};
