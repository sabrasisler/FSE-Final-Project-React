import { updateError } from './errorSlice';

export const dataOrStateError = (data, ThunkAPI) => {
  if (data.error) {
    return ThunkAPI.dispatch(updateError(data)); //update errors
  }
  ThunkAPI.dispatch(updateError({ error: '' })); //clear errors
  return data;
};
