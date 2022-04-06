import axios from 'axios';
import {processError} from './helpers';

const MESSAGES_API = `${process.env.REACT_APP_API_URL}/`;

export const api = axios.create({withCredentials: true});

export const findLatestMessagesByUser = (userId) =>
    api
        .get(`${MESSAGES_API}/${userId}/messages`)
        .then((response) => response.data)
        .catch((err) => processError(err));

export const findAllMessagesSentByUser = (userId) =>
    api
        .get(`${MESSAGES_API}/${userId}/messages/sent`)
        .then((response) => response.data)
        .catch((err) => processError(err));

export const findAllMessagesByConversation = (userId, conversationId) =>
    api
        .get(`${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`)
        .then((response) => response.data)
        .catch((err) => processError(err));

export const createConversation = (userId, conversationId, conversation) =>
    api
        .post(`${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`, {conversation: conversation})
        .then((response) => response.data)
        .catch((err) => processError(err));

export const createMessage = (userId, message) =>
    api
        .post(`${MESSAGES_API}/${userId}/messages`, {message: message})
        .then((response) => response.data)
        .catch((err) => processError(err));

export const deleteMessage = (userId, messageId) =>
    api
        .delete(`${MESSAGES_API}/${userId}/messages/${messageId}`)
        .then((response) => response.data)
        .catch((err) => processError(err));

export const deleteConversation = (userId, conversationId) =>
    api
        .delete(`${MESSAGES_API}/${userId}/conversations/${conversationId}`)
        .then((response) => response.data)
        .catch((err) => processError(err));