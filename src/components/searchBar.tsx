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
    <div className="search-bar-container">
      {/* Input de busca */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="search-bar-container-input"
      />

      {/* Checkbox para buscar na sinopse */}
      <div className="search-bar-container-checkbox">
        <input
          type="checkbox"
          id="includeSynopsis"
          checked={includeSynopsis}
          onChange={() => dispatch(toggleIncludeSynopsis())}
        />
        <label htmlFor="includeSynopsis" className="search-bar-container-checkbox-label">
          Include synopsis in search
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
