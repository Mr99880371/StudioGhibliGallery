import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import movieReducer from "./movieSlice";
import userMovieReducer from "./movieInteraction";
import filterReducer from "./filterSlice";

// Combina os reducers
const rootReducer = combineReducers({
  movies: movieReducer,
  userMovies: userMovieReducer,
  filters: filterReducer,
});

// Configuração de persistência
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userMovies"],
};

// Persiste o reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cria a store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Persiste a store
export const persistor = persistStore(store);

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
