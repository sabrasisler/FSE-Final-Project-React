import React, { useEffect } from 'react';
import './Tuits.css';
import Tuit from './Tuit';

function Tuits({ tuits = [], deleteTuit }) {
  console.log(tuits);
  return (
    <div>
      <ul className='ttr-tuits list-group'>
        {tuits &&
          tuits.map((tuit) =>
            tuit ? (
              <Tuit key={tuit.id} deleteTuit={deleteTuit} tuit={tuit} />
            ) : null
          )}
      </ul>
    </div>
  );
}

export default Tuits;
