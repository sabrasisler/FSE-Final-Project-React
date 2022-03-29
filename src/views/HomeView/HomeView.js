import React from 'react';
import { CreateTuit, Tuits } from '../../components';
import * as service from '../../services/tuits-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const HomeView = () => {
  const user = useSelector((state) => state.user.data);
  const [tuits, setTuits] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const createTuit = async (tuit) => {
    setLoading(true);
    await service.createTuit(user.id, { tuit });
    setLoading(false);
    await findAndSetTuits();
  };
  const deleteTuit = async (tid) => {
    setLoading(true);
    await service.deleteTuit(tid);
    setLoading(false);
    await findAndSetTuits();
  };

  return (
    user && (
      <div className='ttr-home'>
        <div className='border border-bottom-0'>
          <h5 className='fw-bold p-2'>Home</h5>
          {user.id && (
            <div className='d-flex'>
              <div className='p-2'>
                <img
                  alt='Profile'
                  className='ttr-width-50px rounded-circle'
                  src={user.profilePhoto}
                />
              </div>
              <CreateTuit createTuit={createTuit} loading={loading} />
            </div>
          )}
        </div>
        <Tuits tuits={tuits} deleteTuit={deleteTuit} />
        {/* <Tuits tuits={tuits} /> */}
      </div>
    )
  );
};
export default HomeView;
