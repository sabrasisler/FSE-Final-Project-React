import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LikeDislikeButtons from './LikeDislikeButtons';
import LikeDislikeButton from './LikeDislikeButtons';

const TuitStats = ({ tuit }) => {
  return (
    <div className='row mt-2'>
      <div className='col'>
        <i className='far fa-message'>
          <span className='mx-1'>{tuit.stats && tuit.stats.replies}</span>
        </i>
      </div>
      <div className='col'>
        <i className='far fa-retweet'>
          <span className='mx-1'>{tuit.stats && tuit.stats.retuits}</span>
        </i>
      </div>
      <div className='col'>
        <LikeDislikeButtons tuit={tuit} />
      </div>
      <div className='col'>
        <i className='far fa-inbox-out btn'></i>
      </div>
    </div>
  );
};

TuitStats.defaultProps = {
  tuit: {
    stats: {
      likes: 0,
      dislikes: 0,
      replies: 0,
      retuis: 0,
    },
  },
};
export default TuitStats;
