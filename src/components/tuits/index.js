import React, { useEffect } from 'react';
import './Tuits.css';
import Tuit from './Tuit';

function Tuits({ tuits = [], deleteTuit }) {
  return (
    <div>
      <ul className='ttr-tuits list-group'>
        {tuits &&
          tuits.map((tuit) => {
            return <Tuit key={tuit.id} deleteTuit={deleteTuit} tuit={tuit} />;
          })}
      </ul>
    </div>
  );
}

export default Tuits;
