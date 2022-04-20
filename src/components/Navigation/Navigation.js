import React from 'react';
import './navigation.css';
import { useLocation, Link } from 'react-router-dom';
import {useSelector} from "react-redux";

import { findUnreadNotificationsForUser } from '../../services/notifications-service';

/**
 * Displays the main navigation menu of the app.
 */
function Navigation() {
  const { pathname } = useLocation();
  const authUser = useSelector((state) => state.user.data);

  let userNotifications = findUnreadNotificationsForUser(authUser.id);
  let notificationIcon;
  console.log(userNotifications);
  if (userNotifications.length > 0) {
    notificationIcon = 'fa-bell'
    console.log(" HAVE UNREAD NOTIFICATIONS");
  } else {
    notificationIcon = "fa-bookmark"
    console.log(" no unread notifications");
  }
  

  const links = [
    { label: 'Tuiter', icon: 'fa-square-t', path: '/tuiter' },
    { label: 'Home', icon: 'fa-home', path: '/home' },
    { label: 'Explore', icon: 'fa-hashtag', path: '/explore' },
    { label: 'Notifications', icon: notificationIcon, path: '/notifications' },
    { label: 'Messages', icon: 'fa-envelope', path: '/messages' },
    { label: 'Bookmarks', icon: 'fa-bookmark', path: '/bookmarks' },
    { label: 'Lists', icon: 'fa-list', path: '/lists' },
    { label: 'Profile', icon: 'fa-user', path: '/profile/my-tuits' },
    { label: 'More', icon: 'fa-circle-ellipsis color-blue', path: '/more' },
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
