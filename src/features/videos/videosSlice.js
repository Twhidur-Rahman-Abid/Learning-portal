import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videoId: 1,
    editableVideo: undefined,
  },
  reducers: {
    videoIdAdded: (state, action) => {
      state.videoId = action.payload;
    },
    addEditableVideo: (state, action) => {
      state.editableVideo = action.payload;
    },
    clearEditableVideo: (state) => {
      state.editableVideo = undefined;
    },
  },
});

export const { videoIdAdded, addEditableVideo, clearEditableVideo } =
  videosSlice.actions;
export default videosSlice.reducer;
