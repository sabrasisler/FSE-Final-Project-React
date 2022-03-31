import React, { useEffect } from 'react';
import './Tuits.css';
import Tuit from './Tuit';

const Tuits = ({ tuits = [], deleteTuit }) => {
  return (
    <div>
      <ul className='ttr-tuits list-group'>
        {tuits &&
          tuits.map((tuit) =>
            tuit ? <Tuit key={tuit.id} tuit={tuit} /> : null
          )}
      </ul>
    </div>
  );
};

export default Tuits;
