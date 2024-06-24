// ContactListItem.jsx
import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

export const ContactListItem = ({ contact, onDeleteContact }) => {
  return (
    <li className={css.listItem}>
      <p className={css.listItemP}>
        {contact.name}: {contact.number}
      </p>

      <button
        className={css.deleteButtons}
        onClick={() => onDeleteContact(contact.id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
