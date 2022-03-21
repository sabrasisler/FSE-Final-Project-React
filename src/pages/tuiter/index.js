import React from 'react';
import Navigation from '../../components/navigation';
import WhatsHappening from '../../components/whats-happening';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Home from '../../components/home';
import Bookmarks from '../../components/bookmarks';
import Profile from '../../components/profile';
import './styles.css';
import EditProfile from '../../components/profile/edit-profile';
import Explore from '../../components/explore';
import Notifications from '../../components/notifications';
import Messages from '../../components/messages';
import Lists from '../../components/lists';
import More from '../../components/more';
import { Login } from '../../components/profile/login';
import LandingPage from '../landing';
import CompleteSignup from '../../components/forms/complete-signup';

function Tuiter() {
  return (
    <div className='container'>
      <div className='ttr-tuiter'>
        <div className='ttr-left-column'>
          <Navigation />
        </div>
        <div className='ttr-center-column'>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/login' element={<Login />} /> */}
            <Route path='/tuiter' element={<Home />} />
            <Route path='/tuiter/:uid' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/home/:uid' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
            <Route path='/lists' element={<Lists />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit' element={<EditProfile />} />
            <Route path='/more' element={<More />} />
          </Routes>
        </div>
        <div className='ttr-right-column'>
          <WhatsHappening />
        </div>
      </div>
    </div>
  );
}
export default Tuiter;
