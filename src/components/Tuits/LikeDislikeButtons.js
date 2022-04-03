import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as service from '../../services/likes-service';
import './Tuits.css';
/**
 * Tuits stats for likes and dislikes. Display the like and dislike buttons and their associated counts. Handles the liking and disliking action using the likes service. Also makes use of redux user slice to get current logged in user id.
 */
function LikeDislikeButtons({ tuit }) {
  const userId = useSelector((state) => state.user.data.id);
  const [likeCount, setLikeCount] = useState(tuit.stats.likes);
  const [dislikeCount, setDislikeCount] = useState(tuit.stats.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  /**
   * Animates the like/dislike action.
   */
  const animate = () => {
    setAnimationClass('fs-6 ttr-heart-animated fa-pulse');
    setTimeout(() => {
      setAnimationClass('');
    }, 400);
  };

  /**
   * Checks if the user liked the tuit, and updates state used for styling.
   */
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

  /**
   * Checks if the user disliked the tuit, and updates state used for styling.
   */
  const updateDisliked = (tuit) => {
    if (tuit.dislikedBy.includes(userId)) {
      setDisliked(true);
      setLiked(false);
    } else {
      setDisliked(false);
    }
  };
  /** Updates the like/dislike stats of the tuit */
  const updateStats = (stats) => {
    const likes = stats.likes;
    const dislikes = stats.dislikes;
    setLikeCount(likes);
    setDislikeCount(dislikes);
  };

  // Update the liked/disliked state of the tuit. Listens for changes to the tuit for when a service is called to submit like/dislike.
  useEffect(() => {
    updateLiked(tuit);
    updateDisliked(tuit);
  }, [userId, tuit]);

  /**
   * Calls the likes service when a user likes a tuit. Uses the updated tuit stats from the service to update state.
   */
  const handleLikeTuit = async () => {
    const resTuit = await service.userLikesTuit(userId, tuit.id);
    if (resTuit && resTuit.error) {
      return;
    }
    updateStats(resTuit.stats);
    updateLiked(resTuit);
    animate();
  };

  /**
   * Similar to handlelikeTuit but for dislikes
   */
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
        <span
          className='btn p-0 m-0'
          data-testid='ttr-like-btn'
          onClick={() => handleLikeTuit()}
        >
          <i
            className={
              liked
                ? `fa-solid text-danger fa-heart ttr-heart ttr-stat-icon  ${animationClass}`
                : 'far fa-heart ttr-heart ttr-stat-icon'
            }
          >
            <span data-testid='ttr-stats-likes' className='mx-1'>
              {likeCount && likeCount}
            </span>
          </i>
        </span>
      </div>
      <div className='col'>
        <span
          className='btn p-0 m-0 ttr-dislike-btn'
          onClick={() => handleDislikeTuit()}
          data-testid='ttr-dislike-btn'
        >
          <i
            className={
              disliked
                ? `fa-solid fa-thumbs-down ttr-stat-icon ${animationClass}`
                : 'far fa-thumbs-down ttr-stat-icon'
            }
          >
            <span data-testid=' ttr-stats-dislikes' className='mx-1'>
              {dislikeCount && dislikeCount}
            </span>
          </i>
        </span>
      </div>
    </div>
  );
}

export default LikeDislikeButtons;
