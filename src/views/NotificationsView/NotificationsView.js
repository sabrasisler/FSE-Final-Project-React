import { findNotificationsForUser, findAllNotifications } from '../../services/notifications-service';

import React, {useEffect, useState} from 'react';
import Notifications from "../../components/Notifications/index.js";
import {useSelector} from "react-redux";


const NotificationsView = () => {
    const [notifications, setNotifications] = useState([]);
    //const [error, setError] = useState();
    const [setError] = useState();

    const authUser = useSelector((state) => state.user.data);

    const findMyNotifications = async () => {
        const res = await findNotificationsForUser(authUser.id);
        if (res.error) {
            return setError(
                'We ran into an issue showing your conversations. Please try again later.'
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
// const NotificationsView = () => {
//   const authUser = useSelector((state) => state.user.data);
//   const notifications = findAllNotifications(authUser.id);
//   return (
//     <div className='list-group'>
//       <h1>Notifications </h1>
//       <li>
//         {notifications[0].id}
//       </li>
//     </div>
//   )

// };
// export default NotificationsView;