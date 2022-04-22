import React from 'react';
import './navigation.css';
import { useLocation, Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import { useState, useEffect } from 'react';

import { findUnreadNotificationsForUser } from '../../services/notifications-service';

/**
 * Displays the main navigation menu of the app.
 */
function Navigation() {
  const { pathname } = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [setError] = useState();

  const authUser = useSelector((state) => state.user.data);

  // find all the unread notifications for a given user
  const findUnreadNotifications = async () => {
      const res = await findUnreadNotificationsForUser(authUser.id);
      if (res.error) {
          return setError(
              'We ran into an issue. Please try again later.'
          );
      }
      setNotifications(res);
  };
  useEffect(() => {
    findUnreadNotifications();
  }, []);


  //const userNotifications = await findUnreadNotificationsForUser(authUser.id);
  let notificationColor;
  console.log(notifications);
  if (notifications.length > 0) {
    notificationColor = '#2a9fd6'
    console.log(" HAVE UNREAD NOTIFICATIONS");
  } else {
    notificationColor = 'white'
    console.log(" no unread notifications");
  }

  const links = [
    { label: 'Tuiter', icon: 'fa-square-t', path: '/tuiter', color: 'white'},
    { label: 'Home', icon: 'fa-home', path: '/home',  color: 'white'},
    { label: 'Explore', icon: 'fa-hashtag', path: '/explore',  color: 'white' },
    { label: 'Notifications', icon: "fa-bell", path: '/notifications',  color: notificationColor},
    { label: 'Messages', icon: 'fa-envelope', path: '/messages' ,  color: 'white'},
    { label: 'Bookmarks', icon: 'fa-bookmark', path: '/bookmarks',  color: 'white'},
    { label: 'Lists', icon: 'fa-list', path: '/lists',  color: 'white' },
    { label: 'Profile', icon: 'fa-user', path: '/profile/my-tuits' ,  color: 'white'},
    { label: 'More', icon: 'fa-circle-ellipsis', path: '/more' ,  color: 'white'},
  ];

  return (
    <div className='ttr-navigation'>
      <ul className='list-group'>
        {links.map((link, ndx) => {
          return (
            <li
              key={ndx}
              className={`list-group-item border-0 ttr-font-size-150pc text-nowrap
         ${pathname.indexOf(link.path) >= 0 ? 'fw-bold' : ''}`}
            >
              <Link
                to={link.path}
                id={link.label}
                className='text-decoration-none text-black'
              >
                <i className={`fa ${link.icon} text-center`} style={{color:link.color}}></i>
                <span className='ttr-label'>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* <button className='mt-3 btn btn-lg btn-primary rounded-pill w-100 fw-bold text-white'>
        Tuit
      </button> */}
    </div>
  );
}

export default Navigation;
