import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    data: null,
    status: null,
  },
  reducers: {
    updateError: (state, action) => {
      state.data = action.payload.error;
    },
  },
});
export const { updateError } = errorSlice.actions;
export default errorSlice.reducer;
