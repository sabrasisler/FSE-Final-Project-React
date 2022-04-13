import { createAsyncThunk } from '@reduxjs/toolkit';
import * as messageAPI from '../services/messages-service-demo';
import { dataOrStateError } from './helpers';

export const findInboxMessagesThunk = createAsyncThunk(
  'messages/findInbox',
  async (data, ThunkAPI) => {
    const userId = ThunkAPI.getState().user.data.id;
    const inboxMessages = await messageAPI.findInboxMessages(userId, ThunkAPI);
    // messageAPI.listenForNewMessages(userId, ThunkAPI);
    return dataOrStateError(inboxMessages, ThunkAPI);
  }
);

export const findMessagesByConversationThunk = createAsyncThunk(
  'messages/findMessagesByConversation',
  async (conversationId, ThunkAPI) => {
    const userId = ThunkAPI.getState().user.data.id;
    const messages = await messageAPI.findMessagesByConversation(
      userId,
      conversationId
    );
    return dataOrStateError(messages, ThunkAPI);
  }
);

/**
 * Uses tuit service to crate a tuit and then makes another call to fetch all tuits to update state.
 */
export const sendMessageThunk = createAsyncThunk(
  'messages/sendMessage',
  async (messageBody, ThunkAPI) => {
    const userId = messageBody.sender;
    const conversationId = messageBody.conversationId;
    const message = messageBody.message;
    const newMessage = await messageAPI.sendMessage(
      userId,
      conversationId,
      message
    );
    console.log(newMessage);
    ThunkAPI.dispatch(findMessagesByConversationThunk(conversationId));
    // push message to front of array in state
    return dataOrStateError(newMessage, ThunkAPI);
  }
);

export const createConversationThunk = createAsyncThunk(
  'messages/createConversation',
  async (conversation, ThunkAPI) => {
    const userId = ThunkAPI.getState().user.data.id;
    const newConversation = await messageAPI.createConversation(
      userId,
      conversation
    );
    return dataOrStateError(newConversation, ThunkAPI);
  }
);
