import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MockInboxMessage from '../MockInboxMessage/MockInboxMessage';
import { Routes, Route } from 'react-router-dom';
import MockInbox from '../MockInbox/MockInbox';
import MockChat from '../MockChat/MockChat';
import { findInboxMessagesThunk } from '../../redux/messageThunks';

const MockMessagesView = () => {
  const inbox = useSelector((state) => state.messages.inbox);
  const activeChat = useSelector((state) => state.messages.activeChat);
  console.log(activeChat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findInboxMessagesThunk());
  }, []);
  return (
    <div>
      <h5>Mock Messages View!</h5>
      <p>Styling needed. Click any conversation to open up chat.</p>
      <Routes>
        <Route exact path={`/`} element={<MockInbox inbox={inbox} />} />
        <Route
          exact
          path={`/${activeChat.id}`}
          element={<MockChat conversationId={activeChat.id} />}
        />
        {inbox
          ? inbox.map((message) => (
              <Route
                key={message.id}
                path={`/${message.conversation}`}
                element={<MockChat conversationId={message.conversation} />}
              ></Route>
            ))
          : null}
      </Routes>
    </div>
  );
};

export default MockMessagesView;
