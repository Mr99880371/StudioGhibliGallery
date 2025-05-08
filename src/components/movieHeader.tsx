import React from 'react';
import { ReactComponent as StudioIcon } from '../assets/studio-wallpaper.svg';

const MovieHeader: React.FC = () => {
  return (
    <header>
      <div className="flex flex-col items-center text-center">
        <StudioIcon className="w-full max-w-[300px] h-auto" /> 
        <h1 className="font-nobel text-3xl mt-4">GALLERY</h1>
      </div>

      {/* Subtítulo */}
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-6">
        Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.
      </p>
    </header>
  );
};

export default MovieHeader;
