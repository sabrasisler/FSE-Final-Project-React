import axios from 'axios';
import {processError} from './helpers';

const MESSAGES_API = `${process.env.REACT_APP_API_URL}/`;

export const api = axios.create({withCredentials: true});

export const findLatestMessagesByUser = (userId) =>
    api
        .get(`${MESSAGES_API}/${userId}/messages`)
        .then((response) => response.data)
        .catch((err) => processError(err));
