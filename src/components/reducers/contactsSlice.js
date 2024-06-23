// contactsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://connections-api.herokuapp.com/contacts',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async ({ contactId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://connections-api.herokuapp.com/contacts/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return contactId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    removeContact(state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    setContacts(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { addContact, removeContact, setContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
