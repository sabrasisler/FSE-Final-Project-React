import { findNotificationsForUser, findAllNotifications } from '../../services/notifications-service';

import React, {useEffect, useState} from 'react';
import Notifications from "../../components/Notifications/index.js";
import {useSelector} from "react-redux";

/**
 * Creates a page that displays all of the notifications for a given user 
 */
const NotificationsView = () => {
    const [notifications, setNotifications] = useState([]);
    const [setError] = useState();

    const authUser = useSelector((state) => state.user.data);

    // find all the notifications for a given user
    const findMyNotifications = async () => {
        const res = await findNotificationsForUser(authUser.id);
        if (res.error) {
            return setError(
                'We ran into an issue showing your notifications. Please try again later.'
            );
        }
        setNotifications(res);
    };
    useEffect(() => {
        findMyNotifications();
    }, []);
    return (
        <div>
            <h1>Notifications</h1>
            <Notifications notifications={notifications}/>
        </div>
    );
};
export default NotificationsView;