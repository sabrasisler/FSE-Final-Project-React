import io from 'socket.io-client';
import { EVENTS } from '../context/events';
import axios from 'axios';
import { processError } from './helpers';

const BASE_URL = process.env.REACT_APP_API_URL;
const MESSAGES_API = `${BASE_URL}/users`;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
const CLIENT_URL = process.env.CLIENT_URL;

const createSocket = () => {
  const socket = io(`${SOCKET_URL}`, {
    cors: {
      origin: CLIENT_URL,
    },
  });

  socket.on('connect', () => {
    console.log(`Client socket connect at id: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client socket disconnected at id: ${socket.id}`);
  });
  return socket;
};

export const socket = io(`${SOCKET_URL}`, {
  cors: {
    origin: CLIENT_URL,
  },
});

export const api = axios.create({
  withCredentials: true,
});

export const sendMessage = (userId, conversationId, message) => {
  api
    .post(`${MESSAGES_API}/${userId}/conversations/${conversationId}`, message)
    .then((response) => response.data)
    .catch((err) => processError(err));
};

export const findInboxMessages = async (userId, ThunkAPI) => {
  try {
    const res = await api.get(`${MESSAGES_API}/${userId}/messages/`);
    return res.data;
  } catch (err) {
    return processError(err);
  }
};

export const findMessagesByConversation = async (userId, conversationId) => {
  try {
    const res = await api.get(
      `${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`
    );
    return res.data;
  } catch (err) {
    return processError(err);
  }
};
