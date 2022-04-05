import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as service from '../../services/likes-service';
import { AlertBox } from '../../components';
import { Tuits } from '../../components';

const MyDislikes = () => {
  const [tuits, setTuits] = useState();
  const [error, setError] = useState();

  let { uid } = useParams();
  const findMyTuits = async () => {
    const res = await service.findAllTuitsDislikedByUser(uid);
    if (res.error) {
      return setError(
        'We ran into an issue showing your disliked tuits. Please try again later.'
      );
    }

    setTuits(res);
  };
  useEffect(() => {
    findMyTuits();
  }, []);

  return (
    <div>
      <h1>Dislikes</h1>
      {error && <AlertBox message={error} />}
      {tuits && <Tuits tuits={tuits} />}
    </div>
  );
};

export default MyDislikes;
