import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { findMessagesByConversationThunk } from '../../redux/messageThunks';

const MockInboxMessage = ({ message }) => {
  const dispatch = useDispatch();
  return (
    <Link
      to={`/messages/${message.conversation}`}
      id={message.id}
      className='text-decoration-none text-white'
      onClick={() =>
        dispatch(findMessagesByConversationThunk(message.conversation))
      }
    >
      <div className='p-3' style={{ border: 'solid 1px white' }}>
        <p>Conversation Id: {message.conversation}</p>
        <p>Message: {message.message}</p>
        <p>Sender: {message.sender.name}</p>
      </div>
    </Link>
  );
};

export default MockInboxMessage;
