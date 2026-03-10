import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import feedReducer from './feedSlice';
import profileReducer from './profileSlice';
import requestsReducer from './requestsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    profile: profileReducer,
    requests: requestsReducer,
  },
});

export default store;