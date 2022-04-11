export const processError = (err) => {
  console.log('ooops error in process error', err);
  if (err.response.data.error) {
    return err.response.data;
  }
  return { error: 'Sorry! Something went wrong.' };
};
