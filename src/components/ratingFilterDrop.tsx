import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores';
import { setRatingFilter } from '../stores/filterSlice';
import { ChevronDownIcon, StarIcon } from '@heroicons/react/20/solid';

const RatingFilterDrop: React.FC = () => {
  const dispatch = useDispatch();
  const rating = useSelector((state: RootState) => state.filters.rating);
  const [isOpen, setIsOpen] = useState(false);

  // Função para estilizar o botão
  const getButtonStyle = () =>
    `flex items-center gap-1 transition ${
      rating !== null ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
    }`;

  // Função para alternar o dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Função para selecionar um rating
  const handleSelect = (value: number | null) => {
    dispatch(setRatingFilter(value));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Botão do dropdown */}
      <button onClick={toggleDropdown} className={getButtonStyle()}>
        <StarIcon className="w-5 h-5" />
        Rating
        <ChevronDownIcon className="w-4 h-4 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow w-56">
          {/* Título do dropdown */}
          <p className="px-4 py-2 text-sm font-semibold text-gray-700">Filter by your rating</p>
          <ul className="text-sm text-gray-700">
            {/* Opção para todos os filmes */}
            <li>
              <button
                onClick={() => handleSelect(null)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                • All Movies
              </button>
            </li>
            {/* Opção para filmes sem nota */}
            <li>
              <button
                onClick={() => handleSelect(0)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Unrated
              </button>
            </li>
            {/* Opções de rating */}
            {[5, 4, 3, 2, 1].map((star) => (
              <li key={star}>
                <button
                  onClick={() => handleSelect(star)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {star} Star{star > 1 && 's'} {'⭐'.repeat(star)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RatingFilterDrop;
