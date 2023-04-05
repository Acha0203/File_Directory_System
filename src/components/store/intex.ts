import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import fileDirectorySystemReducer from './fileDirectorySystem';

const store = configureStore({
  reducer: {
    fileDirectorySystem: fileDirectorySystemReducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
