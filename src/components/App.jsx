import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, setFilter, asyncFetchContacts } from './actions';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { addContact } from './actions';

export const App = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(asyncFetchContacts());
  }, [dispatch]);

  const handleAddContact = async newContact => {
    console.log('Click!'); // This should now be logged
    try {
      const formattedContact = {
        id: nanoid(),
        ...newContact,
      };

      console.log('Before saving contact to backend:', formattedContact);

      try {
        // Save contact to the backend
        await saveContactToBackend(formattedContact)();
        // Dispatch the addContact action after saving to the backend
        dispatch(addContact(formattedContact));
      } catch (error) {
        console.error('Error during saveContactToBackend:', error.message);
      }

      console.log('After saving contact to backend');
    } catch (error) {
      console.error('Error in handleAddContact:', error.message);
    }
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

  const saveContactToBackend = async formattedContact => {
    try {
      console.log('Sending contact to backend:', formattedContact);
      await axios.post(
        'https://656b179ddac3630cf727ab1f.mockapi.io/contacts',
        formattedContact
      );
      console.log('Contact successfully sent to the backend');
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
