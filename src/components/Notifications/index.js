import React from 'react';
//import './Notification.css';
import Notification from './notification.js';
import { markNotificationAsRead } from '../../services/notifications-service.js';

/**
 * @File A container to display a list of notifications.
 */
const Notifications = ({ notifications }) => {
    return (
        <div>
            <ul className='ttr-tuits list-group'>
                {notifications &&
                    notifications.map((notification) => {
                        return <Notification key={notification.id} notificationFromList={notification} />})
                    }
            </ul>
        </div>
    );
};

export default Notifications;


