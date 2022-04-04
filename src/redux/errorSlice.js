import { createSlice } from '@reduxjs/toolkit';
/**
 * Handles global error state for the app. Used to display error messages in higher level parent components.
 */
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
