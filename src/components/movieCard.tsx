import React, { useState } from 'react';
import { Movie } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatched, toggleFavorite, setNote } from '../stores/movieInteraction';
import { RootState } from '../stores/index';
import { toast } from 'react-toastify';

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { search, includeSynopsis } = useSelector((state: RootState) => state.filters);

  const userMovies = useSelector((state: RootState) => state.userMovies.interactions);

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

  /* Função para marcar/desmarcar como assistido - dispara Toast */
  const handleToggleWatched = () => {
    dispatch(toggleWatched(movie.id));
    const isWatched = userMovies[movie.id]?.watched;
    
    toast(
      <div>
        <p className="font-semibold">
          {isWatched ? '❌ Unmarked as watched' : '✅ Marked as watched'}
        </p>
        <p className="text-sm text-gray-500">{movie.title} has been updated</p>
      </div>,
      {
        style: {
          borderLeft: `4px solid ${isWatched ? '#ef4444' : '#10b981'}`, 
          backgroundColor: '#fff',
        },
      }
    );
  };

  /* Função para marcar/desmarcar como favorito - dispara Toast */
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(movie.id));
    const isFavorite = userMovies[movie.id]?.favorite;
    
    toast(
      <div>
        <p className="font-semibold">
          {isFavorite ? '💔 Removed from favorites' : '❤️ Added to favorites'}
        </p>
        <p className="text-sm text-gray-500">{movie.title} has been updated</p>
      </div>,
      {
        style: {
          borderLeft: `4px solid ${isFavorite ? '#ef4444' : '#10b981'}`, 
          backgroundColor: '#fff',
        },
      }
    );
  };

  /* Função para adicionar notas - dispara Toast */
  const handleAddNote = () => {
    const previousNote = userMovies[movie.id]?.notes || '';
    const note = prompt('Add a note for this movie:', previousNote);
    if (note !== null) {
      dispatch(setNote({ id: movie.id, notes: note }));
  
      toast(
        <div>
          <p className="font-semibold">
            {note.trim() ? '🗑️ Note removed' : '📝 Note updated'}
          </p>
          <p className="text-sm text-gray-500">{movie.title} has been updated</p>
        </div>,
        {
          style: {
            borderLeft: `4px solid ${note.trim() ? '#9ca3af' : '#3b82f6'}`, 
            backgroundColor: '#fff',
          },
        }
      );
    }
  };

  /* Função para expandir/colapsar a sinopse */
  const handleToggleDescription = () => setExpanded(prev => !prev);

  /* Destaca texto da Sinopse */
  const highlightText = (text: string, keyword: string) => {
    if (!keyword.trim()) return text;
  
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
  
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 font-semibold">{part}</span>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col text-left">
      {/* Poster */}
      <div className="relative mb-4 overflow-hidden rounded-md group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <p className="text-white font-medium text-lg px-2 text-center">{title}</p>
        </div>
       </div>

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
        {includeSynopsis && search.trim() ? (
          <>
            {expanded
              ? highlightText(description, search)
              : highlightText(`${description.slice(0, 100)}…`, search)}
          </>
        ) : (
          <>
            {expanded ? description : `${description.slice(0, 100)}…`}
          </>
        )}

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
      <button
          className={`border rounded-lg py-2 text-sm flex items-center justify-center gap-2 ${
            userMovies[movie.id]?.watched ? 'bg-gray-900 text-white' : 'border-gray-300'
          }`}
          onClick={() => handleToggleWatched()}
        >
          👁 {userMovies[movie.id]?.watched ? 'Watched' : 'Mark Watched'}
        </button>
        <button
          className={`border rounded-lg py-2 text-sm flex items-center justify-center gap-2 ${
            userMovies[movie.id]?.favorite ? 'bg-red-600 text-white' : 'border-gray-300'
          }`}
          onClick={() => handleToggleFavorite()}
        >
          {userMovies[movie.id]?.favorite ? '🤍 Favorited' : '❤️ Add Favorite'}
        </button>
        <button
          className={`border rounded-lg py-2 text-sm flex items-center justify-center gap-2 ${
            userMovies[movie.id]?.notes ? 'bg-blue-100 text-blue-800 font-semibold' : 'border-gray-300'
          }`}
          onClick={() => handleAddNote()}
        >
          📝 {userMovies[movie.id]?.notes ? 'Notes' : 'Add Notes'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
