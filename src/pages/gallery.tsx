import React, { useEffect } from 'react';
import MovieHeader from '../components/movieHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../stores/movieSlice';
import { RootState } from '../stores/index';
import MovieCard from '../components/movieCard';
import FilterControls from '../components/filterControls';
import SearchBar from '../components/searchBar';
import { 
  clearFilters, 
  setFavorites, 
  setRatingFilter, 
  setSortBy, 
  setWatched, 
  setWithNotes 
} from '../stores/filterSlice';

const Gallery: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const filters = useSelector((state: RootState) => state.filters);

  const ratingFilter = useSelector((state: RootState) => state.filters.rating);
  const interactions = useSelector((state: RootState) => state.userMovies.interactions);

  // Dispatch que pega os filmes da API
  useEffect(() => {
    dispatch(getMovies() as any);
  }, [dispatch]);

  
  // Mostra os filtros ativos na tela
  const activateFilters = () => {
    return (      
      filters.watched || 
      filters.favorites || 
      filters.withNotes || 
      filters.rating !== null || 
      sortBy !== 'default') && (
        <div className="active-filters">
          <span className="font-semibold">Active filters:</span>
  
        {/* SortBy */}
        {sortBy !== 'default' && (
          <span className="tag tag-purple">
            Sorted by {getSortLabel(sortBy)}
            <button
              className="ml-1 tag-button tag-button-purple"
              onClick={() => dispatch(setSortBy('default'))}
            >
              ×
            </button>
          </span>
        )}
  
        {/* Rating */}
        {filters.rating !== null && (
          <span className="tag tag-blue">
            Rating: {filters.rating === -1 ? 'Any Rating' : filters.rating === 0 ? 'Unrated' : `${filters.rating} Stars`}
            <button
              className="ml-1 tag-button tag-button-blue"
              onClick={() => dispatch(setRatingFilter(null))}
            >
              ×
            </button>
          </span>
        )}
  
        {/* Watched */}
        {filters.watched && (
          <span className="tag tag-green">
            Watched
            <button
              className="ml-1 tag-button tag-button-green"
              onClick={() => dispatch(setWatched(false))}
            >
              ×
            </button>
          </span>
        )}
  
        {/* Favorites */}
        {filters.favorites && (
          <span className="tag tag-pink">
            Favorites
            <button
              className="ml-1 tag-button tag-button-pink"
              onClick={() => dispatch(setFavorites(false))}
            >
              ×
            </button>
          </span>
        )}
  
        {/* With Notes */}
        {filters.withNotes && (
          <span className="tag tag-yellow">
            With Notes
            <button
              className="ml-1 tag-button tag-button-yellow"
              onClick={() => dispatch(setWithNotes(false))}
            >
              ×
            </button>
          </span>
        )}
      </div>
    )
  };

  // Filtros de ordenação
  const sortBy = filters.sortBy;

  // Filtra os filmes
  const filteredMovies = movies
  .filter((movie) => {
    const userData = interactions[movie.id] || {};

    const matchWatched = !filters.watched || userData.watched;
    const matchFavorite = !filters.favorites || userData.favorite;
    const matchNotes = !filters.withNotes || !!userData.notes;

    const matchesRating = (() => {
      if (ratingFilter === null) return true;
      if (ratingFilter === 0) return userData?.rating == null;
      if (ratingFilter === -1) return userData?.rating != null;
      return userData?.rating === ratingFilter;
    })();

    const matchSearch =
      movie.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (filters.includeSynopsis &&
        movie.description.toLowerCase().includes(filters.search.toLowerCase()));

    return matchWatched && matchFavorite && matchNotes && matchesRating && matchSearch;
  })
  .sort((a, b) => {
    switch (filters.sortBy) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'duration-asc':
        return parseInt(a.running_time) - parseInt(b.running_time);
      case 'duration-desc':
        return parseInt(b.running_time) - parseInt(a.running_time);
      case 'rating-asc':
        return (interactions[a.id]?.rating || 0) - (interactions[b.id]?.rating || 0);
      case 'rating-desc':
        return (interactions[b.id]?.rating || 0) - (interactions[a.id]?.rating || 0);
      case 'score-asc':
        return parseInt(a.rt_score) - parseInt(b.rt_score);
      case 'score-desc':
        return parseInt(b.rt_score) - parseInt(a.rt_score);
      default:
        return 0;
    }
  });

  // Função que lista os filtros de ordenação
  const getSortLabel = (value: string) => {
    switch (value) {
      case 'title-asc':
        return 'Title (A-Z)';
      case 'title-desc':
        return 'Title (Z-A)';
      case 'duration-asc':
        return 'Duration (Shortest)';
      case 'duration-desc':
        return 'Duration (Longest)';
      case 'rating-asc':
        return 'Your Rating (Lowest)';
      case 'rating-desc':
        return 'Your Rating (Highest)';
      case 'score-asc':
        return 'Score (Lowest)';
      case 'score-desc':
        return 'Score (Highest)';
      default:
        return 'Default';
    }
  };


  return (
    <div className="gallery-container">
    <MovieHeader />
  
    {/* Search bar + Filtros */}
    <div className="filters-container">
      <SearchBar />
      <FilterControls />
    </div>

    {/* Clear All */}
    {(filters.watched ||
      filters.favorites ||
      filters.withNotes ||
      filters.rating !== null ||
      sortBy !== 'default' ||
      filters.search.trim() !== '') && (
      <div className="clear-button-container">
        <button
          className="clear-button"
          onClick={() => {
            dispatch(clearFilters());
          }}
        >
          Clear All
        </button>
      </div>
    )}

    {/* Bloco de filtros ativos */}
    {activateFilters()}

    {/* Grade de filmes */}
    {filteredMovies.length > 0 ? (
      <div className="grid-films">
        {filteredMovies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 text-lg text-center">
        <p>🔍 Nenhum resultado encontrado com os filtros atuais.</p>
        {(filters.watched ||
      filters.favorites ||
      filters.withNotes ||
      filters.rating !== null ||
      sortBy !== 'default' ||
      filters.search.trim() !== '') && (
      <div className="flex flex-col items-center justify-center">
        <button
          className="border border-gray-300 bg-gray-100 hover:bg-gray-200 mt-2 rounded-md p-2 text-sm font-regular"
          onClick={() => {
            dispatch(clearFilters());
          }}
        >
          Clear All Filters
        </button>
      </div>
    )}
      </div>
    )}
  </div>
  );
};

export default Gallery;
