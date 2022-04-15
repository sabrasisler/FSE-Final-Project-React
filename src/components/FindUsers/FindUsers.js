import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createConversationThunk } from '../../redux/messageThunks';
import { clearFoundUsers, findUsersByNameThunk } from '../../redux/userSlice';
import Search from '../Search/Search';
import { createConversation } from '../../services/messages-service';
import { setGlobalError } from '../../redux/errorSlice';
import { setActiveChat } from '../../redux/messageSlice';

const FindUsers = ({ selectedUsers, setSelectedUsers }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.data);
  const allFoundUsers = useSelector((state) => state.user.foundUsers);
  const [searchValue, setSearchValue] = useState('');

  const findAllUsers = useCallback(
    (searchValue) => {
      if (!searchValue) return;
      return dispatch(findUsersByNameThunk(searchValue));
    },
    [searchValue]
  );

  useEffect(() => {
    findAllUsers(searchValue);
  }, [findAllUsers]);

  const selectUsersForParentComponent = (user) => {
    setSearchValue('');
    dispatch(clearFoundUsers());
    return setSelectedUsers([...selectedUsers, user]);
  };
  return (
    <div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      {selectedUsers.map((user) => (
        <span key={user.id} className='badge rounded-pill bg-primary'>
          {user.name || user.firstName}
        </span>
      ))}
      <hr />

      <h5 className='mt-4'>Results</h5>
      {allFoundUsers.map((user) => (
        <div key={user.id}>
          <p
            className='btn'
            onClick={() => selectUsersForParentComponent(user)}
          >
            {user.name || user.firstName} @{user.username}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FindUsers;
