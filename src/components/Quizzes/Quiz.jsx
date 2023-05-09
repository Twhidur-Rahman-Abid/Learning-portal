import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Option from "./Option";

import {
  addQuizReport,
  clearQuizReport,
} from "../../features/quizMark/quizMarkSlice";

const Quiz = ({ activeQuiz }) => {
  const [options, setOptions] = useState([]);

  const { question, options: quizOptions, id } = activeQuiz || {};

  const getOptions = (value) => {
    setOptions((prev) => [...prev, value]);
  };
  const dispatch = useDispatch();

  // handle add quiz report
  useEffect(() => {
    if (options?.length > 0) {
      dispatch(addQuizReport({ question_id: id, options }));
    }
  }, [options, id, dispatch]);

  // clear quiz report
  useEffect(() => {
    return () => dispatch(clearQuizReport());
  }, [dispatch]);

  return (
    <div className="quiz">
      <h4 className="question">{question}</h4>
      <form className="quizOptions">
        {quizOptions?.map((option) => (
          <Option
            key={option.id}
            option={option}
            questionId={id}
            getOptions={getOptions}
          />
        ))}
      </form>
    </div>
  );
};

export default Quiz;
