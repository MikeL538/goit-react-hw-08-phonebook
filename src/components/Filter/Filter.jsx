// Filter.jsx
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterSlice';

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
