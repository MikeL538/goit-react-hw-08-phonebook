// ContactForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../actions';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

export const ContactForm = ({ handleAddContact, contacts }) => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contactExists = contacts.some(
      contact => contact.name === name || contact.phone === phone
    );

    if (contactExists) {
      alert('This contact already exists.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      phone,
    };

    handleAddContact(newContact);

    dispatch(addContact(newContact));

    // Reset form state
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <p>Name:</p>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        maxLength={32}
        required
      />
      <p>Number:</p>
      <input
        type="tel"
        name="phone"
        value={phone}
        onChange={handleInputChange}
        maxLength={15}
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
