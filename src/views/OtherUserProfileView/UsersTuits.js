import { useEffect, useState } from 'react';
import * as service from '../../services/tuits-service';
import { Tuits, AlertBox } from '../../components';

const UsersTuits = ({uid}) => {
  const [tuits, setTuits] = useState([]);
  const [error, setError] = useState();

  const findMyTuits = async () => {
    const res = await service.findTuitsByUser(uid);
    if (res.error) {
      return setError(
        'We ran into an issue showing your tuits. Please try again later.'
      );
    }

    setTuits(res);
  };

  useEffect(() => {
    findMyTuits();
  });

  return (
    <div>
      {error && <AlertBox message={error} />}
      {tuits && <Tuits tuits={tuits} />}
    </div>
  );
};

export default UsersTuits;
