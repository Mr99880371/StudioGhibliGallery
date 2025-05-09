import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/index';
import {
  toggleWatched,
  toggleFavorites,
  toggleWithNotes,
  setRating,
  setSortBy,
} from '../stores/filterSlice';

const FilterControls: React.FC = () => {
  const dispatch = useDispatch();
  const { watched, favorites, withNotes, rating, sortBy } = useSelector(
    (state: RootState) => state.filters
  );

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
      {/* Filtros com emojis */}
      <div className="flex flex-wrap items-center gap-4 text-gray-700 text-sm">
        <span className="font-semibold">Filters:</span>

        <button
          onClick={() => dispatch(toggleWatched())}
          className={`flex items-center gap-1 transition ${
            watched ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }`}
        >
          👁 Watched
        </button>
        <button
          onClick={() => dispatch(toggleFavorites())}
          className={`flex items-center gap-1 transition ${
            favorites ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }`}
        >
          ❤️ Favorites
        </button>
        <button
          onClick={() => dispatch(toggleWithNotes())}
          className={`flex items-center gap-1 transition ${
            withNotes ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }`}
        >
          📝 With Notes
        </button>
        <button
          onClick={() => dispatch(setRating(rating === null ? 4 : null))}
          className={`flex items-center gap-1 transition ${
            rating !== null ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }`}
        >
          ⭐ Rating
        </button>
      </div>

      {/* Dropdown de ordenação */}
      <div className="sm:w-[220px]">
      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
