import React, { useState } from 'react';
import './css/NavSearch.css';

const NavSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      onSearch(searchValue);
      setSearchValue('');
    }
  };

  return (
    <div className="nav-search-container">
      <form>
        <input
          type="text"
          placeholder="Recherche..."
          onChange={(e) => setSearchValue(e.target.value)}
          className="nav-search-input"
        />
      </form>
    </div>
  );
};

export default NavSearch;
