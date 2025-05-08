import React, { useState } from 'react';
import { Movie } from '../types';

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);

  const {
    title,
    release_date,
    running_time,
    rt_score,
    description,
    director,
    producer,
    image,
  } = movie;

  const handleToggleDescription = () => setExpanded(prev => !prev);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col text-left">
      {/* Poster */}
      <img src={image} alt={title} className="rounded-md mb-4 w-full object-cover h-50" />

      {/* Título, ano e duração */}
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{release_date} • {running_time}m</p>

      {/* Nota */}
      <div className="flex items-center text-sm mt-2 mb-2">
        <span className="text-yellow-500 mr-1">⭐</span>
        <span className="font-medium text-gray-800">{rt_score}%</span>
        <span className="text-xs italic text-gray-400 ml-auto">Not rated</span>
      </div>

      {/* Sinopse */}
      <p className="text-sm text-gray-700 mb-2">
        {expanded ? description : `${description.slice(0, 100)}…`}
        <button onClick={handleToggleDescription} className="ml-1 text-blue-500 underline text-xs">
          {expanded ? "Show Less" : "Read More"}
        </button>
      </p>

      {/* Diretor e produtor */}
      <div className="mt-2 mb-2 text-xs text-gray-600">
        <p><span className="font-medium text-gray-700">Director:</span> {director}</p>
        <p><span className="font-medium text-gray-700">Producer:</span> {producer}</p>
      </div>

      {/* Ações */}
      <div className="flex flex-col gap-2 mt-auto">
        <button className="border border-gray-300 rounded-lg py-2 text-sm flex items-center justify-center gap-2">
          👁 Mark Watched
        </button>
        <button className="border border-gray-300 rounded-lg py-2 text-sm flex items-center justify-center gap-2">
          🤍 Add Favorite
        </button>
        <button className="border border-gray-300 rounded-lg py-2 text-sm flex items-center justify-center gap-2">
          📝 Add Notes
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
