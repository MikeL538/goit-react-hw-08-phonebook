// Navigation.jsx
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav>
      <ul className={css.navUl}>
        <li>
          <NavLink className={css.navLink} to="/contacts">
            Contacts
          </NavLink>
        </li>
        <li>
          <NavLink className={css.navLink} to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className={css.navLink} to="/register">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
