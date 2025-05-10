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
    `rating-filter-drop-container-button ${
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
    <div className="rating-filter-drop-container">
      {/* Botão do dropdown */}
      <button onClick={toggleDropdown} className={getButtonStyle()}>
        <StarIcon className="w-5 h-5" />
        Rating
        <ChevronDownIcon className="w-4 h-4 ml-1" />
      </button>

      {isOpen && (
        <div className="rating-filter-drop-container-dropdown-div absolute">
          {/* Título do dropdown */}
          <p className="rating-filter-drop-container-dropdown-div-p">Filter by your rating</p>
          <ul className="rating-filter-drop-container-dropdown-div-ul">
            {/* Opção para todos os filmes */}
            <li>
              <button
                onClick={() => handleSelect(null)}
                className="rating-filter-drop-container-dropdown-div-ul-li"
              >
                • All Movies
              </button>
            </li>
            {/* Opção para filmes sem nota */}
            <li>
              <button
                onClick={() => handleSelect(0)}
                className="rating-filter-drop-container-dropdown-div-ul-li-button"
              >
                Unrated
              </button>
            </li>
            {/* Opção para filmes com qualquer nota */}
            <li>
              <button
                onClick={() => handleSelect(-1)}
                className="rating-filter-drop-container-dropdown-div-ul-li-button"
              >
                Any Rating
              </button>
            </li>
            {/* Opções de rating */}
            {[5, 4, 3, 2, 1].map((star) => (
              <li key={star}>
                <button
                  onClick={() => handleSelect(star)}
                  className="rating-filter-drop-container-dropdown-div-ul-li-button"
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
