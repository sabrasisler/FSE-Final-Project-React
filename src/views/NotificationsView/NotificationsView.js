import {
  findNotificationsForUser
} from '../../services/notifications-service';
import React, { useEffect, useState } from 'react';
import Notifications from '../../components/Notifications/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../services/socket-config';
import { setNotifications } from '../../redux/userSlice';

/**
 * Creates a page that displays all of the notifications for a given user
 */
const NotificationsView = () => {
  const notifications = useSelector((state) => state.user.notifications);
  const [setError] = useState();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.user.data);

  // find all the notifications for a given user
  const findMyNotifications = async () => {
    const res = await findNotificationsForUser(authUser.id);
    if (res.error) {
      return setError(
        'We ran into an issue showing your notifications. Please try again later.'
      );
    }
    dispatch(setNotifications(res));
  };

  const listenForNewNotificationsOnSocket = async () => {
    socket.emit('JOIN_ROOM'); // Server will assign room for user based on session.
    socket.on('NEW_NOTIFICATION', () => {
      // when a new notification is emitted to the room, find all of our notifications and refresh the state of our page
      findMyNotifications();
    });
  };

  useEffect(() => {
    listenForNewNotificationsOnSocket();
    findMyNotifications();
  }, []);
  return (
    <div>
      <h1>Notifications</h1>
      <Notifications notifications={notifications} />
    </div>
  );
};
export default NotificationsView;
