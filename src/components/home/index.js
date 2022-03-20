import React from 'react';
import Tuits from '../tuits';
import * as service from '../../services/tuits-service';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Home = () => {
  const user = useSelector((state) => state.user.data);
  // const location = useLocation();
  // const {uid} = useParams();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');
  // const userId = uid;
  const findAndSetTuits = async () => {
    const tuits = await service.findAllTuits();
    setTuits(tuits);
  };
  useEffect(() => {
    let isMounted = true;
    findAndSetTuits();
    return () => {
      isMounted = false;
    };
  }, [user]);
  const createTuit = async () => {
    await service.createTuit(user.id, { tuit });
    await findAndSetTuits();
  };
  const deleteTuit = async (tid) => {
    await service.deleteTuit(tid);
    await findAndSetTuits();
  };

  return (
    user && (
      <div className='ttr-home'>
        <div className='border border-bottom-0'>
          <h4 className='fw-bold p-2'>Home Screen</h4>
          {user.id && (
            <div className='d-flex'>
              <div className='p-2'>
                <img
                  alt='Profile'
                  className='ttr-width-50px rounded-circle'
                  src={user.profilePhoto}
                />
              </div>
              <div className='p-2 w-100'>
                <textarea
                  onChange={(e) => setTuit(e.target.value)}
                  placeholder="What's happening?"
                  className='w-100 border-0'
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
                    <a
                      onClick={createTuit}
                      className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}
                    >
                      Tuit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Tuits tuits={tuits} deleteTuit={deleteTuit} />
        {/* <Tuits tuits={tuits} /> */}
      </div>
    )
  );
};
export default Home;
