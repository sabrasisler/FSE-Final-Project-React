import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tuitReducer from './tuitSlice';
import errorSlice from './errorSlice';
export default configureStore({
  reducer: {
    error: errorSlice,
    user: userReducer,
    tuits: tuitReducer,
  },
});
