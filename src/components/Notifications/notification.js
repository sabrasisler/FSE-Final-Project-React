import React, { useState } from "react";
import { markNotificationAsRead } from "./../../services/notifications-service";

/**
 * A component to render one notification.
 */
const Notification = ({ notificationFromList }) => {
    const [notification] = useState(notificationFromList);

    // create a notification message depending on the type of notification
    var notificationString;
    if (notification.type === "FOLLOWS") {
        notificationString = <span> followed you</span>
    } else if (notification.type === "LIKES") {
        notificationString = <span> liked your tuit. </span>
    } else {
        notificationString = <span> messaged you.</span>
    }
    return (
        <div className='p-2 ttr-tuit list-group-item d-flex rounded-0' >
            <span onClick={() => markNotificationAsRead(notification.id)}>
                {notification.read ? <i> {notification.userActing.username} {notificationString} </i> : <strong> {notification.userActing.username} {notificationString}</strong>}
            </span>

        </div>
    );
}

export default Notification;
