import React from 'react';
import { CreateTuit, ErrorBox, Loader, Tuits } from '../../components';
import * as service from '../../services/tuits-service';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findAllTuitsThunk } from '../../redux/tuitSlice';
const HomeView = () => {
  const user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.tuits.loading);
  const error = useSelector((state) => state.error.data);
  const dispatch = useDispatch();
  const tuits = useSelector((state) => state.tuits.list);
  useEffect(() => {
    dispatch(findAllTuitsThunk());
  }, [dispatch]);
  console.log(user);
  return (
    user && (
      <div className='ttr-home'>
        <div className='border border-bottom-0'>
          <h5 className='fw-bold p-2'>Home</h5>
          {user && tuits && (
            <div className='d-flex'>
              <div className='p-2'>
                <img
                  alt='Profile'
                  className='ttr-width-50px rounded-circle'
                  src={user.profilePhoto}
                />
              </div>
              <CreateTuit />
            </div>
          )}
        </div>

        {error && <ErrorBox message={error} />}
        <Loader loading={loading} loadingMessage={'Loading Tuits'} />
        {tuits && <Tuits tuits={tuits} />}
      </div>
    )
  );
};
export default HomeView;
