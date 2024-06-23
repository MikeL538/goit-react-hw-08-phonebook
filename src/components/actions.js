// actions.js
import axiosInstance from './axios';
import { addContact } from './reducers/contactsSlice';

export const asyncSaveContact = (newContact, token) => async dispatch => {
  try {
    const response = await axiosInstance.post('/contacts', newContact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addContact(response.data));
  } catch (error) {
    console.error('Failed to save contact to the backend:', error.message);
    throw error;
  }
};
