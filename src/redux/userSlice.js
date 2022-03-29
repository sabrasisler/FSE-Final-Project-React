import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register, getProfile, login, logout } from '../services/auth-service';
import { updateUser } from '../services/users-service';
import { useDispatch } from 'react-redux';
export const getProfileThunk = createAsyncThunk(
  'users/getProfile',
  async () => {
    return await getProfile();
  }
);

export const registerThunk = createAsyncThunk(
  'users/register',
  async (user) => {
    const res = await register(user);

    return res;
  }
);

export const loginThunk = createAsyncThunk('users/login', async (user) => {
  const res = await login(user);

  return res;
});

export const logoutThunk = createAsyncThunk('users/logout', async (user) => {
  const res = await logout(user);

  return res;
});

export const updateUserThunk = createAsyncThunk(
  'users/update',
  async (user) => {
    const res = await updateUser(user);

    return res;
  }
);

const setUserDataOrError = (state, action) => {
  if (action.payload.error) {
    state.error = action.payload.error;
  } else {
    state.data = action.payload;
    state.loggedIn = true;
    checkProfileComplete(state);
  }
};

const checkProfileComplete = (state) => {
  const user = state.data;
  if (!user || (user && !user.username)) {
    state.profileComplete = false;
  } else {
    state.profileComplete = true;
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
    profileComplete: false,
    loggedIn: false,
  },
  reducers: {
    updateError: (state, action) => {
      state.error = action.payload;
    },
  },
  // pending: false,
  // error: false,
  // reducers: {
  //   updateUser: (state, action) => {
  //
  //     state = {
  //       id: '123',
  //       username: 'jsmith',
  //       name: 'John Smith',
  //       email: 'john@email.com',
  //       profilePhoto:
  //         'https://lh3.googleusercontent.com/a-/AOh14GgBPcir2Y7kATdCKuYerdtqVqtK7KGUtTGLQSFf=s96-c',
  //       followerCount: 1,
  //       followeeCount: 2,
  //       joinedDate: '01-01-1990',
  //       bio: 'This is my bio',
  //       website: 'https://google.com',
  //       ...action.payload,
  //     };
  //   },
  //   updateError: (state, action) => {
  //
  //     state.error = true;
  //   },
  // },
  extraReducers: {
    [getProfileThunk.pending]: (state) => {
      state.loading = true;
    },
    [getProfileThunk.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) return;
      setUserDataOrError(state, action);
    },
    [updateUserThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateUserThunk.fulfilled]: (state, action) => {
      state.loading = false;
      setUserDataOrError(state, action);
    },
    [registerThunk.pending]: (state) => {
      state.loading = true;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.loading = false;
      setUserDataOrError(state, action);
    },
    [loginThunk.pending]: (state) => {
      state.loading = true;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.loading = false;
      setUserDataOrError(state, action);
    },
    [loginThunk.rejected]: (state, action) => {
      state.loading = true;
    },
    [logoutThunk.pending]: (state) => {
      state.loading = true;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = undefined;
      state.profileComplete = false;
    },
    // [updateUserThunk.rejected]: (state, action) => {
    //
    //   state.loading = false; Hello123!
    // },
  },
});

export const { updateError } = userSlice.actions;
export default userSlice.reducer;
