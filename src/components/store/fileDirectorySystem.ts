import { createSlice } from '@reduxjs/toolkit';

import type { Command } from '../types';

const initialFDSState = {
  inputCommand: '',
  history: [{id: -1, command: ''}],
};

const fileDirectorySystemSlice = createSlice({
  name: 'fileDirectorySystem',
  initialState: initialFDSState,
  reducers: {
    setInputCommand: (state: { inputCommand: string }, action: { payload: string }) => {
      state.inputCommand = action.payload;
    },
    addHistory: (state: { history: Command[] }, action: { payload: Command }) => {
      state.history = [...state.history, action.payload];
    },
    clearHistory: (state: { history: Command[] }) => {
      state.history = [];
    },
  },
});

export const fileDirectorySystemActions = fileDirectorySystemSlice.actions;

export default fileDirectorySystemSlice.reducer;
