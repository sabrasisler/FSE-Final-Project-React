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
    let notificationLink;
    if (notification.type == "FOLLOWS") {
        notificationLink = <Link className='text-decoration-none text-white' to={`/tuiter/${notification.userActing.id}/tuits`} > followed you. </Link>
    } else if (notification.type == "LIKES") {
        notificationLink = <Link className='text-decoration-none text-white' to={`/tuiter/${notification.userNotified.id}/tuits`} > liked your tuit. </Link>
    } else {
        notificationLink = <Link className='text-decoration-none text-white' to={`/messages`}> messaged you. </Link>
    }

    const userActingLink = <Link to={`/tuiter/${notification.userActing.id}`} >@{notification.userActing && notification.userActing.username}</Link>
   
    let boxColor;
    if (notification.read) {
        boxColor = 'black'
    } else {
        boxColor = '#0f2d3c'
    }


    return (
        <li className={'p-2 list-group-item d-flex rounded-0'} onClick={() => markNotificationAsRead(notification.id)} ref={(el) => {
            if (el) {
                el.style.setProperty('background-color', boxColor, 'important');
            }
        
        }}>
            <div className= 'pe-2'>
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
            <div>
                {notification.read ? <span> {userActingLink} {notificationLink} </span> : <strong> {userActingLink} {notificationLink}</strong>}
            </div>
        </li>
    );
}

export default Notification;
