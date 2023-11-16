import { createSlice } from '@reduxjs/toolkit';
import { saveContacts } from '../actions';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], filter: '' },

  reducers: {
    addContact: (state, action) => {
      const newContact = action.payload;

      const contactExists = state.contacts.some(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLowerCase() ||
          contact.number === newContact.number
      );

      if (contactExists) {
        alert('This contact is already in your phonebook!');
        return state;
      }

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
    builder.addCase(saveContacts, state => {
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    });
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
