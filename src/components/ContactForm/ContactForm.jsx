// ContactForm.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { asyncSaveContact } from '../actions'; // Use asyncSaveContact from actions.js
import css from './contactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  const handleInputChange = event => {
    const { name, value } = event.target;
    name === 'name' ? setName(value) : setPhone(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      name,
      number: phone,
    };

    // Call asyncSaveContact action with authentication token
    dispatch(asyncSaveContact(newContact, token));

    // Reset form state
    setName('');
    setPhone('');
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
