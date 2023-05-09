import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import components
import DashboardFrom from "../../Input/DashboardFrom";
import Input from "../../Input/Input";
import Select from "../../Input/Select";

// RTK query hooks
import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../../features/assignments/assignmentsApi";
import { useGetVideosQuery } from "../../../features/videos/videosApi";

// action
import { clearEditableAssignment } from "../../../features/assignments/assignmentsSlice";

const AssignmentModal = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [video_title, setVideo_title] = useState("");
  const [totalMark, setTotalMark] = useState("");

  const dispatch = useDispatch();

  // editable assignment
  const { editableAssignment } = useSelector((state) => state.assignments);

  // hooks
  const { data: videos, isSuccess: isGetVideoSuccess } = useGetVideosQuery();
  const { data: assignments } = useGetAssignmentsQuery();

  const [
    AddAssignment,
    { isLoading: isAddAssignmentLoading, isSuccess: isAddAssignmentSuccess },
  ] = useAddAssignmentMutation();
  const [
    editAssignment,
    { isLoading: isEditAssignmentLoading, isSuccess: isEditAssignmentSuccess },
  ] = useEditAssignmentMutation();

  // Video ID Array of videos that are included in the assignment
  const videoIds = assignments?.map((ass) => {
    if (editableAssignment?.id) {
      if (editableAssignment.video_id != ass.video_id) {
        return ass.video_id;
      }
    } else {
      return ass.video_id;
    }
  });

  // find video id
  const video_id = videos?.find((v) => v.title === video_title)?.id;

  // assignment
  const assignment = {
    title,
    totalMark,
    video_title,
    video_id,
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editableAssignment?.id) {
      editAssignment({ id: editableAssignment.id, data: assignment });
    } else {
      AddAssignment(assignment);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // modal close effect
  useEffect(() => {
    if (isAddAssignmentSuccess || isEditAssignmentSuccess) {
      closeModal();
    }
  }, [isAddAssignmentSuccess, isEditAssignmentSuccess]);

  // set assignment state based isEdit
  useEffect(() => {
    if (editableAssignment?.id) {
      const { title, video_title, totalMark } = editableAssignment;
      setTitle(title);
      setVideo_title(video_title);
      setTotalMark(totalMark);
    }
  }, [editableAssignment]);

  // clear input fields and editable video
  useEffect(() => {
    if (!showModal) {
      setTitle("");
      setVideo_title("");
      setTotalMark("");
      if (editableAssignment?.id) {
        dispatch(clearEditableAssignment());
      }
    }
  }, [showModal]);

  return (
    <DashboardFrom
      handleSubmit={handleSubmit}
      showModal={showModal}
      closeModal={closeModal}
      title={editableAssignment?.id ? "Edit Assignment" : "Add Assignment"}
    >
      {/* title */}
      <Input
        type="text"
        htmlFor="title"
        label="Title"
        autoComplete="title"
        name="title"
        classNamees="rounded-md mb-4"
        id="title"
        placeholder="Assignment 1 - Implement Debounce Function"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* video title */}
      <Select
        label="Select a video title"
        value={video_title}
        onChange={(e) => setVideo_title(e.target.value)}
      >
        {isGetVideoSuccess &&
          videos
            .filter((v) => !videoIds?.includes(v.id))
            .map((v) => {
              const { id, title } = v;
              return (
                <option key={id} value={title}>
                  {title}
                </option>
              );
            })}
      </Select>

      {/* total mark */}
      <Input
        type="number"
        htmlFor="total-mark"
        label="Total Mark"
        autoComplete="total-mark"
        name="total-mark"
        classNamees="rounded-md mb-4"
        id="total-mark"
        placeholder="100"
        value={totalMark}
        onChange={(e) => setTotalMark(e.target.value)}
      />
    </DashboardFrom>
  );
};

export default AssignmentModal;
