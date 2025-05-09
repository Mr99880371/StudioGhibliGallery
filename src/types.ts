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
  export interface UserMovieState {
    [id: string]: {
      watched?: boolean;
      favorite?: boolean;
      notes?: string;
      rating?: number;
    };
  }
  