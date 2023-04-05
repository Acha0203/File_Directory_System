import { createSlice } from '@reduxjs/toolkit';

const initialFDSState = {
  inputCommand: '',
  inputCommandsList: [],
};

const fileDirectorySystemSlice = createSlice({
  name: 'fileDirectorySystem',
  initialState: initialFDSState,
  reducers: {
    setInputCommand: (state: { inputCommand: string }, action: { payload: string }) => {
      state.inputCommand = action.payload;
    },
    setInputCommandsList: (state: { inputCommandsList: string[] }, action: { payload: string }) => {
      state.inputCommandsList = [...state.inputCommandsList, action.payload];
    },
  },
});

export const fileDirectorySystemActions = fileDirectorySystemSlice.actions;

export default fileDirectorySystemSlice.reducer;
