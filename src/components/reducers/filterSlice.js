import { createSlice } from '@reduxjs/toolkit';
// filterSlice.js
import { setFilter } from '../actions';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setFilter, (state, action) => {
      return action.payload;
    });
  },
});

export default filterSlice.reducer;
