// actions.js
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');
export const setFilter = createAction('contacts/setFilter');

// Define asyncFetchContacts
export const asyncFetchContacts = () => async dispatch => {
  try {
    const response = await fetch(
      'https://656b179ddac3630cf727ab1f.mockapi.io/contacts'
    );
    const data = await response.json();
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsFailure(error.message));
  }
};

export const fetchContacts = createAction('contacts/fetchContacts');
export const fetchContactsSuccess = createAction(
  'contacts/fetchContactsSuccess'
);
export const fetchContactsFailure = createAction(
  'contacts/fetchContactsFailure'
);

// Define asyncSaveContact
export const asyncSaveContact = newContact => async dispatch => {
  try {
    await axios.post(
      'https://656b179ddac3630cf727ab1f.mockapi.io/contacts',
      newContact
    );
  } catch (error) {
    console.error('Failed to save contact to the backend:', error.message);
  }
};
