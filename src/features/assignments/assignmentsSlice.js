import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editableAssignment: undefined,
};
const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addEditableAssignment: (state, action) => {
      state.editableAssignment = action.payload;
    },
    clearEditableAssignment: (state) => {
      state.editableAssignment = undefined;
    },
  },
});

export const { addEditableAssignment, clearEditableAssignment } =
  assignmentSlice.actions;
export default assignmentSlice.reducer;
