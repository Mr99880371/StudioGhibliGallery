import React, { useState } from 'react';
import { Movie } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatched, toggleFavorite, setNote, setRating } from '../stores/movieInteraction';
import { RootState } from '../stores/index';
import { toast } from 'react-toastify';
import NotesModal from './notesModal';

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const dispatch = useDispatch();
  const { search, includeSynopsis } = useSelector((state: RootState) => state.filters);
  const interaction = useSelector((state: RootState) => state.userMovies.interactions[movie.id] || {});

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
    const isWatched = interaction?.watched;
    
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
    const isFavorite = interaction?.favorite;
    
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

  /* Função para abrir o modal de notas */
  const handleOpenNotesModal = () => {
    setShowNotesModal(true);  
    
  };

  /* Função para adicionar notas - dispara Toast */
  const handleAddNote = (rating: number, note: string) => {
    if (note !== null) {
      dispatch(setNote({ id: movie.id, notes: note }));
  
      const isNoteEmpty = note.trim() === '';
  
      toast(
        <div>
          <p className="font-semibold">
            {isNoteEmpty ? '🗑️ Note removed' : '📝 Note added'}
          </p>
          <p className="text-sm text-gray-500">{movie.title} has been updated</p>
        </div>,
        {
          style: {
            borderLeft: `4px solid ${isNoteEmpty ? '#ef4444' : '#3b82f6'}`,
            backgroundColor: '#fff',
          },
        }
      );
    }
  };

  /* Função para remover notas e avaliações - dispara Toast */
  const handleRemoveNoteAndRating = () => {
    handleAddNote(0, "");
    dispatch(setRating({ id: movie.id, rating: 0 }));
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
        <span key={index} className="highlight-text">{part}</span>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  };

  return (
    <div className={`movie-card-container ${interaction?.rating === 5 ? 'bg-highlight' : ''}`}>  
      {/* Modal de notas e comentários */}
      {showNotesModal && (
         <NotesModal
          isOpen={showNotesModal}
          movieId={movie.id}
          movieTitle={movie.title}
          onSave={(rating, note) => {
            handleAddNote(rating, note); 
            setShowNotesModal(false);
          }}
          onClose={() => setShowNotesModal(false)}
        />
      )}

      {/* Poster */}
      <div className="relative mb-4 overflow-hidden rounded-md group">
        
        {typeof interaction?.rating === "number" && interaction.rating > 0 && (
          <div className="movie-note-poster">
            {interaction.notes && (
              <span className="movie-note-poster-span">💬 Notes</span>
            )}
            {interaction.rating > 0 && (
              <span className="movie-rating-poster-span">
                ⭐ {interaction.rating}/5
              </span>
            )}
          </div>
        )}
        
        <img
          src={image}
          alt={title}
          className="movie-poster-full"
        />
        <div className={`absolute inset-0 ${interaction?.rating === 5 ? 'bg-yellow-300' : 'bg-black'} bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300`}>
          <p className="movie-poster-title-container-p">{title}</p>
        </div>
       </div>

      {/* Título, ano e duração */}
      <h2 className="movie-title-p">{title}</h2>
      <p className="movie-release-date-p">{release_date} • {running_time}m</p>

      {/* Nota */}
      <div className="movie-rating-container">
        <span className="text-yellow-500 mr-1">⭐</span>
        <span className="font-medium text-gray-800">{rt_score}%</span>
        <span className="text-xs text-gray-400 ml-auto">{interaction.rating > 0 ? (
          <span className="movie-rating-container-span">
            {"★".repeat(interaction.rating)}
            {"☆".repeat(5 - interaction.rating)}
          </span>
            ) : "Not rated"}</span>
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

      {/* Notas do usuário */}
      {interaction?.notes && interaction.notes.trim() !== '' && (
          <div className="movie-user-rating">
          <div className="flex justify-between items-start mb-1">
            <p className="font-medium">Your Notes:</p>
            <button
              onClick={() => {
                handleRemoveNoteAndRating();
              }}
              className="movie-user-rating-button"
              title="Remove note and rating"
            >
              ✖
            </button>
          </div>
          <p className="movie-user-rating-p">{interaction.notes}</p>
        </div>
      )}

      {/* Ações */}
      <div className="flex flex-col gap-2 mt-auto">
      <button
          className={`action-button ${
            interaction?.watched ? 'watched' : ''
          }`}
          onClick={() => handleToggleWatched()}
        >
          👁 {interaction?.watched ? 'Watched' : 'Mark Watched'}
        </button>
        <button
          className={`action-button ${
            interaction?.favorite ? 'favorite' : ''
          }`}
          onClick={() => handleToggleFavorite()}
        >
          {interaction?.favorite ? '🤍 Favorited' : '❤️ Add Favorite'}
        </button>
        <button
          className={`action-button ${
            interaction?.notes ? 'notes' : ''
          }`}
          onClick={() => handleOpenNotesModal()}
        >
          {interaction?.notes ? '📝 Edit Notes' : '📝 Add Notes'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
