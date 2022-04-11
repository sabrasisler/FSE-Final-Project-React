import { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { EVENTS } from './events';

const socket = io(process.env.REACT_APP_API_URL);
const SocketContext = createContext({ socket });

const ChatSocketProvider = (props) => {
  const user = useSelector((state) => state.user.data);
  const [inbox, setInbox] = useState([]);
  const [activeChatId, setActiveChatId] = useState('');
  const [activeChat, setActiveChat] = useState([]);

  socket.on(EVENTS.SERVER.NEW_MESSAGE, (message) => {
    setInbox([...inbox, message]);
    activeChat([...activeChat, message]);
  });

  return (
    <SocketContext.Provider
      value={{ user, socket, inbox, activeChat }}
      {...props}
    />
  );
};

export const useSocket = () => useContext(SocketContext);
export default ChatSocketProvider;
