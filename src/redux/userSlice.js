import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register, getProfile, login, logout } from '../services/auth-service';
import { updateUser } from '../services/users-service';
import { dataOrStateError } from './helpers';

export const getProfileThunk = createAsyncThunk(
  'users/getProfile',
  async (data, ThunkAPI) => {
    const profile = await getProfile();
    return dataOrStateError(profile, ThunkAPI);
  }
);

export const registerThunk = createAsyncThunk(
  'users/register',
  async (user, ThunkAPI) => {
    const res = await register(user);
    return dataOrStateError(res, ThunkAPI);
  }
);

export const loginThunk = createAsyncThunk(
  'users/login',
  async (user, ThunkAPI) => {
    const res = await login(user);
    return dataOrStateError(res, ThunkAPI);
  }
);

export const logoutThunk = createAsyncThunk(
  'users/logout',
  async (user, ThunkAPI) => {
    const res = await logout(user);
    return dataOrStateError(res, ThunkAPI);
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/update',
  async (user, ThunkAPI) => {
    const res = await updateUser(user);

    return dataOrStateError(res, ThunkAPI);
  }
);

const checkProfileComplete = (state, user) => {
  if (!user || (user && !user.username)) {
    state.profileComplete = false;
  } else {
    state.data = user;
    state.profileComplete = true;
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    profileComplete: false,
    loggedIn: false,
  },

  extraReducers: {
    [getProfileThunk.pending]: (state) => {
      state.loading = true;
    },
    [getProfileThunk.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) return;
      checkProfileComplete(state, action.payload);
    },
    [getProfileThunk.rejected]: (state) => {
      state.loading = false;
    },
    [updateUserThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateUserThunk.fulfilled]: (state, action) => {
      state.loading = false;
      checkProfileComplete(state, action.payload);
    },
    [registerThunk.pending]: (state) => {
      state.loading = true;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.loading = false;
      checkProfileComplete(state, action.payload);
    },
    [loginThunk.pending]: (state) => {
      state.loading = true;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.loading = false;
      checkProfileComplete(state, action.payload);
    },
    [loginThunk.rejected]: (state, action) => {
      state.loading = false;
    },
    [logoutThunk.pending]: (state) => {
      state.loading = true;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = null;
      state.profileComplete = false;
    },
    [logoutThunk.rejected]: (state) => {
      state.loading = false;
      state.data = null;
      state.profileComplete = false;
    },
  },
});

export default userSlice.reducer;
