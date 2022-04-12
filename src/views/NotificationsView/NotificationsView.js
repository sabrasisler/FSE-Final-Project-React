import React from 'react';
import { findAllNotifications } from '../../services/notifications-service';
import { useSelector } from 'react-redux';


const NotificationsView = () => {
  const authUser = useSelector((state) => state.user.data);
  const notifications = findAllNotifications(authUser.id);
  return (
    <div className='list-group'>
      <h1>Notifications </h1>
      {notifications.map((not) => {
        return (
          <p>
            "Hello"
          </p>
        );
      })}
    </div>
  )

};
export default NotificationsView;

{/* // return (
  // <div>
  //   <h1>
  //     "Notifications"
  //   </h1>
  // <li>
  // "Hello"  </li>
  // </div>
  // ) */}