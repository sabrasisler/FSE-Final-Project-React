import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { markNotificationAsRead } from "./../../services/notifications-service";

/**
 * A component to render one notification.
 */
const Notification = ({ notificationFromList }) => {

    const [notification, setNotification] = useState(notificationFromList);
    console.log(notification.id);

    // create a notification message depending on the type of notification
    var nstring;
    if (notification.type == "FOLLOWS") {
        nstring = <span> followed you</span>
    } else if (notification.type == "LIKES") {
        nstring = <span> liked your tuit. </span>
    } else {
        nstring = <span> messaged you.</span>
    }


    return (
        <div className='p-2 ttr-tuit list-group-item d-flex rounded-0' >
            <span onClick={() => markNotificationAsRead(notification.id)}>
                {notification.read ? <i> {notification.userActing.username} {nstring} </i> : <strong> {notification.userActing.username} {nstring}</strong>}
            </span>

        </div>
    );
}

export default Notification;
