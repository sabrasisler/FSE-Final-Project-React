import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { findMessagesByConversationThunk } from '../../redux/messageThunks';

const MockInboxMessage = ({ message }) => {
  const dispatch = useDispatch();
  return (
    <div style={{ border: 'solid 1px white' }}>
      <p>Conversation Id: {message.conversation}</p>
      <p>Message: {message.message}</p>
      <p>Sender: {message.sender.name}</p>

      <Link
        to={`/messages/${message.conversation}`}
        id={message.id}
        className='text-decoration-none text-black'
      >
        <button
          onClick={() =>
            dispatch(findMessagesByConversationThunk(message.conversation))
          }
        >
          Open chat
        </button>
      </Link>
    </div>
  );
};

export default MockInboxMessage;
