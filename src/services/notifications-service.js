/**
 * @file Middle tier for notifictions resource. 
 * Provides a service to communicate with the restful API of the server.
 */

import axios from 'axios';
import { processError } from './helpers';

const NOTIFICATIONS_API = `${process.env.REACT_APP_API_URL}/notifications`;
const USERS_API = `${process.env.REACT_APP_API_URL}/users`;

export const api = axios.create({ withCredentials: true });

export const findAllNotifications = () =>
  api
    .get(NOTIFICATIONS_API)
    .then((response) => response.data)
    .catch((err) => processError(err));

/**
 * Find all the notifications for a particular user.
 * @param userId id of the user requesting the latest notifications
 * @returns {Promise<{[Notification]}>} the array of notification objects or error
 */
export const findNotificationsForUser = async (userId) => {

  try {
    const res = await api.get(`${USERS_API}/${userId}/notifications`);
    return res.data;
  } catch (err) {
    return processError(err);
  }
  // api
  //   .get(`${USERS_API}/${userId}/notifications`)
  //   .then((response) => response.data)
  //   .catch((err) => processError(err));

};

export const createNotification = (userId, type, userId2, notificationString) =>
  api
    .post(`${USERS_API}/${userId}/notifications`, { userNotified: userId, type: type, userActing: userId2, notificationString: notificationString })
    .then((response) => response.data)
    .catch((err) => processError(err));

/**
 * Update a notificaton as read.
 * @param nid id of the notification being read
 * @returns {Promise<{Notification}>} the notification object or error
 */
 export const markNotificationAsRead = async (nid) => {
    const res = await api.put(`${NOTIFICATIONS_API}/${nid}/read`);
    return res.data;
};

// export const markNotificationAsRead = (nid) =>
//   api.put(`${NOTIFICATIONS_API}/${nid}/read`, { _id: nid })
//     .then((response) => response.data).catch((err) => processError(err));

/**
 * Get all of the unread notifications for a given user
 * @param userId id of the user getting their unread notifications
 * @returns {Promise<{[Notification]}>} the list of notification objects or error
 */
 export const findUnreadNotificationsForUser = async (userId) => {

  try {
    const res = await api.get(`${USERS_API}/${userId}/notifications/unread`);
    return res.data;
  } catch (err) {
    return processError(err);
  }
};


// export const findUnreadNotificationsForUser = (userId) =>
//   api
//     .get(`${USERS_API}/${userId}/notifications/unread`)
//     .then((response) => response.data)
//     .catch((err) => processError(err));