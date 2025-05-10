import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, toggleIncludeSynopsis } from '../stores/filterSlice';
import { RootState } from '../stores/index';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  // Seleciona os filtros
  const search = useSelector((state: RootState) => state.filters.search);

  // Seleciona a checkbox para buscar por sinopse
  const includeSynopsis = useSelector((state: RootState) => state.filters.includeSynopsis);

  return (
    <div className="w-full">
      {/* Input de busca */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Checkbox para buscar na sinopse */}
      <div className="mt-3 ml-1 flex items-center gap-2">
        <input
          type="checkbox"
          id="includeSynopsis"
          checked={includeSynopsis}
          onChange={() => dispatch(toggleIncludeSynopsis())}
        />
        <label htmlFor="includeSynopsis" className="text-sm text-gray-700">
          Include synopsis in search
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
