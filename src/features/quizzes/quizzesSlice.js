import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editAbleQuiz: undefined,
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addeditableQuiz: (state, action) => {
      state.editAbleQuiz = action.payload;
    },
    cleareditableQuiz: (state) => {
      state.editAbleQuiz = undefined;
    },
  },
});

export const { addeditableQuiz, cleareditableQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
