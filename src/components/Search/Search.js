import React, { useEffect, useMemo, useState } from 'react';

const Search = ({ results, searchValue, setSearchValue }) => {
  return (
    <div className='ttr-search position-relative'>
      {/* <i className='fas fa-search position-absolute'></i> */}
      <input
        className='bg-secondary bg-opacity-10 border-0 form-control form-control-lg rounded-pill ps-5'
        placeholder='Search for users'
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <div>{results && results.map((item) => <p key={item.id}>{item}</p>)}</div>
    </div>
  );
};

export default Search;
