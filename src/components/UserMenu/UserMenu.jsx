// UserMenu.jsx
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../reducers/authSlice';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <nav>
      <ul className={css.navUl}>
        {user && ( // Use parentheses around the condition and curly braces for the JSX block
          <>
            <li>
              <NavLink className={css.navLink} to="/contacts">
                {capitalizeFirstLetter(user.name)}
              </NavLink>
            </li>
            <li>
              <NavLink className={css.navLink} to="/contacts">
                Contacts
              </NavLink>
            </li>
          </>
        )}

        {!user && ( // Use parentheses around the condition and curly braces for the JSX block
          <>
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
          </>
        )}
        {user && ( // Use parentheses around the condition and curly braces for the JSX block
          <>
            <li>
              <NavLink className={css.navLink} to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
