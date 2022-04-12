import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

const USERS_API = `${BASE_URL}/users`;

export const api = axios.create({
  withCredentials: true,
});

export const followUser = (uid, followeeId) =>
  api.post(`${USERS_API}/${uid}/follows`, {followeeId: followeeId})
  .then((response) => response.data)
  .catch((err) => err.response.data);

export const unfollowUser = (uid, followeeId) =>
  api.delete(`${USERS_API}/${uid}/follows`, {followeeId: followeeId})
  .then((response) => response.data)
  .catch((err) => err.response.data);

export const findAllFollowers = (uid) =>
    api.get(`${USERS_API}/${uid}/followers`)
    .then((response) => response.data)
    .catch((err) => err.response.data);