import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LikeDislikeButtons from './LikeDislikeButtons';
import LikeDislikeButton from './LikeDislikeButtons';

const TuitStats = ({ tuit }) => {
  return (
    <div className='row mt-2'>
      <div className='col'>
        <i className='far fa-message me-1'></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className='col'>
        <i className='far fa-retweet me-1'></i>
        {tuit.stats && tuit.stats.retuits}
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
