import React, { useEffect, useState } from 'react';
import Login from './components/login';
import Error from './components/error';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg';
import './styles.css';
import Tuiter from './pages/tuiter';
import LandingPage from './pages/landing';
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
            profileComplete ? <Tuiter /> : <LandingPage content={<Login />} />
          }
        ></Route>
        <Route
          path='/error'
          element={<LandingPage content={<Error />} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
