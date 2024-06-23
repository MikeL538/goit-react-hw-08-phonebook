// Contacts.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../reducers/contactsSlice';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import css from './Contacts.module.css';

export const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchContacts(token));
    }
  }, [dispatch, token]);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact({ contactId, token }));
  };

  return (
    <div className={css.contactsContainer}>
      <ContactForm />
      <Filter />
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};
