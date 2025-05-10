import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/index';
import {
  toggleWatched,
  toggleFavorites,
  toggleWithNotes,
  setSortBy,
} from '../stores/filterSlice';
import RatingFilterDrop from './ratingFilterDrop';

const FilterControls: React.FC = () => {
  const dispatch = useDispatch();

  // Seleciona os filtros
  const { watched, favorites, withNotes, rating, sortBy } = useSelector(
    (state: RootState) => state.filters
  );

  return (
    <div className="filter-controls-container">
      {/* Filtros com emojis */}
      <div className="filter-controls-wrap">
        <span className="font-semibold">Filters:</span>

        <button
          onClick={() => dispatch(toggleWatched())}
          className={`watched-button ${
            watched ? 'watched-button:watched' : 'watched-button:hover'
          }`}
        >
          👁 Watched
        </button>
        <button
          onClick={() => dispatch(toggleFavorites())}
          className={`favorites-button ${
            favorites ? 'favorites-button:favorites' : 'favorites-button:hover'
          }`}
        >
          ❤️ Favorites
        </button>
        <button
          onClick={() => dispatch(toggleWithNotes())}
          className={`withNotes-button ${
            withNotes ? 'withNotes-button:withNotes' : 'withNotes-button:hover'
          }`}
        >
          📝 With Notes
        </button>
        
        {/* Dropdown de rating */}
        <RatingFilterDrop />
      </div>

      {/* Dropdown de ordenação */}
      <div className="sm:w-[220px]">
      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className="dropdown"
      >
        <option value="default">Default</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="duration-asc">Duration (Shortest)</option>
        <option value="duration-desc">Duration (Longest)</option>
        <option value="rating-asc">Your Rating (Lowest)</option>
        <option value="rating-desc">Your Rating (Highest)</option>
        <option value="score-asc">Score (Lowest)</option>
        <option value="score-desc">Score (Highest)</option>
      </select>
      </div>
    </div>
  );
};

export default FilterControls;
