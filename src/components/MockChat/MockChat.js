import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { findMessagesByConversationThunk } from '../../redux/messageThunks';
import { Link } from 'react-router-dom';

const MockChat = ({ conversationId }) => {
  const messages = useSelector((state) => state.messages.activeChat.messages);
  const hasMessages = messages.length > 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findMessagesByConversationThunk(conversationId));
  }, []);

  return (
    <div>
      <h3>Mock Chat: </h3>
      <Link to={`/messages`} className='text-decoration-none text-black'>
        <button>Back to inbox</button>
      </Link>
      {hasMessages ? (
        <div>
          <p>Conversation id: {conversationId}</p>
          <div>
            {messages.map((message) => (
              <p key={message.id}>
                <span>{message.sender.name}: </span>
                {message.message}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MockChat;
