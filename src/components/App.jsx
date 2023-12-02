import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, setFilter, asyncFetchContacts } from './actions';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import axios from 'axios';

export const App = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(asyncFetchContacts());
  }, [dispatch]);

  const handleAddContact = async newContact => {
    const formattedContact = {
      id: nanoid(),
      ...newContact,
    };

    // Dispatch the action to save contact to the backend
    await dispatch(saveContactToBackend(formattedContact));
  };

  const handleDeleteContact = async contactId => {
    dispatch(deleteContact(contactId));
    await deleteContactFromBackend(contactId);
  };

  const handleFilterChange = newFilter => {
    dispatch(setFilter(newFilter));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      const { name, number } = contact;
      return (
        name &&
        number &&
        (name.toLowerCase().includes(filter.toLowerCase()) ||
          number.includes(filter))
      );
    });
  };

  const saveContactToBackend = async contact => {
    try {
      await axios.post(
        'https://656b179ddac3630cf727ab1f.mockapi.io/contacts',
        contact
      );
    } catch (error) {
      console.error('Failed to save contact to the backend:', error.message);
    }
  };

  const deleteContactFromBackend = async contactId => {
    try {
      await axios.delete(
        `https://656b179ddac3630cf727ab1f.mockapi.io/contacts/${contactId}`
      );
    } catch (error) {
      console.error(
        'Failed to delete contact from the backend:',
        error.message
      );
    }
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
