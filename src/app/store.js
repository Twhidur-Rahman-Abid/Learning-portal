import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import quizMarkReducer from "../features/quizMark/quizMarkSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";
import videosReducer from "../features/videos/videosSlice";
import assignmentsReducer from "../features/assignments/assignmentsSlice";
import leaderboardReducer from "../features/leaderboard/leaderboard";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    videos: videosReducer,
    auth: authReducer,
    quizMark: quizMarkReducer,
    quizzes: quizzesReducer,
    assignments: assignmentsReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
