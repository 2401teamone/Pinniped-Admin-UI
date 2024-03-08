import { useState } from 'react';
import Button from './Button';

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  return (
    <form className="search-bar">
      <label htmlFor="search" className="search-icon">
        <i className="fa-regular fa-magnifying-glass"></i>
      </label>
      <input
        className="search-input"
        type="text"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="search-actions">
        {!!search.length && (
          <div>
            <button
              className="search-btn search"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Search
            </button>
            <button
              className="search-btn clear"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
