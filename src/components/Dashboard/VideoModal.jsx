import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import DashboardFrom from "../Input/DashboardFrom";
import Input from "../Input/Input";

// hooks
import {
  useAddVideoMutation,
  useEditVideoMutation,
} from "../../features/videos/videosApi";
import { clearEditableVideo } from "../../features/videos/videosSlice";

const VideoModal = ({ showModal, closeModal, videos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  // has editable video
  const { editableVideo } = useSelector((state) => state.videos) || {};

  // RTK query hooks
  const [
    addVideo,
    { isLoading: isAddVideoLoading, isSuccess: isAddVideoSuccess },
  ] = useAddVideoMutation();

  const [
    editVideo,
    { isLoading: isEditVideoLoading, isSuccess: isEditVideoSuccess },
  ] = useEditVideoMutation();

  // time to video create
  const createdAt = new Date().toISOString();

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editableVideo?.id) {
      editVideo({
        id: editableVideo.id,
        data: {
          title,
          description,
          url,
          views,
          duration,
          createdAt: editableVideo.createdAt,
        },
      });
    }
    if (!editableVideo?.id && !error) {
      addVideo({
        title,
        description,
        url,
        views,
        duration,
        createdAt,
      });
    }
  };

  // submit button disabled
  const disabled = isEditVideoLoading || isAddVideoLoading;

  // set video state based isEdit
  useEffect(() => {
    if (editableVideo) {
      const { title, description, url, views, duration } = editableVideo;
      setTitle(title);
      setDescription(description);
      setUrl(url);
      setViews(views);
      setDuration(duration);
    }
  }, [editableVideo]);

  // clear input fields and editable video
  useEffect(() => {
    if (!showModal) {
      setTitle("");
      setDescription("");
      setUrl("");
      setViews("");
      setDuration("");
      dispatch(clearEditableVideo());
    }
  }, [showModal, dispatch]);

  // handle error
  useEffect(() => {
    const existTitle = videos?.find((v) => v.title === title);
    if (!editableVideo && existTitle) {
      setError("Please choose a new title.");
    } else {
      setError("");
    }
  }, [editableVideo, title, error]);

  // modal close effect
  useEffect(() => {
    if (isAddVideoSuccess || isEditVideoSuccess) {
      closeModal();
    }
  }, [isAddVideoSuccess, isEditVideoSuccess]);

  return (
    <DashboardFrom
      handleSubmit={handleSubmit}
      disabled={disabled}
      showModal={showModal}
      closeModal={closeModal}
      title={editableVideo ? "Edit Video" : "Add Video"}
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
        placeholder="Debounce Function in JavaScript - JavaScript Job Interview question"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
      />

      {/* description */}
      <Input
        type="text"
        htmlFor="description"
        label="Description"
        autoComplete="description"
        name="description"
        classNamees="rounded-md mb-4"
        id="description"
        placeholder="Describe video"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* url */}
      <Input
        type="text"
        htmlFor="url"
        label="Url"
        autoComplete="url"
        name="url"
        classNamees="rounded-md mb-4"
        id="url"
        placeholder="https://www.youtube.com/embed/dD9O8DnIBj4"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {/* views and  duration */}
      <div className="grid grid-cols-2 gap-8 pb-4">
        <Input
          type="text"
          htmlFor="views"
          label="Views"
          autoComplete="views"
          name="views"
          classNamees="rounded-md mb-4"
          id="views"
          placeholder="12.2k"
          value={views}
          onChange={(e) => setViews(e.target.value)}
        />
        <Input
          type="text"
          htmlFor="duration"
          label="Duration"
          autoComplete="duration"
          name="duration"
          classNamees="rounded-md mb-4"
          id="duration"
          placeholder="5:30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
    </DashboardFrom>
  );
};

export default VideoModal;
