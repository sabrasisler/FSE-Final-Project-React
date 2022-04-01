import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  findAllTuits,
  createTuit,
  deleteTuit,
} from '../services/tuits-service';
import { updateError } from './errorSlice';
import { dataOrStateError } from './helpers';

export const findAllTuitsThunk = createAsyncThunk(
  'tuits/findAllTuits',
  async (data, ThunkAPI) => {
    const tuits = await findAllTuits();
    return dataOrStateError(tuits, ThunkAPI);
  }
);

export const createTuitThunk = createAsyncThunk(
  'tuits/createTuit',
  async ({ userId, tuit }, ThunkAPI) => {
    const newTuit = await createTuit(userId, tuit);
    ThunkAPI.dispatch(findAllTuitsThunk());
    return dataOrStateError(newTuit, ThunkAPI);
  }
);

export const deleteTuitThunk = createAsyncThunk(
  'tuits/deleteTuit',
  async (tuitId, ThunkAPI) => {
    const newTuit = await deleteTuit(tuitId);
    ThunkAPI.dispatch(findAllTuitsThunk());
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
    [deleteTuitThunk.pending]: (state) => {
      state.loading = true;
    },
    [deleteTuitThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteTuitThunk.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default tuitSlice.reducer;
