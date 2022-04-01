import React from 'react';
import './TuiterView.css';
import { Routes, Route } from 'react-router-dom';
import { AlertBox, Navigation } from '../../components';
import {
  WhatsHappeningView,
  HomeView,
  BookmarksView,
  ProfileView,
  ExploreView,
  NotificationsView,
  MessagesView,
  MoreView,
  ListsView,
} from '../index';
import { useSelector } from 'react-redux';

function TuiterView() {
  const error = useSelector((state) => state.error.data);
  return (
    <div className='container'>
      <div className='ttr-tuiter'>
        <div className='ttr-left-column'>
          <Navigation />
        </div>
        <div className='ttr-center-column'>
          <Routes>
            <Route path='/' element={<HomeView />} />
            {/* <Route path='/login' element={<Login />} /> */}
            <Route path='/tuiter' element={<HomeView />} />
            <Route path='/tuiter/:uid' element={<HomeView />} />
            <Route path='/home' element={<HomeView />} />
            <Route path='/home/:uid' element={<HomeView />} />
            <Route path='/explore' element={<ExploreView />} />
            <Route path='/notifications' element={<NotificationsView />} />
            <Route path='/messages' element={<MessagesView />} />
            <Route path='/bookmarks' element={<BookmarksView />} />
            <Route path='/lists' element={<ListsView />} />
            <Route path='/profile/*' element={<ProfileView />} />
            <Route path='/more' element={<MoreView />} />
          </Routes>
          {error && <AlertBox message={error} />}
        </div>
        <div className='ttr-right-column'>
          <WhatsHappeningView />
        </div>
      </div>
    </div>
  );
}
export default TuiterView;
