import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
const CLIENT_URL = process.env.CLIENT_URL;

export const socket = io(`${SOCKET_URL}`, {
  cors: {
    origin: CLIENT_URL,
  },
});