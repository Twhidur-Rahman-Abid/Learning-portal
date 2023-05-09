import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editQuizReport } from "../../features/quizMark/quizMarkSlice";

const Option = ({ option, questionId, getOptions }) => {
  const { option: currentOption, id } = option || {};
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getOptions({
      option_id: id,
      isCorrect: option.isCorrect === checked,
    });
  }, []);

  const dispatch = useDispatch();

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    dispatch(
      editQuizReport({
        option_id: id,
        question_id: questionId,
        isCorrect: option.isCorrect !== checked,
      })
    );
  };

  return (
    // <label htmlFor={`option${option.id}_q${questionId}`}>
    //   <input
    //     type="checkbox"
    //     checked={checked}
    //     onChange={(e) => setChecked(e.target.checked)}
    //     id={`option${option.id}_q${questionId}`}
    //   />
    //   {currentOption}
    // </label>
    <label>
      <input type="checkbox" checked={checked} onChange={handleChecked} />
      {currentOption}
    </label>
  );
};

export default Option;
