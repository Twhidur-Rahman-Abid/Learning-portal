import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import component
import Quizzes from "../../components/Quizzes/Quizzes";
import Worning from "../../components/Ui/Worning";

// RTK query hooks
import { useSubmitQuizMutation } from "../../features/quizMark/quizMarkApi";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";

// custom hook
import useIsQuizSubmitted from "../../hooks/useIsQuizSubmitted";

const QuizPage = () => {
  const [worning, setWorning] = useState("");
  const navigate = useNavigate();

  // submit quiz
  const [SubmitQuiz, { isSuccess }] = useSubmitQuizMutation();
  // fetch quizzes
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery() || [];

  //  All quiz report
  const { quizReport } = useSelector((state) => state.quizMark) || [];
  // user
  const { user } = useSelector((state) => state.auth) || {};
  const { name: student_name, id: student_id } = user;

  const { videoId } = useParams();

  // Check whether the user has already submitted these quizzes.
  const isQuizSubmitted = useIsQuizSubmitted(videoId);

  // video related quizzes
  const activeQuizzes =
    quizzes?.filter((quiz) => quiz.video_id == videoId) || [];

  // How many quizzes have the user answered correctly
  const totalCorrect = quizReport?.filter((mark) => {
    if (mark.options.every((v) => v.isCorrect === true)) {
      return mark;
    }
  }).length;

  // quiz mark report
  const mark = {
    student_id,
    student_name,
    video_id: videoId,
    video_title: activeQuizzes[0]?.video_title,
    totalQuiz: quizReport?.length,
    totalCorrect,
    totalWrong: quizReport.length - totalCorrect,
    totalMark: quizReport?.length * 5,
    mark: totalCorrect * 5,
  };

  // handle submit quizzes
  const handelSubmitQuizzes = () => {
    /*  If the user has already submitted the quiz,
        then the user cannot submit it again 
        otherwise, the quiz will be submitted. */
    if (isQuizSubmitted) {
      setWorning("Already you have submitted the quiz!");
    } else {
      SubmitQuiz(mark);
    }
  };

  // If the submission is successful, will navigate to the leaderboard
  useEffect(() => {
    if (isSuccess) {
      navigate("/leaderboard");
    }
  }, [isSuccess, navigate]);

  // decide what to render
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>Error</div>;
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <>
        {" "}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            {activeQuizzes[0]?.video_title}
          </h1>
          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
        </div>
        <Quizzes activeQuizzes={activeQuizzes} />
      </>
    );
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {/* quiz title and quizzes options */}
        {content}

        <button
          onClick={handelSubmitQuizzes}
          className="px-4 py-2 rounded-full mb-8 bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
        >
          Submit
        </button>
        {worning && (
          <Worning onClick={() => setWorning("")} message={worning} />
        )}
      </div>
    </section>
  );
};

export default QuizPage;
