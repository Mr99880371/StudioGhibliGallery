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

    if (!trimmedNote && rating === 0) {
      setError('Please provide a rating or note.');
      return;
    }

    dispatch(setNoteRedux({ id: movieId, notes: trimmedNote }));
    dispatch(setRatingRedux({ id: movieId, rating }));

    toast(
      <div>
        <p className="font-semibold">
          {trimmedNote
            ? (rating ? '📝 Note and Rating saved' : '📝 Note saved')
            : '🗑️ Note removed'}
        </p>
        <p className="text-sm text-gray-500">{movieTitle} has been updated</p>
      </div>,
      {
        style: {
          borderLeft: `4px solid ${trimmedNote ? '#3b82f6' : '#9ca3af'}`,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Notes for {movieTitle}</h2>

        <label className="block mb-2 font-medium">Your Rating:</label>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-500">{rating ? `${rating}/5` : 'Not rated'}</span>
        </div>

        <label className="block mb-2 font-medium">Your Notes:</label>
        <textarea
          className="w-full border rounded p-2 mb-2"
          placeholder="Write your thoughts about this movie..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Save Notes</button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
