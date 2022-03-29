import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const ProfileNav = ({ title, link }) => {
  const location = useLocation();
  const navItems = [
    {
      title: 'My Tuits',
      link: '/profile/my-tuits',
    },
    { title: 'Likes', link: '/profile/my-likes' },
    { title: 'Dislikes', link: '/profile/my-dislikes' },
    { title: 'Tuits and Replies', link: '/profile/tuits-and-replies' },
    { title: 'Media', link: '/profile/my-media' },
  ];
  return (
    <ul className='mt-4 nav nav-pills nav-fill'>
      {navItems.map((item) => (
        <li className='nav-item'>
          <NavLink
            exact={true}
            to={item.link}
            // className={`nav-link ${
            //   location.pathname.indexOf(item.link) === 0 ? 'active' : ''
            // }`}
            className='nav-link'
            activeClassName='active'
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ProfileNav;
