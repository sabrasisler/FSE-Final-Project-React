import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import MyTuits from './MyTuits';
import MyLikes from './MyLikes';
import MyDislikes from './MyDislikes';
import ProfileNav from './ProfileNav';

const ProfileView = () => {
  const user = useSelector((state) => state.user.data);
  return (
    <div className='ttr-profile'>
      <Routes>
        <Route path='/my-tuits' element={<MyTuits />} />
        <Route path='/my-likes' element={<MyLikes />} />
        <Route path='/my-dislikes' element={<MyDislikes />} />

        {/* <Route path='/tuits-and-replies' element={<TuitsAndReplies />} /> */}
        {/* <Route path='/media' element={<Media />} />
        <Route path='/likes' element={<MyLikes />} /> */}
      </Routes>
    </div>
  );
};
export default ProfileView;
