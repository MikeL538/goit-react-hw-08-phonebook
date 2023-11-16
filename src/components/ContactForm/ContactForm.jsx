import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../actions';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleAddContact = event => {
    event.preventDefault();

    if (!name || !number) {
      alert('Please enter both name and number.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));

    // Reset form state
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleAddContact}>
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
        name="number"
        value={number}
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

ContactForm.propTypes = {
  handleAddContact: PropTypes.func.isRequired,
};
