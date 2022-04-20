import React, { useState } from "react";
import { markNotificationAsRead } from "./../../services/notifications-service";

/**
 * A component to render one notification.
 */
const Notification = ({ notificationFromList }) => {

    const [notification, setNotification] = useState(notificationFromList);
    console.log(notification.id);

    // create a notification message depending on the type of notification
    let notificationString;
    switch (notification.type) {
        case "FOLLOWS":
            notificationString = <span> followed you</span>
        case "LIKES":
            notificationString = <span> liked your tuit. </span>
        case "MESSAGES":
            notificationString = <span> messaged you.</span>
        default:
            console.log("Notification Type is invalid");
    }

    return (
        <div className='p-2 ttr-tuit list-group-item d-flex rounded-0' >
            <span onClick={() => markNotificationAsRead(notification.id)}>
                {notification.read ? <i> {notification.userActing.username} {notificationString} </i> : <strong> {notification.userActing.username} {nstring}</strong>}
            </span>

        </div>
    );
}

export default Notification;
