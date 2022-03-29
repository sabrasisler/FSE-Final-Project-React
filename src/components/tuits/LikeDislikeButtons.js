import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as service from '../../services/likes-service';

function LikeDislikeButtons({ tuit }) {
  const userId = useSelector((state) => state.user.data.id);
  const [likeCount, setLikeCount] = useState(tuit.stats.likes);
  const [dislikeCount, setDislikeCount] = useState(tuit.stats.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const animate = () => {
    setAnimationClass('fs-5 fa-pulse');
    setTimeout(() => {
      setAnimationClass('');
    }, 800);
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
          <i
            className={
              liked
                ? `fa-solid fa-thumbs-up me-1  ${animationClass}`
                : 'far fa-thumbs-up me-1'
            }
          ></i>
          {likeCount && likeCount}
        </span>
      </div>
      <div className='col'>
        <span className='btn p-0 m-0' onClick={() => handleDislikeTuit()}>
          <i
            className={
              disliked
                ? `fa-solid fa-thumbs-down me-1 ${animationClass}`
                : 'far fa-thumbs-down me-1'
            }
          ></i>
          {dislikeCount && dislikeCount}
        </span>
      </div>
    </div>
  );
}

export default LikeDislikeButtons;
