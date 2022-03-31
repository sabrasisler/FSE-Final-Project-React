export const processError = (err) => {
  if (err.response.data.error) {
    return err.response.data;
  }
  return { error: 'Sorry! Something went wrong.' };
};
