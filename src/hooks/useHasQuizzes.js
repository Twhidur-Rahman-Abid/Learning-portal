import { useEffect, useState } from "react";
import { useGetQuizzesQuery } from "../features/quizzes/quizzesApi";

const useHasQuizzes = (videoId) => {
  const [hasQuizzes, setHasQuizzes] = useState(null);
  const { data: quizzes, isSuccess } = useGetQuizzesQuery(videoId);

  useEffect(() => {
    if (isSuccess) {
      setHasQuizzes(quizzes);
    }
  }, [isSuccess, quizzes, videoId]);
  return hasQuizzes;
};

export default useHasQuizzes;
