import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // usa localStorage
import movieReducer from "./movieSlice.ts";
import userMovieReducer from "./movieInteraction.ts"; // nosso slice com favoritos etc.
import filterReducer from "./filterSlice.ts";

const rootReducer = combineReducers({
  movies: movieReducer,
  userMovies: userMovieReducer,
  filters: filterReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userMovies"], // quais slices persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
