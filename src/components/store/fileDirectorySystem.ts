import { createSlice } from '@reduxjs/toolkit';

const initialFDSState = {
  inputCommand: '',
  history: [],
};

const fileDirectorySystemSlice = createSlice({
  name: 'fileDirectorySystem',
  initialState: initialFDSState,
  reducers: {
    setInputCommand: (state: { inputCommand: string }, action: { payload: string }) => {
      state.inputCommand = action.payload;
    },
    setHistory: (state: { history: string[] }, action: { payload: string }) => {
      state.history = [...state.history, action.payload];
    },
  },
});

export const fileDirectorySystemActions = fileDirectorySystemSlice.actions;

export default fileDirectorySystemSlice.reducer;
