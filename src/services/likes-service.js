import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${process.env.REACT_APP_API_URL}/users`;
const TUITS_API = `${process.env.REACT_APP_API_URL}/tuits`;

export const api = axios.create({
  withCredentials: true,
});

export const findAllTuitsLikedByUser = (userId) =>
  api
    .get(`${USERS_API}/${userId}/likes`)
    .then((response) => response.data)
    .catch((err) => err.response.data);

export const findAllTuitsDislikedByUser = (userId) =>
  api
    .get(`${USERS_API}/${userId}/dislikes`)
    .then((response) => response.data)
    .catch((err) => err.response.data);

export const findAllUsersThatLikedTuit = (tid) =>
  api.get(`${TUITS_API}/${tid}/likes`).then((response) => response.data);

export const userLikesTuit = (userId, tuitId) => {
  console.log('triggered original');
  return api
    .post(`${USERS_API}/${userId}/tuits/${tuitId}/likes`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const userDislikesTuit = (userId, tuitId) =>
  api
    .post(`${USERS_API}/${userId}/tuits/${tuitId}/dislikes`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
