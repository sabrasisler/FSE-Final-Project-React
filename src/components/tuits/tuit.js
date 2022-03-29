import React from 'react';
import TuitStats from './TuitStats';
import TuitImage from './TuitImage';
import TuitVideo from './TuitVideo';

const Tuit = ({ tuit, deleteTuit }) => {
  return (
    <li className='p-2 ttr-tuit list-group-item d-flex rounded-0'>
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
      <div className='w-100'>
        <i
          onClick={() => deleteTuit(tuit.id)}
          className='fas btn fa-remove fa-2x fa-pull-right'
        ></i>
        <h2 className='fs-5'>
          {tuit.author && tuit.author.username}@
          {tuit.author && tuit.author.username} -{tuit.published}
        </h2>
        {tuit.tuit}
        {tuit.youtube && <TuitVideo tuit={tuit} />}
        {tuit.image && <TuitImage tuit={tuit} />}
        <TuitStats tuit={tuit} />
      </div>
    </li>
  );
};
export default Tuit;
