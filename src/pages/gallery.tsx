import React, { useEffect } from 'react';
import MovieHeader from '../components/movieHeader.tsx';
import { useDispatch } from 'react-redux';
import { getMovies } from '../stores/movieSlice.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/index.ts';
import MovieCard from '../components/movieCard.tsx';

const Gallery: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);

  useEffect(() => {      
    dispatch(getMovies() as any);
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-16 py-6">
    <MovieHeader />
  
    {/* Search bar + dropdown */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-12">
      {/* Campo de busca */}
      <div className="w-full sm:flex-1">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      {/* Dropdown */}
      <div className="w-full sm:w-auto">
        <select className="w-full sm:w-auto border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="default">Default</option>
          <option value="title">Title</option>
          <option value="year">Release Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  
    {/* Checkbox */}
    <div className="mt-3 flex items-center gap-2">
      <input type="checkbox" id="includeSynopsis" />
      <label htmlFor="includeSynopsis" className="text-sm text-gray-700">
        Include synopsis in search
      </label>
    </div>
  
    {/* Filtros */}
    <div className="flex flex-wrap gap-4 mt-6 mb-8 items-center text-gray-700 text-sm">
      <span className="font-semibold">Filters:</span>
      <button className="flex items-center gap-1 hover:text-blue-600 transition">👁 Watched</button>
      <button className="flex items-center gap-1 hover:text-blue-600 transition">❤️ Favorites</button>
      <button className="flex items-center gap-1 hover:text-blue-600 transition">📝 With Notes</button>
      <button className="flex items-center gap-1 hover:text-blue-600 transition">⭐ Rating</button>
    </div>
  
    {/* Grade de filmes responsiva */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  </div>
  );
};

export default Gallery;
