import React from 'react';
//import './Notification.css';
//import Notification from './Notification';
/**
 * A container to display a list of notifications.
 */
const Notification = ({ notifications }) => {
  return (
    <div>
      <ul className='ttr-notifications list-group'>
        {notifications &&
          notifications.map((notifications) => {
              return <p> Hello </p>
            //return tuit ? <Tuit key={tuit.id} tuitFromList={tuit} /> : null;
          })}
      </ul>
    </div>
  );
};

export default Tuits;
