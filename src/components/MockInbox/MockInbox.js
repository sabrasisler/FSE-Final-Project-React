import React, { useEffect } from 'react';
import { findInboxMessagesThunk } from '../../redux/messageThunks';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../services/messages-service-demo';
import MockInboxMessage from '../MockInboxMessage/MockInboxMessage';
import { updateActiveChat } from '../../redux/messageSlice';

const MockInbox = () => {
  const inbox = useSelector((state) => state.messages.inbox);
  const dispatch = useDispatch();

  const listenForNewMessages = () => {
    socket.emit('JOIN_ROOM');
    socket.once('NEW_MESSAGE', () => {
      dispatch(findInboxMessagesThunk());
      dispatch(updateActiveChat());
    });
  };
  useEffect(() => {
    dispatch(findInboxMessagesThunk());
  }, [dispatch]);

  useEffect(() => {
    listenForNewMessages();
  }, []);

  return (
    <div>
      {inbox ? (
        inbox.map((message) => (
          <MockInboxMessage message={message} key={message.id} />
        ))
      ) : (
        <p>Empty inbox</p>
      )}
    </div>
  );
};

export default MockInbox;
