import React, { useEffect } from 'react';
import { findInboxMessagesThunk } from '../../redux/messageThunks';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../services/socket-config';
import MockInboxMessage from '../MockInboxMessage/MockInboxMessage';
import { updateActiveChat } from '../../redux/messageSlice';

const MockInbox = ({ inbox }) => {
  const dispatch = useDispatch();

  const listenForNewMessages = () => {
    // Server will receive this emit request and assign a special space for this user based on their session id on the backend.
    socket.emit('JOIN_ROOM');
    // When a new message is posted on the server that matches this user as participant.
    socket.on('NEW_MESSAGE', () => {
      console.log('new message from server!');
      // Make a REST post request to update inbox and active chat.
      dispatch(findInboxMessagesThunk());
      // dispatch(updateActiveChat());
    });
  };

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
