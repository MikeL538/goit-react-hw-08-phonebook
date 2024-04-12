// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './reducers/contactsSlice';
import filterReducer from './reducers/filterSlice';

const middleware = [...getDefaultMiddleware({ serializableCheck: false })];

const persistConfig = {
  key: 'root',
  storage,
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: filterReducer,
  },
  middleware,
});

export const persistor = persistStore(store);
