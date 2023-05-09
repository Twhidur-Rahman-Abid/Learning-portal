import { apiSlice } from "../api/apiSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get videos api
    getVideos: builder.query({
      query: () => `/videos`,
    }),
    // get video api
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    // add video api
    addVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: video } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(video);
            })
          );
        } catch (e) {}
      },
    }),
    // edit video api
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const { data: video } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const findIndex = draft.findIndex((q) => q.id == id);
              draft[findIndex] = video;
            })
          );
        } catch (e) {}
      },
    }),
    // delete video api
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              return draft.filter((v) => v.id !== arg);
            })
          );
        } catch (e) {}
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
