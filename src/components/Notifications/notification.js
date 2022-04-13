import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { markNotificationAsRead } from "./../../services/notifications-service";

const Notification = ({ notificationFromList }) => {

    const [notification, setNotification] = useState(notificationFromList);
    console.log(notification.id);
    const userId = useSelector((state) => state.user.data.id);
    // const dispatch = useDispatch();
    const handleViewNotification = async (cid) => {
        // TODO
    };
    // const handleReadNotification = async () => {
    //     const resNot = await markNotificationAsRead(notification.id);
    //     if (resNot && resNot.error) {
    //       return;
    //     }
    
    //     // updateLiked(resTuit);
    //     setNotification({ ...notification, ...resNot });
    //     //setClassWithTimeout(setAnimationClass, 'fs-6 ttr-heart-animated fa-pulse');
    //     return;
    //   };

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
