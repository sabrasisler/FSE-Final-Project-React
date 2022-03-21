import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register, getProfile } from '../services/auth-service';
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
    console.log('register thunk response', res);
    return res;
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/update',
  async (user) => {
    const res = await updateUser(user);
    console.log('update thunk response', res);
    return res;
  }
);

const setUserDataOrError = (state, action) => {
  if (action.payload.error) {
    state.error = action.payload;
  } else {
    state.data = action.payload;
    state.loggedIn = true;
  }
};

const checkProfileComplete = (state) => {
  const user = state.data;
  if (!user || (user && !user.username)) {
    state.profileComplete = false;
  } else {
    state.profileComplete = true;
  }
  console.log(state.profileComplete);
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
  //     console.log('UPDATE USER: ', state);
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
  //     console.log('UPDATE ERROR', action.payload);
  //     state.error = true;
  //   },
  // },
  extraReducers: {
    [getProfileThunk.pending]: (state) => {
      state.loading = true;
    },
    [getProfileThunk.fulfilled]: (state, action) => {
      console.log('profile thunk PAYLOAD', action.payload);
      state.loading = false;
      setUserDataOrError(state, action);
      checkProfileComplete(state);
    },
    [updateUserThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateUserThunk.fulfilled]: (state, action) => {
      console.log('update user thunk PAYLOAD', action.payload);
      state.loading = false;
      setUserDataOrError(state, action);
      checkProfileComplete(state);
    },
    [registerThunk.pending]: (state) => {
      state.loading = true;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.loading = false;
      setUserDataOrError(state, action);
      checkProfileComplete(state);
    },
    // [updateUserThunk.rejected]: (state, action) => {
    //   console.log(action.data);
    //   state.loading = false; Hello123!
    // },
  },
});

export const { updateError } = userSlice.actions;
export default userSlice.reducer;
