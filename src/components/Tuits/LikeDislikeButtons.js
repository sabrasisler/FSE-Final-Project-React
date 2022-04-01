import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as service from '../../services/likes-service';
import './Tuits.css';

function LikeDislikeButtons({ tuit }) {
  const userId = useSelector((state) => state.user.data.id);
  const [likeCount, setLikeCount] = useState(tuit.stats.likes);
  const [dislikeCount, setDislikeCount] = useState(tuit.stats.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const animate = () => {
    setAnimationClass('fs-6 ttr-heart-animated fa-pulse');
    setTimeout(() => {
      setAnimationClass('');
    }, 400);
  };

  const updateLiked = (tuit) => {
    if (tuit.likedBy.includes(userId)) {
      setLiked(true);
      setDisliked(false);
      return;
    } else {
      setLiked(false);
      return;
    }
  };
  const updateDisliked = (tuit) => {
    if (tuit.dislikedBy.includes(userId)) {
      setDisliked(true);
      setLiked(false);
    } else {
      setDisliked(false);
    }
  };
  const updateStats = (stats) => {
    const likes = stats.likes;
    const dislikes = stats.dislikes;
    setLikeCount(likes);
    setDislikeCount(dislikes);
  };

  useEffect(() => {
    updateLiked(tuit);
    updateDisliked(tuit);
  }, [userId, tuit]);

  const handleLikeTuit = async () => {
    const resTuit = await service.userLikesTuit(userId, tuit.id);
    if (resTuit.error) {
      return;
    }
    updateStats(resTuit.stats);
    updateLiked(resTuit);
    animate();
  };

  const handleDislikeTuit = async () => {
    const resTuit = await service.userDislikesTuit(userId, tuit.id);
    if (resTuit.error) {
      return;
    }
    updateStats(resTuit.stats);
    updateDisliked(resTuit);
    animate();
  };
  return (
    <div className='d-flex '>
      <div className='col'>
        <span className='btn p-0 m-0' onClick={() => handleLikeTuit()}>
          <span
            className={
              liked
                ? `fa-solid text-danger fa-heart ttr-heart me-1  ${animationClass}`
                : 'far fa-heart ttr-heart me-1'
            }
          >
            <span className='px-1'>{likeCount && likeCount}</span>
          </span>
        </span>
      </div>
      <div className='col'>
        <span className='btn p-0 m-0' onClick={() => handleDislikeTuit()}>
          <span
            className={
              disliked
                ? `fa-solid fa-thumbs-down me-1 ${animationClass}`
                : 'far fa-thumbs-down me-1'
            }
          >
            <span className='px-1'>{dislikeCount && dislikeCount}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

export default LikeDislikeButtons;
