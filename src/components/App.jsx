import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter, saveContacts } from './actions';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export const App = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(saveContacts());
  }, [contacts, dispatch]);

  const handleAddContact = newContact => {
    const formattedContact = {
      id: nanoid(),
      ...newContact,
    };

    dispatch(addContact(formattedContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
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
