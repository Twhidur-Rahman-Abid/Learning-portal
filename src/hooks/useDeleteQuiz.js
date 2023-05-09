import { useEffect } from "react";
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from "../features/quizzes/quizzesApi";

const useDeleteQuiz = (videoId) => {
  const { data: quizzes, isSuccess } = useGetQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();

  useEffect(() => {
    if (videoId && isSuccess) {
      const filteredQuizzes = quizzes.filter(
        (quiz) => quiz.video_id == videoId
      );

      // delete quiz
      filteredQuizzes.forEach((quiz) => {
        deleteQuiz(quiz.id);
      });
    }
  }, [isSuccess, videoId]);
};

export default useDeleteQuiz;
