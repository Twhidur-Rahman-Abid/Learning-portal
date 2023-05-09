import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get assignment api
    getAssignmentMark: builder.query({
      query: () => `/assignmentMark`,
    }),
    // submit assignment api
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMark",
              undefined,
              (draft) => {
                draft.push(result?.data);
              }
            )
          );
        } catch (e) {}
      },
    }),
    // edit assignment api
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const { data: assignmentMark } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMark",
              undefined,
              (draft) => {
                const findIndex = draft.findIndex(
                  (m) => Number(m.id) === Number(id)
                );
                draft[findIndex] = assignmentMark;
              }
            )
          );
        } catch (e) {}
      },
    }),
  }),
});

export const {
  useSubmitAssignmentMutation,
  useGetAssignmentMarkQuery,
  useEditAssignmentMarkMutation,
} = assignmentMarkApi;
