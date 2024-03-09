import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  fetchContactsSuccess,
  fetchContactsFailure,
} from '../actions';
import axios from 'axios';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], filter: '', loading: false, error: null },

  reducers: {
    addContact: (state, action) => {
      const newContact = action.payload;
      state.contacts.push(newContact);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts, state => {
        state.loading = true;
      })
      .addCase(fetchContactsSuccess, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;

export const saveContactToBackend = newContact => async () => {
  try {
    await axios.post(
      'https://656b179ddac3630cf727ab1f.mockapi.io/contacts',
      newContact
    );
  } catch (error) {
    console.error('Failed to save contact to the backend:', error.message);
  }
};

export default contactsSlice.reducer;
