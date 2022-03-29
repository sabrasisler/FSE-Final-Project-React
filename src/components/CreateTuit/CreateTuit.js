import React, { useState } from 'react';
import * as service from '../../services/tuits-service';

const CreateTuit = ({ createTuit, loading }) => {
  const [tuit, setTuit] = useState('');

  return (
    <div className='p-2 w-100'>
      <textarea
        onChange={(e) => setTuit(e.target.value)}
        placeholder="What's happening?"
        className='w-100 border-0'
        value={tuit}
      ></textarea>
      <div className='row'>
        <div className='col-10 ttr-font-size-150pc text-primary'>
          <i className='fas fa-portrait me-3'></i>
          <i className='far fa-gif me-3'></i>
          <i className='far fa-bar-chart me-3'></i>
          <i className='far fa-face-smile me-3'></i>
          <i className='far fa-calendar me-3'></i>
          <i className='far fa-map-location me-3'></i>
        </div>
        <div className='col-2'>
          <button
            onClick={() => {
              setTuit('');
              return createTuit(tuit);
            }}
            className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}
          >
            {loading ? (
              <i class='fas fa-spinner fa-pulse'></i>
            ) : (
              <span>Tuit</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTuit;
