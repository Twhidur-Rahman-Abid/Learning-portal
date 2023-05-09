import React from "react";
import Quiz from "./Quiz";

const Quizzes = ({ activeQuizzes = [] }) => {
  return (
    <div className="space-y-8 ">
      {activeQuizzes.map((activeQuiz) => (
        <Quiz key={activeQuiz.id} activeQuiz={activeQuiz} />
      ))}
    </div>
  );
};

export default Quizzes;
