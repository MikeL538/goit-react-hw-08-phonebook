// Filter.jsx
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilter } from '../actions';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <input
      id="search"
      placeholder="Search contact"
      onChange={handleFilterChange}
    />
  );
};

Filter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};
