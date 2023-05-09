import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import components
import DashboardFrom from "../Input/DashboardFrom";
import Input from "../Input/Input";
import Select from "../Input/Select";
import Checkbox from "../Input/Checkbox";

// import hooks
import {
  useAddQuizMutation,
  useEditQuizMutation,
} from "../../features/quizzes/quizzesApi";

// actions
import { cleareditableQuiz } from "../../features/quizzes/quizzesSlice";
import { useGetVideosQuery } from "../../features/videos/videosApi";

const QuizModal = ({ showModal, setShowModal }) => {
  const [question, setQuestion] = useState("");
  const [video_title, setVideo_title] = useState("");
  // options state
  const [options, setOptions] = useState({
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
  });
  // Is correct state
  const [isCorrect_1, setIsCorrect_1] = useState(false);
  const [isCorrect_2, setIsCorrect_2] = useState(false);
  const [isCorrect_3, setIsCorrect_3] = useState(false);
  const [isCorrect_4, setIsCorrect_4] = useState(false);

  const dispatch = useDispatch();
  // selector
  const { editAbleQuiz } = useSelector((state) => state.quizzes);

  // hooks
  const { data: videos, isSuccess: isGetVideoSuccess } = useGetVideosQuery();
  const [addQuiz, { isSuccess: isAddQuizSuccess }] = useAddQuizMutation();
  const [editQuiz, { isSuccess: isEditQuizSuccess }] = useEditQuizMutation();

  // Objects destructure
  const { option_1, option_2, option_3, option_4 } = options;

  // video id
  const video_id = videos?.filter((v) => v.title === video_title)[0]?.id;

  // create quiz instance
  const quiz = {
    question,
    video_id,
    video_title,
    options: [
      {
        id: 1,
        option: option_1,
        isCorrect: isCorrect_1,
      },
      {
        id: 2,
        option: option_2,
        isCorrect: isCorrect_2,
      },
      {
        id: 3,
        option: option_3,
        isCorrect: isCorrect_3,
      },
      {
        id: 4,
        option: option_4,
        isCorrect: isCorrect_4,
      },
    ],
  };

  // handle options
  const handleOptions = (e) => {
    setOptions((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editAbleQuiz?.id) {
      editQuiz({ id: editAbleQuiz.id, data: quiz });
    } else {
      addQuiz(quiz);
    }
  };

  // modale close
  const closeModal = () => {
    setShowModal(false);
  };

  // isAddQuizSuccess or isEditQuizSuccess , close modal
  useEffect(() => {
    if (isAddQuizSuccess || isEditQuizSuccess) {
      closeModal();
    }
  }, [isAddQuizSuccess, isEditQuizSuccess]);

  // set edit able quiz value
  useEffect(() => {
    if (editAbleQuiz?.id) {
      const { question, video_title, options } = editAbleQuiz;
      setQuestion(question);
      setVideo_title(video_title);
      setOptions({
        option_1: options[0].option,
        option_2: options[1].option,
        option_3: options[2].option,
        option_4: options[3].option,
      });
      setIsCorrect_1(options[0]?.isCorrect);
      setIsCorrect_2(options[1]?.isCorrect);
      setIsCorrect_3(options[3]?.isCorrect);
      setIsCorrect_4(options[4]?.isCorrect);
    }
  }, [editAbleQuiz]);

  // clear from
  useEffect(() => {
    if (!showModal) {
      setQuestion("");
      setVideo_title("");
      setOptions({
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
      });
      setIsCorrect_1(false);
      setIsCorrect_2(false);
      setIsCorrect_3(false);
      setIsCorrect_4(false);
    }
  }, [showModal]);

  // clear edit able quiz
  useEffect(() => {
    if (!showModal) {
      dispatch(cleareditableQuiz());
    }
  }, [dispatch, showModal]);

  return (
    <DashboardFrom
      handleSubmit={handleSubmit}
      showModal={showModal}
      closeModal={closeModal}
      title={editAbleQuiz ? "Edit Quiz" : "Add Quiz"}
    >
      {/* question */}
      <Input
        type="text"
        htmlFor="question"
        label="Question"
        autoComplete="question"
        name="question"
        classNamees="rounded-md mb-4"
        id="question"
        placeholder="What is a Debounce function in JavaScript?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* video title */}
      <Select
        label="Video Title"
        value={video_title}
        onChange={(e) => setVideo_title(e.target.value)}
        placeholder="Select a video title"
      >
        {isGetVideoSuccess &&
          videos.map((v) => {
            const { id, title } = v;
            return (
              <option key={id} value={title}>
                {title}
              </option>
            );
          })}
      </Select>

      {/* option 1 and 2 */}
      <div className="grid grid-cols-2 gap-8">
        <div className="mb-2">
          <Input
            type="text"
            htmlFor="option_1"
            label="Option 1"
            autoComplete="option-1"
            name="option_1"
            classNamees="rounded-md mb-4"
            id="option-1"
            placeholder="Describe video"
            value={option_1}
            onChange={handleOptions}
          />

          <Checkbox
            label="Option 1 is correct"
            name="isCorrect_1"
            checked={isCorrect_1}
            onChange={(e) => setIsCorrect_1(e.target.checked)}
          />
        </div>
        <div className="mb-2">
          <Input
            type="text"
            htmlFor="option_2"
            label="Option 2"
            autoComplete="option-2"
            name="option_2"
            classNamees="rounded-md mb-4"
            id="option-2"
            placeholder="Describe video"
            value={option_2}
            onChange={handleOptions}
          />
          <Checkbox
            label="Option 2 is correct"
            name="isCorrect_2"
            checked={isCorrect_2}
            onChange={(e) => setIsCorrect_2(e.target.checked)}
          />
        </div>
      </div>

      {/* option 3 and 4 */}
      <div className="grid grid-cols-2 gap-8">
        <div className="mb-2">
          <Input
            type="text"
            htmlFor="option_3"
            label="Option 3"
            autoComplete="option-3"
            name="option_3"
            classNamees="rounded-md mb-4"
            id="option-3"
            placeholder="Describe video"
            value={option_3}
            onChange={handleOptions}
          />

          <Checkbox
            label="Option 3 is correct"
            name="isCorrect_3"
            checked={isCorrect_3}
            onChange={(e) => setIsCorrect_3(e.target.checked)}
          />
        </div>
        <div className="mb-2">
          <Input
            type="text"
            htmlFor="option_4"
            label="Option 4"
            autoComplete="option-4"
            name="option_4"
            classNamees="rounded-md mb-4"
            id="option-4"
            placeholder="Describe video"
            value={option_4}
            onChange={handleOptions}
          />
          <Checkbox
            label="Option 4 is correct"
            name="isCorrect_4"
            checked={isCorrect_4}
            onChange={(e) => setIsCorrect_4(e.target.checked)}
          />
        </div>
      </div>
    </DashboardFrom>
  );
};
export default QuizModal;
