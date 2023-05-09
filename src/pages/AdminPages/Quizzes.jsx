import React, { useState } from "react";
import { useDispatch } from "react-redux";

// import components
import Table from "../../components/Dashboard/Table/Table";
import Button from "../../components/Ui/Button";
import Error from "../../components/Ui/Error";
import QuizModal from "../../components/Dashboard/QuizModal";

// RTK query hooks
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from "../../features/quizzes/quizzesApi";

// action
import { addeditableQuiz } from "../../features/quizzes/quizzesSlice";
import TableLoader from "../../components/Ui/Loader/TableLoader";

const Quizzes = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // redux hooks
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();

  // handle edit able quiz
  const handleEdit = (quiz) => {
    // add editable quiz
    dispatch(addeditableQuiz(quiz));
    setShowModal(true);
  };

  // handle delete quiz
  const handleDelete = (id) => {
    deleteQuiz(id);
  };

  // decide what to render
  let content = null;
  if (isLoading) content = <TableLoader />;
  if (!isLoading && isError)
    content = <Error message="There was an error occur!" />;
  if (!isLoading && !isError && quizzes?.length === 0)
    content = <div>Not quiz found!</div>;
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <Table tableHeaders={["Question", "Video", "Action"]}>
        {quizzes.map((quiz) => {
          const { id, question, video_title } = quiz;

          return (
            <tr key={id}>
              <td className="table-td">{`Quiz ${id} - ${question}`}</td>
              <td className="table-td">{video_title}</td>
              <td className="table-td flex gap-x-2">
                <button onClick={() => handleDelete(id)}>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button onClick={() => handleEdit(quiz)}>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          );
        })}
      </Table>
    );
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <Button onClick={() => setShowModal(true)}>Add Quiz</Button>

          <div className="overflow-x-auto mt-4">
            {/* quiz table */}
            {content}
          </div>
        </div>
      </div>

      <QuizModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default Quizzes;
