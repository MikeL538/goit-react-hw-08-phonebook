import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../actions';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

export const ContactForm = ({ handleAddContact }) => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!name || !phone) {
      alert('Please enter both name and number.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      phone,
    };

    console.log('ContactForm Worked after "Add Contact"');
    handleAddContact(newContact);

    dispatch(addContact(newContact));

    // Reset form state
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <p>Name</p>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        maxLength={32}
        required
      />
      <p>Number</p>
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
