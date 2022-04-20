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
    var notificationString;
    if (notification.type == "FOLLOWS") {
        notificationString = <span> followed you</span>
    } else if (notification.type == "LIKES") {
        notificationString = <span> liked your tuit. </span>
    } else {
        notificationString = <span> messaged you.</span>
    }

    const userActingLink = <Link to={`/tuiter/${notification.userActing.id}`} >@{notification.userActing && notification.userActing.username}</Link>

    return (
        <div className='p-2 ttr-tuit list-group-item d-flex rounded-0' >
            <span onClick={() => markNotificationAsRead(notification.id)}>
                {notification.read ? <i> {userActingLink} {notificationString} </i> : <strong> {userActingLink} {notificationString}</strong>}
            </span>

        </div>
    );
}

export default Notification;
