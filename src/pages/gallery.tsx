import React from 'react';
import MovieHeader from '../components/movieHeader.tsx';

const Gallery: React.FC = () => {
  return (
    <div className="px-4 md:px-16 py-6">
      <MovieHeader />

      {/* Search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-12">
        {/* Input de busca */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown */}
        <div>
          <select className="w-full md:w-auto border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="default">Default</option>
            <option value="title">Title</option>
            <option value="year">Release Year</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Checkbox separado para não afetar o alinhamento */}
      <div className="mt-3 md:mt-4 flex items-center gap-2">
        <input type="checkbox" id="includeSynopsis" />
        <label htmlFor="includeSynopsis" className="text-sm text-gray-700">
          Include synopsis in search
        </label>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mt-6 mb-8 items-center text-gray-700 text-sm">
        <span className="font-semibold">Filters:</span>
        <button className="flex items-center gap-1 hover:text-blue-600 transition">
          👁 Watched
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600 transition">
          ❤️ Favorites
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600 transition">
          📝 With Notes
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600 transition">
          ⭐ Rating
        </button>
      </div>  

    {/* TODO: Movie grid aqui */}
      <div>
    {/* Movie cards vão aqui */}
      </div>
    </div>
  );
};

export default Gallery;
