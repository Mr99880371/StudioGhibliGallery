import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../../components/movieCard';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { toggleFavorite, toggleWatched } from '../../stores/movieInteraction';

// Mock das ações
jest.mock('../../stores/movieInteraction', () => ({
  toggleFavorite: jest.fn(),
  toggleWatched: jest.fn(),
  setNote: jest.fn(),
}));

// Configuração do mock store
const mockStore = configureStore([]);

const movie = {
  id: '1',
  title: 'My Neighbor Totoro',
  release_date: '1988',
  running_time: '86',
  rt_score: '93',
  description: 'A movie about forest spirits.',
  director: 'Hayao Miyazaki',
  producer: 'Hayao Miyazaki',
  image: 'https://image-url.com/totoro.jpg',
};

describe('MovieCard', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      userMovies: {
        interactions: {
          [movie.id]: {
            favorite: false,
            watched: false,
            notes: '',
          },
        },
      },
      filters: {
        search: '',
        includeSynopsis: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should dispatch toggleFavorite when "Add Favorite" is clicked', () => {
    render(
      <Provider store={store}>
        <MovieCard movie={movie} />
      </Provider>
    );

    const favoriteBtn = screen.getByText(/Add Favorite/i); // Verifique o texto do botão
    fireEvent.click(favoriteBtn);

    expect(store.dispatch).toHaveBeenCalledWith(toggleFavorite(movie.id)); // Verifique o acionamento da ação
  });

  it('should dispatch toggleWatched when "Mark Watched" is clicked', () => {
    render(
      <Provider store={store}>
        <MovieCard movie={movie} />
      </Provider>
    );

    const watchedBtn = screen.getByText(/Mark Watched/i); // Verifique o texto do botão
    fireEvent.click(watchedBtn);

    expect(store.dispatch).toHaveBeenCalledWith(toggleWatched(movie.id)); // Verifique o acionamento da ação
  });
});
