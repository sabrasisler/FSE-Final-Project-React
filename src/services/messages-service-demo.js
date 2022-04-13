import axios from 'axios';
import { processError } from './helpers';

const BASE_URL = process.env.REACT_APP_API_URL;
const MESSAGES_API = `${BASE_URL}/users`;

export const api = axios.create({
  withCredentials: true,
});

export const sendMessage = async (userId, conversationId, message) => {
  try {
    const res = await api.post(
      `${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`,
      { message }
    );
    return res.data;
  } catch (err) {
    return processError(err);
  }
};

export const createConversation = async (userId, conversation) => {
  try {
    console.log('create convo service called', conversation);
    const res = await api.post(
      `${MESSAGES_API}/${userId}/conversations`,
      conversation
    );
    console.log('create convo service result', res.data);
    return res.data;
  } catch (err) {
    return processError(err);
  }
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
