import { apiSlice } from "../api/apiSlice";

const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get quiz marks api
    getQuizMarks: builder.query({
      query: () => `/quizMark`,
    }),
    // submit quiz
    submitQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getQuizMarks",
              undefined,
              (draft) => {
                draft.push(result?.data);
              }
            )
          );
        } catch (e) {}
      },
    }),
  }),
});

export const { useGetQuizMarksQuery, useSubmitQuizMutation } = quizMarkApi;
