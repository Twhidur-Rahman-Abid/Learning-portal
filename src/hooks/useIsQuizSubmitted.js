import { useSelector } from "react-redux";
import { useGetQuizMarksQuery } from "../features/quizMark/quizMarkApi";
import { useEffect, useState } from "react";
import { selectAuth } from "../features/auth/select";

const useIsQuizSubmitted = (videoId) => {
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(undefined);
  const { user } = useSelector(selectAuth);
  const { data: quizMark } = useGetQuizMarksQuery();

  // check user this quiz is submitted
  useEffect(() => {
    const checkIsQuizSubmitted = quizMark?.find(
      (m) => m.student_id == user?.id && m.video_id == videoId
    );

    setIsQuizSubmitted(checkIsQuizSubmitted);
  }, [quizMark, videoId, user]);

  return isQuizSubmitted;
};

export default useIsQuizSubmitted;
