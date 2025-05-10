import React from 'react';
import { ReactComponent as StudioIcon } from '../assets/studio-wallpaper.svg';

const MovieHeader: React.FC = () => {
  return (
    <header>
      <div className="movie-header-container">
        {/* Logo do site */}
        <StudioIcon className="movie-header-container-studio-icon" />
        {/* Título */}
        <h1 className="movie-header-container-title font-nobel">GALLERY</h1>
      </div>

      {/* Subtítulo */}
      <p className="movie-header-container-subtitle">
        Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.
      </p>
    </header>
  );
};

export default MovieHeader;
