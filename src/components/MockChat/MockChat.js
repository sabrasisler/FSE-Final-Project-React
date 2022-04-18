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

/**
 * Displays the active chat window with all its messages and send message textbox.
 * @param {string} conversationId the id of the conversation
 *
 */
const MockChat = ({ conversationId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data.id);
  const participants = useSelector(
    (state) => state.messages.activeChat.participants
  );
  const messages = useSelector((state) => state.messages.activeChat.messages);
  const hasMessages = messages.length > 0;
  const [newMessageBody, setNewMessageBody] = useState({
    sender: userId,
    conversationId,
    message: '',
  });

  const listenForNewMessagesOnSocket = () => {
    socket.emit('JOIN_ROOM');
    socket.on('NEW_MESSAGE', () => {
      // Make a REST post request to update inbox and active chat.
      dispatch(findMessagesByConversationThunk(conversationId));
    });
  };

  useEffect(() => {
    listenForNewMessagesOnSocket();
    dispatch(findMessagesByConversationThunk(conversationId));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    dispatch(sendMessageThunk(newMessageBody));
  };

  return (
    <div>
      <h3>Chat</h3>
      <Link
        to={`/messages`}
        className='mt-2 me-2 btn btn-large btn-primary border border-secondary fw-bolder rounded-pill'
      >
        <i className='fa-solid fa-circle-arrow-left text-white fs-6'></i>
        <span>Back to inbox</span>
      </Link>
      <p>Conversation id: {conversationId}</p>
      <p>
        Participants:
        {participants.map((participant) => (
          <span className='badge rounded-pill bg-light' key={participant.id}>
            {participant.name || participant.firstName}
          </span>
        ))}
      </p>
      {hasMessages ? (
        <div>
          {messages.map((message) => (
            <p key={message.id}>
              <span className='badge rounded-pill bg-warning mx-2'>
                {message.sender.name}:
              </span>
              {message.message}
            </p>
          ))}
        </div>
      ) : null}
      <form onSubmit={(e) => sendMessage(e)}>
        <FormInput
          label='send message'
          placeholder='type your message here'
          value={newMessageBody.message}
          onChange={(e) =>
            setNewMessageBody({ ...newMessageBody, message: e.target.value })
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
