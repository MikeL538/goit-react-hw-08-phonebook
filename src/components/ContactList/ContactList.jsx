import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ContactListItem } from './components/ContactListItem/ContactListItem';
import css from './ContactList.module.css';

export const ContactList = ({ onDeleteContact }) => {
  const contacts = useSelector(state => state.contacts.contacts);

  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};
