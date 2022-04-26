import React from 'react';
import './navigation.css';
import { useLocation, Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import { useState, useEffect } from 'react';
import { AlertBox } from '../../components';

import { findUnreadNotificationsForUser } from '../../services/notifications-service';

/**
 * Displays the main navigation menu of the app.
 */
function Navigation() {
  const { pathname } = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState();

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
    { label: 'Tuiter', icon: 'fa-square-t', path: '/tuiter' },
    { label: 'Home', icon: 'fa-home', path: '/home' },
    { label: 'Explore', icon: 'fa-hashtag', path: '/explore' },
    { label: 'Notifications', icon: 'fa-bell', path: '/notifications' },
    { label: 'Messages', icon: 'fa-envelope', path: '/messages' },
    { label: 'Bookmarks', icon: 'fa-bookmark', path: '/bookmarks' },
    { label: 'Lists', icon: 'fa-list', path: '/lists' },
    { label: 'Profile', icon: 'fa-user', path: '/profile/my-tuits' },
    { label: 'More', icon: 'fa-circle-ellipsis', path: '/more' },
  ];
  return (
    <div className='ttr-navigation'>
      { error && <AlertBox message={error} /> }
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
                <i className={`fa ${link.icon} text-center`}></i>
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
