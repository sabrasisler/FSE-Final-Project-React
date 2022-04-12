import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  findMessagesByConversationThunk,
  sendMessageThunk,
} from '../../redux/messageThunks';
import { Link } from 'react-router-dom';
import { FormInput } from '../../forms';
import { socket } from '../../services/socket-config';

const MockChat = ({ conversationId }) => {
  const userId = useSelector((state) => state.user.data.id);
  const messages = useSelector((state) => state.messages.activeChat.messages);
  const hasMessages = messages.length > 0;
  const dispatch = useDispatch();
  const [messageBody, setMessageBody] = useState({
    sender: userId,
    conversationId,
    message: '',
  });

  const listenForNewMessages = () => {
    socket.emit('JOIN_ROOM');
    socket.on('NEW_MESSAGE', () => {
      console.log('new message from server!');
      // Make a REST post request to update inbox and active chat.
      dispatch(findMessagesByConversationThunk(conversationId));
    });
  };

  useEffect(() => {
    listenForNewMessages();
  }, []);

  useEffect(() => {
    dispatch(findMessagesByConversationThunk(conversationId));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    dispatch(sendMessageThunk(messageBody));
  };

  return (
    <div>
      <h3>Mock Chat: </h3>
      <Link
        to={`/messages`}
        className='mt-2 me-2 btn btn-large btn-primary border border-secondary fw-bolder rounded-pill'
      >
        <i className='fa-solid fa-circle-arrow-left text-white fs-6'></i>
        <span>Back to inbox</span>
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
      <form onSubmit={(e) => sendMessage(e)}>
        <FormInput
          label='send message'
          placeholder='type your message here'
          value={messageBody.message}
          onChange={(e) =>
            setMessageBody({ ...messageBody, message: e.target.value })
          }
        />
        <button
          type='submit'
          className='mt-2 me-2 btn btn-large btn-primary border border-secondary fw-bolder rounded-pill'
        >
          Send message
        </button>
      </form>
    </div>
  );
};

export default MockChat;
