import axios from 'axios';

const TUITS_API = `${process.env.REACT_APP_API_URL}/tuits`;
const USERS_API = `${process.env.REACT_APP_API_URL}/users`;

export const api = axios.create({ withCredentials: true });

export const findAllTuits = () =>
  api.get(TUITS_API).then((response) => response.data);

export const findTuitById = (tuitId) =>
  api.get(`${TUITS_API}/${tuitId}`).then((response) => response.data);

export const findTuitsByUser = (userId) =>
  api
    .get(`${USERS_API}/${userId}/tuits`)
    .then((response) => response.data)
    .catch((err) => err.response.data);

export const createTuit = (userId, tuit) =>
  api
    .post(`${USERS_API}/${userId}/tuits`, tuit)
    .then((response) => response.data);

export const updateTuit = (tuitId, tuit) =>
  api.post(`${TUITS_API}/${tuitId}`, tuit).then((response) => response.data);

export const deleteTuit = (tuitId) =>
  api.delete(`${TUITS_API}/${tuitId}`).then((response) => response.data);
