import {
  findNotificationsForUser,
  findAllNotifications,
} from '../../services/notifications-service';
import React, { useEffect, useState, useCallback } from 'react';
import Notifications from '../../components/Notifications/index.js';
import { useSelector } from 'react-redux';
import { socket } from '../../services/socket-config';
import { AlertBox } from '../../components';

/**
 * Creates a page that displays all of the notifications for a given user
 */
const NotificationsView = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState();

  const authUser = useSelector((state) => state.user.data);

  // find all the notifications for a given user
  const findMyNotifications = useCallback(
    async () => {
      const res = await findNotificationsForUser(authUser.id);
      if (res.error) {
        return setError(
          'We ran into an issue showing your notifications. Please try again later.'
        );
      }
      console.log('notifcations res', res);
      setNotifications(res);
    },
  [authUser.id]);

  const listenForNewNotificationsOnSocket = useCallback(
    async () => {
      socket.emit('JOIN_ROOM'); // Server will assign room for user based on session.
      socket.on('NEW_NOTIFICATION', () => {
        // when a new notification is emitted to the room, find all of our notifications and refresh the state of our page
        console.log('new notification from server!');
        findMyNotifications();
      });
    },
  [findMyNotifications]);

  useEffect(() => {
    listenForNewNotificationsOnSocket();
    findMyNotifications();
  }, [listenForNewNotificationsOnSocket, findMyNotifications]);
  return (
    <div>
      <h1>Notifications</h1>
      {error && <AlertBox message={error} /> }
      <Notifications notifications={notifications} />
    </div>
  );
};
export default NotificationsView;
