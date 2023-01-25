import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movieSlice'
import netflixReducer from '../features/movie/netflixSlice'
import authReducer from '../features/auth/authSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
    netflix: netflixReducer,
  },
});
