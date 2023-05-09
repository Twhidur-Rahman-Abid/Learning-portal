import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get quizzes api
    getQuizzes: builder.query({
      query: (id) => {
        const queryString = id ? `/quizzes?video_id_like=${id}` : `/quizzes`;
        return queryString;
      },
    }),
    // add quizzes api
    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: quiz } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(quiz);
            })
          );
        } catch (e) {}
      },
    }),
    // edit quiz
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const { data: quiz } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const findIndex = draft.findIndex((q) => q.id == id);
              draft[findIndex] = quiz;
            })
          );
        } catch (e) {}
      },
    }),
    // delte quiz
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              return draft.filter((q) => q.id !== arg);
            })
          );
        } catch (e) {}
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
} = quizzesApi;
