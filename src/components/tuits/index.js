import React, { useEffect } from 'react';
import './styles.css';
import Tuit from './tuit';

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
