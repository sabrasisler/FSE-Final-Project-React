import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const ProfileNav = ({ uid }) => {
  const location = useLocation();
  const navItems = [
    {
      title: 'Tuits',
      link: `/tuiter/${uid}/tuits`,
    },
    { title: 'Likes', link: `/tuiter/${uid}/likes` },
    { title: 'Dislikes', link: `/tuiter/${uid}/dislikes` },
    // The final two pages are currently unimplemented so their links just go back to the current page
    { title: 'Tuits and Replies', link: `/tuiter/${uid}/tuits_and_replies` },
    { title: 'Media', link: `/tuiter/${uid}/media` },
  ];
  return (
    <ul className='mt-4 nav nav-pills nav-fill'>
      {navItems.map((item) => (
        <li key={item.link} className='nav-item'>
          <NavLink
            to={item.link}
            // className={`nav-link ${
            //   location.pathname.indexOf(item.link) === 0 ? 'active' : ''
            // }`}
            className='nav-link'
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ProfileNav;
