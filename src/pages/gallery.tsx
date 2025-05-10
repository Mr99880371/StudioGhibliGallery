import React, { useEffect } from 'react';
import MovieHeader from '../components/movieHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../stores/movieSlice';
import { RootState } from '../stores/index';
import MovieCard from '../components/movieCard';
import FilterControls from '../components/filterControls';
import SearchBar from '../components/searchBar';
import { clearFilters, setSortBy } from '../stores/filterSlice';

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
      filters.watched || filters.favorites || filters.withNotes || filters.rating !== null || sortBy !== 'default') && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-700">
          <span className="font-semibold">Active filters:</span>
  
        {/* SortBy */}
        {sortBy !== 'default' && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
            Sorted by {getSortLabel(sortBy)}
            <button
              className="ml-1 text-purple-500 hover:text-purple-700"
              onClick={() => dispatch(setSortBy('default'))}
            >
              ×
            </button>
          </span>
        )}
  
        {/* Rating */}
        {filters.rating !== null && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
            Rating: {filters.rating === 0 ? 'No Rating' : `${filters.rating} Stars`}
            <button
              className="ml-1 text-blue-500 hover:text-blue-700"
              onClick={() => dispatch({ type: 'filters/setRating', payload: null })}
            >
              ×
            </button>
          </span>
        )}
  
        {/* Watched */}
        {filters.watched && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
            Watched
            <button
              className="ml-1 text-green-500 hover:text-green-700"
              onClick={() => dispatch({ type: 'filters/setWatched', payload: false })}
            >
              ×
            </button>
          </span>
        )}
  
        {/* Favorites */}
        {filters.favorites && (
          <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
            Favorites
            <button
              className="ml-1 text-pink-500 hover:text-pink-700"
              onClick={() => dispatch({ type: 'filters/setFavorites', payload: false })}
            >
              ×
            </button>
          </span>
        )}
  
        {/* With Notes */}
        {filters.withNotes && (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
            With Notes
            <button
              className="ml-1 text-yellow-500 hover:text-yellow-700"
              onClick={() => dispatch({ type: 'filters/setWithNotes', payload: false })}
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
    const matchesRating =
    ratingFilter === null
      ? true
      : ratingFilter === 0
      ? !userData?.rating
      : userData?.rating === ratingFilter;

    const matchSearch =
      movie.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (filters.includeSynopsis && movie.description.toLowerCase().includes(filters.search.toLowerCase()));

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
    <div className="px-4 sm:px-6 lg:px-16 py-6">
    <MovieHeader />
  
    {/* Search bar + Filtros */}
    <div className="flex flex-col sm:items-center sm:justify-between gap-4 mt-12">
      <SearchBar />
      <FilterControls />
    </div>

    {/* Clear All */}
    {(filters.watched || filters.favorites || filters.withNotes || filters.rating !== null || sortBy !== 'default' || filters.search.trim() !== '') && (
      <div className="mt-4 flex justify-end text-sm">
        <button
          className="text-gray-700 hover:underline"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {filteredMovies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  </div>
  );
};

export default Gallery;
