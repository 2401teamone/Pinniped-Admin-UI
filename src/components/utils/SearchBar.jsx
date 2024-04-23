import { useState } from "react";

import { Search } from "react-feather";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  return (
    <form className="search-bar">
      <label htmlFor="search" className="search-icon">
        <Search></Search>
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

// .search-bar {
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin: 0 var(--content-padding);
//   padding: 15px;
//   border-radius: 40px;
//   background-color: var(--secondary-background);
//   margin-bottom: 30px;
//   box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
//   border: 1px solid var(--light-gray);
//   height: 30px;

//   & .search-icon {
//     font-size: 1.3rem;
//     color: var(--text-color);
//   }

//   & .search-input {
//     width: 90%;
//     background-color: var(--secondary-background);
//     font-size: 1.3rem;
//     color: rgba(0, 0, 0, 0.6);
//   }

//   & .search-actions {
//     & div {
//       display: flex;
//       gap: 10px;
//       align-items: center;

//       & .search-btn {
//         padding: 7px;
//         border-radius: var(--radius);
//         animation: searching 0.2s ease;
//         font-size: 0.95rem;

//         &.search {
//           background-color: var(--green-light);
//           color: black;
//           font-weight: bold;

//           &:hover {
//             background-color: var(--green);
//             color: white;
//           }
//         }

//         &.clear {
//           background-color: var(--search-background);
//         }
//       }
//     }
//   }
// }
