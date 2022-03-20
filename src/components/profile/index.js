import React from 'react';
import Tuits from '../tuits';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className='ttr-profile'>
      <div className='border border-bottom-0'>
        <h4 className='p-2 mb-0 pb-0 fw-bolder'>
          {user.name ? `${user.name}` : ''}
          <i className='fa fa-badge-check text-primary'></i>
        </h4>
        <span className='ps-2'>67.6K Tuits</span>
        <div className='mb-5 position-relative'>
          <img
            className='w-100'
            src='../images/nasa-profile-header.jpg'
            alt='profile header'
          />
          <div className='bottom-0 left-0 position-absolute'>
            <div className='position-relative'>
              <img
                className='position-relative img-fluid ttr-z-index-1 ttr-top-40px ttr-width-150px rounded-circle'
                alt='user profile'
                src={user.profilePhoto}
              />
            </div>
          </div>
          <Link
            to='/profile/edit'
            className='mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right'
          >
            Edit profile
          </Link>
        </div>

        <div className='p-2'>
          <h4 className='fw-bolder pb-0 mb-0'>
            {`${user.firstName} ${user.lastName}`}
            <i className='fa fa-badge-check text-primary'></i>
          </h4>
          <h6 className='pt-0'>{`@${user.username}`}</h6>
          <p className='pt-2'>{user.bio}</p>
          <p>
            {user.location
              ? <i className='far fa-location-dot me-2'></i> + user.location
              : ''}
            <i className='far fa-link ms-3 me-2'></i>
            {user.website ? (
              <a href={user.website} className='text-decoration-none'>
                {user.website}:
              </a>
            ) : (
              ''
            )}
            {/* <i className='far fa-balloon ms-3 me-2'></i>
            Born October 1, 1958
            <br /> */}
            <i className='far fa-calendar me-2'></i>
            {user.joinedDate}
          </p>
          <b>{user.followeeCount}</b> Following
          <b className='ms-4'>{user.followerCount}</b> Followers
          <ul className='mt-4 nav nav-pills nav-fill'>
            <li className='nav-item'>
              <Link to='/profile/tuits' className='nav-link active'>
                Tuits
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/profile/tuits-and-replies' className='nav-link'>
                Tuits & replies
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/profile/media' className='nav-link'>
                Media
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/profile/likes' className='nav-link'>
                Likes
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Tuits />
    </div>
  );
};
export default Profile;
