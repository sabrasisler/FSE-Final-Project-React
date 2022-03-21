import axios from 'axios';
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com/api";
const BASE_URL = 'http://localhost:4000/api';

const LOGIN_API = `${BASE_URL}/login`;
const USERS_API = `${process.env.REACT_APP_API_URL}/users`;

export const api = axios.create({
  withCredentials: true,
});

export const createUser = (user) =>
  api.post(`${USERS_API}`, user).then((response) => response.data);

export const updateUser = (user) =>
  api
    .put(`${USERS_API}/${user.id}`, user)
    .then((response) => response.data.body)
    .catch((err) => err.response.data);

export const findAllUsers = () =>
  api.get(USERS_API).then((response) => {
    return response.data;
  });

export const findUserById = (uid) =>
  api.get(`${USERS_API}/${uid}`).then((response) => response.data);

export const deleteUser = (uid) =>
  api.delete(`${USERS_API}/${uid}`).then((response) => response.data);

export const deleteUsersByUsername = (username) =>
  api
    .get(`${USERS_API}/username/${username}/delete`)
    .then((response) => response.data);

export const findUserByCredentials = (credentials) =>
  api.post(`${LOGIN_API}`, credentials).then((response) => response.data);

const service = {
  findAllUsers,
};

export default service;
