<<<<<<< HEAD
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
export const findConversation = async (userId, conversationId) => {
  try {
    const res = await api.get(
      `${MESSAGES_API}/${userId}/conversations/${conversationId}`
    );
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
=======
/**
 * Service to consume messages APIs for personal and group messaging between users.
 */
import axios from 'axios';
import {processError} from './helpers';

const MESSAGES_API = `${process.env.REACT_APP_API_URL}/users`;

export const api = axios.create({withCredentials: true});

/**
 * Finds the latest messages per conversation for the specified user.
 * This corresponds what the messages inbox is, where the latest messages are by
 * conversation regardless of who sent the last message per conversation.
 * Uses the mongo aggregate functionality to filter and sort through conversations/messages
 * and to format the returned output.
 * @param userId id of the user requesting the latest messages
 * @returns {Promise<AxiosResponse<any> | * | {error: string}>} latest messages per conversation
 */
export const findLatestMessagesByUser = (userId) =>
    api
        .get(`${MESSAGES_API}/${userId}/messages`)
        .then((response) => response.data)
        .catch((err) => processError(err));

/**
 * Finds all the messages sent by the specified user.
 * @param userId id of the user requesting the latest messages
 * @returns {Promise<AxiosResponse<any> | * | {error: string}>} all messages sent by user
 */
export const findAllMessagesSentByUser = (userId) =>
    api
        .get(`${MESSAGES_API}/${userId}/messages/sent`)
        .then((response) => response.data)
        .catch((err) => processError(err));

/**
 * Find all messages for conversation for the specified user and conversation ids.
 * Also check if user if indeed a participant in the conversation for security reasons.
 * @param userId id of the user requesting the latest messages
 * @param conversationId the id of the conversation
 * @returns {Promise<AxiosResponse<any> | * | {error: string}>} messages in the conversation
 */
export const findAllMessagesByConversation = (userId, conversationId) =>
    api
        .get(`${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`)
        .then((response) => response.data)
        .catch((err) => processError(err));

/**
 * Create a conversation document.
 * @param userId id of the user requesting the latest messages
 * @param conversationId sorted concatenation of all participant ids
 * @param conversation conversation object
 * @returns {Promise<AxiosResponse<any> | * | {error: string}>} conversation object
 */
export const createConversation = (userId, conversationId, conversation) =>
    api
        .post(`${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`, {conversation: conversation})
        .then((response) => response.data)
        .catch((err) => processError(err));

/**
 * Create a new message for an existing conversation by using the existing
 * id of the conversation this message belongs to. Also interact with the
 * ConversationModel to check if sender is a participant in the conversation.
 * If so, then call the MessageModel to create the message.
 * @param userId id of the user requesting the latest messages
 * @param conversation conversation object
 * @param message messages object
 * @returns {Promise<AxiosResponse<any> | * | {error: string}>} message object
 */
export const createMessage = (userId, conversation, message) =>
    api
        .post(`${MESSAGES_API}/${userId}/messages`, {message: message, conversation: conversation})
        .then((response) => response.data)
        .catch((err) => processError(err));

/**
 * Remove a message for a particular user by finding the message in the database,
 * and placing the user id in the array of removedFor. The message is not technically deleted,
 * and the user is placed in the array of people for whom the message is no longer visible.
 * @param userId id of the user requesting the latest messages
 * @param messageId id of the message
 * @returns {Promise<AxiosResponse<any> | * | {error: string}>} deleted message
 */
export const deleteMessage = (userId, messageId) =>
    api
        .delete(`${MESSAGES_API}/${userId}/messages/${messageId}`)
        .then((response) => response.data)
        .catch((err) => processError(err));

/**
 * Remove a conversation between user(s)
 * @param userId id of the user requesting the latest messages
 * @param conversationId id of the conversation
 * @returns {Promise<AxiosResponse<any> | * | {error: string}>} deleted conversation
 */
export const deleteConversation = (userId, conversationId) =>
    api
        .delete(`${MESSAGES_API}/${userId}/conversations/${conversationId}`)
        .then((response) => response.data)
        .catch((err) => processError(err));
>>>>>>> 2be676006d8faace1a4e5ae8d9af0b0844bec025
