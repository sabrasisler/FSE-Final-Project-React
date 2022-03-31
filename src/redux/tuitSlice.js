import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { findAllTuits, createTuit } from '../services/tuits-service';
import { updateError } from './errorSlice';
import { dataOrStateError } from './helpers';

export const findAllTuitsThunk = createAsyncThunk(
  'tuits/findAllTuits',
  async (data, ThunkAPI) => {
    const tuits = await findAllTuits();
    // return dataOrStateError(tuits, ThunkAPI);
    return tuits;
  }
);

export const createTuitThunk = createAsyncThunk(
  'tuits/createTuit',
  async ({ userId, tuit }, ThunkAPI) => {
    const newTuit = await createTuit(userId, tuit);
    return dataOrStateError(newTuit, ThunkAPI);
  }
);

const tuitSlice = createSlice({
  name: 'tuits',
  initialState: {
    list: null,
    loading: false,
    error: null,
  },
  reducers: {
    updateError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [findAllTuitsThunk.pending]: (state) => {
      state.loading = true;
    },
    [findAllTuitsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
      console.log('from slice', state.list);
    },
    [findAllTuitsThunk.rejected]: (state, action) => {
      console.log('from slice rejected');
      state.loading = false;
    },
    [createTuitThunk.pending]: (state) => {
      state.loading = true;
    },
    [createTuitThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createTuitThunk.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default tuitSlice.reducer;
