import React from 'react';
import TuitStats from './TuitStats';
import TuitImage from './TuitImage';
import TuitVideo from './TuitVideo';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTuitThunk } from '../../redux/tuitSlice';
import { Link } from 'react-router-dom';

/**
 * Displays a tuit with all of its information, including Author, time, and stats (likes, dislikes, etc). Includes action to handle tuit deletion if the tuit belongs to logged in user.
 */
const Tuit = ({ tuit }) => {
  const userId = useSelector((state) => state.user.data.id);
  const dispatch = useDispatch();
  const handleDeleteTuit = async (tid) => {
    dispatch(deleteTuitThunk(tuit.id));
  };
  return (
    <li className='p-2 ttr-tuit list-group-item d-flex rounded-0'>
      <Link to={`${userId}`}>
        <div className='pe-2'>
          {tuit.author && (
            <img
              src={
                tuit.author.profilePhoto
                  ? tuit.author.profilePhoto
                  : `../images/${tuit.author.username}.jpg`
              }
              className='ttr-tuit-avatar-logo rounded-circle'
              alt='profile'
            />
          )}
        </div>
      </Link>
      <div className='w-100'>
        {userId === tuit.author.id ? ( // only delete if tuit belongs to user
          <i
            onClick={() => handleDeleteTuit(tuit.id)}
            className='fas btn fa-remove fa-2x fa-pull-right'
          ></i>
        ) : null}
        <div>
          <p className='fs-6 fw-bold'>
            {tuit.author && tuit.author.name}@
            {tuit.author && tuit.author.username} - {tuit.createdAt}
          </p>
          <Link to={`/tuiter/${userId}`}></Link>
        </div>
        {tuit.tuit}
        {tuit.youtube && <TuitVideo tuit={tuit} />}
        {tuit.image && <TuitImage tuit={tuit} />}
        <TuitStats tuit={tuit} />
      </div>
    </li>
  );
};
export default Tuit;
