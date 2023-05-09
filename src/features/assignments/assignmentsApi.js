import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get assignments api
    getAssignments: builder.query({
      query: (videoId) => {
        const queryString = videoId
          ? `/assignments?video_id_like=${videoId}`
          : `/assignments`;
        return queryString;
      },
    }),
    // get assignment api
    getAssignment: builder.query({
      query: (query) => `/assignments/${query}`,
    }),
    // add assignment api
    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: assignment } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(assignment);
              }
            )
          );
        } catch (e) {}
      },
    }),
    // edit assignment api
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const { data: assignment } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                const findIndex = draft.findIndex((ass) => ass.id == id);
                draft[findIndex] = assignment;
              }
            )
          );
        } catch (e) {}
      },
    }),
    // delete assignment api
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                return draft.filter((ass) => ass.id != arg);
              }
            )
          );
        } catch (e) {}
      },
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
