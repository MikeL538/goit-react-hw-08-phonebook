// ContactForm.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSaveContact } from '../actions';
import css from './contactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      // Remove all spaces from the current value
      const cleanedValue = value.replace(/\s/g, '');

      // Insert a space every three characters
      let formattedValue = '';
      for (let i = 0; i < cleanedValue.length; i++) {
        if (i > 0 && i % 3 === 0) {
          formattedValue += ' ';
        }
        formattedValue += cleanedValue[i];
      }

      setNumber(formattedValue);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      name,
      number,
    };

    dispatch(asyncSaveContact(newContact, token));

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
        maxLength={24}
        required
      />
      <p>Number:</p>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleInputChange}
        maxLength={20}
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
