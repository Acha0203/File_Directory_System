import { createSlice } from '@reduxjs/toolkit';

import type { Command } from '../types';

const initialFDSState = {
  inputCommand: '',
  history: [{ id: -1, tool: '', command: '', isValid: true, result: '' }],
};

const fileDirectorySlice = createSlice({
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

export const fileDirectoryActions = fileDirectorySlice.actions;

export default fileDirectorySlice.reducer;
