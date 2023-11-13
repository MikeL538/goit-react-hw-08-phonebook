// actions.js
import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');
export const setFilter = createAction('contacts/setFilter');
export const saveContacts = createAction('contacts/saveContacts');
