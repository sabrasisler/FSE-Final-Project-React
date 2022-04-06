import React, {useState, useEffect} from 'react';

import { Routes, Route, useParams, useLocation} from 'react-router-dom';
import UsersTuits from './UsersTuits';
import UsersLikes from './UsersLikes';
import UsersDislikes from './UsersDislikes';
import ProfileNav from './ProfileNav';
import * as service from '../../services/users-service';
import { useSelector } from 'react-redux';

const OtherUserProfileView = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  let { uid } = useParams();
  const location = useLocation();
  const authUser = useSelector((state) => state.user.data);

  const findUser = async () => {
    const res = await service.findUserById(uid);
    if (res.error) {
      return setError(
        'We ran into an issue finding the user. Please try again later.'
      );
    }

    setUser(res);
  };

  const followUser = async () => {
    const res = await service.followUser(uid, authUser.id);
    if (res.error) {
      return setError(
        'We ran into an issue following the user. Please try again later.'
      );
    }
  }

  useEffect(() => {
    findUser();
  }, []);

  return (
    <div className='ttr-profile'>
      <div className='border border-bottom-0'>
        <div className='mb-5 position-relative'>
          <div className='bottom-0 left-0 position-relative'>
            <div className='position-relative'>
              <img
                className='position-relative img-fluid ttr-z-index-1 ttr-top-40px ttr-width-150px rounded-circle'
                alt='user profile'
                src={user ? user.profilePhoto : ''}
              />
            </div>
          </div>
        </div>

        <div className='p-2'>
          <h5 className='fw-bolder pb-0 mb-0'>
            {`${user ? user.name: ''}`}
            <i className='fa fa-badge-check text-primary'></i>
          </h5>
          <h6 className='pt-0'>{`@${user ? user.username : ''}`}</h6>
          <p className='pt-2'>{user ? user.bio : ''}</p>
          <p>
            {user ?
            user.location
              ? <i className='far fa-location-dot me-2'></i> + user.location
              : ''
              : ''}
            <i className='far fa-link ms-3 me-2'></i>
            {user ?
            user.website ? (
              <a href={user.website} className='text-decoration-none'>
                {user.website}:
              </a>
            ) : (
              ''
            )
            : ''}
            {/* <i className='far fa-balloon ms-3 me-2'></i>
            Born October 1, 1958
            <br /> */}
            <i className='far fa-calendar me-2'></i>
            {user ? user.joinedDate : ''}
          </p>
          <b>{user ? user.followeeCount : 0}</b> Following
          <b className='ms-4'>{user ? user.followerCount : 0}</b> Followers
          <button onClick={followUser}>Follow</button>
          <ProfileNav uid={uid}/>
        </div>
      </div>
      <Routes>
        <Route path='/tuits' element={<UsersTuits uid={uid} />} />
        <Route path='/likes' element={<UsersLikes uid={uid} />} />
        <Route path='/dislikes' element={<UsersDislikes uid={uid} />} />

        {/* <Route path='/tuits-and-replies' element={<TuitsAndReplies />} /> */}
        {/* <Route path='/media' element={<Media />} />
        <Route path='/likes' element={<MyLikes />} /> */}
      </Routes>
    </div>
  );
};
export default OtherUserProfileView;
