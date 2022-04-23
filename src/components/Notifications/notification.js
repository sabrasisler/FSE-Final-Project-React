import React, { useState } from "react";
import { markNotificationAsRead } from "./../../services/notifications-service";
import { Link } from 'react-router-dom';
/**
 * A component to render one notification.
 */
const Notification = ({ notificationFromList }) => {

    const [notification, setNotification] = useState(notificationFromList);
    console.log(notification.id);

    // create a notification message depending on the type of notification
    let notificationString;
    let notificationLink;
    if (notification.type == "FOLLOWS") {
        notificationString = <span> followed you</span>
        notificationLink = <Link to={`/tuiter/${notification.userActing.id}`} >notificationString</Link>

    } else if (notification.type == "LIKES") {
        notificationString = <span> liked your tuit. </span>
        notificationLink = <Link to={`/tuiter/${notification.userNotified.id}`} >@{notification.userActing && notification.userActing.username}</Link>
    } else {
        notificationString = <span> messaged you.</span>
        notificationLink = <Link to={`/tuiter/${notification.userNotified.id}/messages`} >@{notification.userActing && notification.userActing.username}</Link>

    }

    const userActingLink = <Link to={`/tuiter/${notification.userActing.id}`} >@{notification.userActing && notification.userActing.username}</Link>



    return (
        <li className='p-2 ttr-tuit list-group-item d-flex rounded-0' >
            <div className='pe-2'>
              {notification.userActing && (
                <img
                  src={
                    notification.userActing.profilePhoto
                      ? notification.userActing.profilePhoto
                      : `../images/${notification.userActing.username}.jpg`
                  }
                  className='ttr-tuit-avatar-logo rounded-circle'
                  alt='profile'
                />
              )}
            </div>
            <div onClick={() => markNotificationAsRead(notification.id)}>
                {notification.read ? <i> {userActingLink} <span onClick={notificationLink}> {notificationString} </span> </i> : <strong> {userActingLink} {notificationString}</strong>}
            </div>
        
        </li>
    );
}

export default Notification;
