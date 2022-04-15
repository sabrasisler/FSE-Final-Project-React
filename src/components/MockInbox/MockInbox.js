import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findInboxMessagesThunk } from '../../redux/messageThunks';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../services/socket-config';
import MockInboxMessage from '../MockInboxMessage/MockInboxMessage';
import { PopupModal } from '../../components';
import FindUsers from '../FindUsers/FindUsers';
import { setGlobalError } from '../../redux/errorSlice';
import { setActiveChat } from '../../redux/messageSlice';
import { createConversation as APIcreateConversation } from '../../services/messages-service';
/**
 * Displays all the inbox messages of the logged in user.
 * @param {[]} inbox all inbox messages
 */
const MockInbox = ({ inbox = [] }) => {
  const loggedInUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newConversationUsers, setNewConversationUsers] = useState([]);
  let navigateToChatView = useNavigate();

  const listenForNewMessagesOnSocket = () => {
    socket.emit('JOIN_ROOM'); // Server will assign room for user based on session.
    socket.on('NEW_MESSAGE', () => {
      // when a new message is emitted to the room
      console.log('new message from server!');
      dispatch(findInboxMessagesThunk()); // Fetch fresh inbox.
    });
  };

  const createNewConversation = async () => {
    const conversation = {
      createdBy: loggedInUser.id,
      participants: newConversationUsers.map((user) => user.id),
    };
    const newConversation = await APIcreateConversation(
      loggedInUser,
      conversation
    );
    if (newConversation.error) {
      return dispatch(setGlobalError(newConversation.error));
    }
    dispatch(setActiveChat(newConversation));
    navigateToChatView(`/messages/${newConversation.id}`, {
      replace: true,
    });
  };

  useEffect(() => {
    listenForNewMessagesOnSocket();
  }, []);

  const newMessageModalProps = {
    content: {
      size: 'md',
      title: 'New Message',
      body: (
        <FindUsers
          selectedUsers={newConversationUsers}
          setSelectedUsers={setNewConversationUsers}
        />
      ),
      submitLabel: 'Next',
    },
    show: showNewMessageModal,
    setShow: setShowNewMessageModal,
    handleSubmit: createNewConversation,
  };

  return (
    <div>
      <button
        onClick={() => setShowNewMessageModal(true)}
        className='mt-2 me-2 btn btn-large btn-primary border border-secondary fw-bolder rounded-pill'
      >
        <span>New message</span>
      </button>
      {inbox ? (
        inbox.map((message) => (
          <MockInboxMessage message={message} key={message.id} />
        ))
      ) : (
        <p>Empty inbox</p>
      )}
      <PopupModal props={newMessageModalProps} />
    </div>
  );
};

export default MockInbox;
