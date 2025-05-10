import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRating as setRatingRedux, setNote as setNoteRedux } from '../stores/movieInteraction';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
  movieTitle: string;
  onSave: (rating: number, note: string) => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, movieId, movieTitle, onSave }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  // Mantém o estado anterior salvo no modal
  const savedRating = useSelector(
    (state: RootState) => state.userMovies.interactions[movieId]?.rating || 0
  );
  
  const savedNote = useSelector(
    (state: RootState) => state.userMovies.interactions[movieId]?.notes || ''
  );

  // Inicializa o estado com os valores salvos
  useEffect(() => {
    if (isOpen) {
      setRating(savedRating);
      setNote(savedNote);
    }
  }, [savedRating, savedNote, isOpen]);

  // Salva as notas e fecha o modal
  const handleSubmit = () => {
    const trimmedNote = note.trim();
  
    const noteChanged = trimmedNote !== savedNote.trim();
    const ratingChanged = rating !== savedRating;
  
    if (!trimmedNote && rating === 0) {
      setError('Please provide a rating or note.');
      return;
    }
  
    // Se nada foi alterado, não faz nada
    if (!noteChanged && !ratingChanged) {
      onClose();
      return;
    }
  
    dispatch(setNoteRedux({ id: movieId, notes: trimmedNote }));
    dispatch(setRatingRedux({ id: movieId, rating }));
  
    // Só exibe o toast se algo tiver sido alterado
    toast(
      <div>
        <p className="font-semibold">
          {noteChanged
            ? (ratingChanged ? '📝 Note and Rating saved' : '📝 Note saved')
            : '⭐ Rating saved'}
        </p>
        <p className="notes-modal-movie-upd-toast">{movieTitle} has been updated</p>
      </div>,
      {
        style: {
          borderLeft: `4px solid ${noteChanged ? '#3b82f6' : '#facc15'}`, // azul para nota, amarelo para só rating
          backgroundColor: '#fff',
        },
      }
    );
  
    // Limpa e fecha
    setRating(0);
    setNote('');
    setError('');
    onClose();
    onSave(rating, note);
  };

  // Retorna null se o modal não estiver aberto
  if (!isOpen) return null;

  return (
    <div className="notes-modal-container">
      <div className="notes-modal-container-div">
        <h2 className="notes-modal-container-movie-title">Add Notes for {movieTitle}</h2>

        <label className="notes-modal-container-your-rating">Your Rating:</label>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`notes-modal-container-stars ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
          <span className="notes-modal-container-span-rated">{rating ? `${rating}/5` : 'Not rated'}</span>
        </div>

        <label className="notes-modal-container-your-notes">Your Notes:</label>
        <textarea
          className="notes-modal-container-textarea"
          placeholder="Write your thoughts about this movie..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        {error && <p className="notes-modal-container-error">{error}</p>}

        <div className="notes-modal-container-div-button">
          <button onClick={onClose} className="notes-modal-container-button-cancel">Cancel</button>
          <button onClick={handleSubmit} className="notes-modal-container-button-save">Save Notes</button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
