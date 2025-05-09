// Filmes
export interface Movie {
  id: string;
  title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  rt_score: string;
  running_time: string;
  image: string;
}

// Filtros do usuário
export interface UserMovieState {
  [id: string]: {
    watched?: boolean;
    favorite?: boolean;
    notes?: string;
    rating?: number;
  };
}

// Notas do usuário
export interface MovieNote {
  rating: number;
  note: string;
}
    
  