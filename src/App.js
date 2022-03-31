import React, { useEffect } from 'react';
import { GenericError } from './components';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import TuiterView from './views/TuiterView/TuiterView';
import { LoginView, LandingView } from './views';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getProfileThunk } from './redux/userSlice';

function App() {
  const user = useSelector((state) => state.user.data);
  const profileComplete = useSelector((state) => state.user.profileComplete);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/*'
          element={
            profileComplete ? (
              <TuiterView />
            ) : (
              <LandingView content={<LoginView />} />
            )
          }
        ></Route>
        <Route
          path='/error'
          element={<LandingView content={<GenericError />} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
