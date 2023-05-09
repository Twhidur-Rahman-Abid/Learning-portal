import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import AssignmentModal from "./AssignmentModal";

//  hooks
import useHasAssignment from "../../hooks/useHasAssignment";
import useHasQuizzes from "../../hooks/useHasQuizzes";
import useIsAssignmentSubmitted from "../../hooks/useIsAssignmentSubmitted";
import useIsQuizSubmitted from "../../hooks/useIsQuizSubmitted";
import Worning from "../Ui/Worning";

const Description = ({ video }) => {
  const [showModal, setShowModal] = useState(false);
  const [worning, setWorning] = useState("");

  const { id, title, description, createdAt } = video || {};

  // hooks
  const isAssignmentSubmitted = useIsAssignmentSubmitted(id);
  const isQuizSubmitted = useIsQuizSubmitted(id);

  const hasAssignment = useHasAssignment(id);
  const hasQuizzes = useHasQuizzes(id);

  // close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // handle worning
  const handleWorning = (message) => {
    setWorning(message);
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </h1>

        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {moment(createdAt).format("DD MMM YYYY h:mm:ss A")}
        </h2>

        <div className="flex gap-4 pb-4">
          {hasAssignment?.id &&
            (isAssignmentSubmitted ? (
              <span
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                onClick={() =>
                  handleWorning("Already you have submitted the assignment!")
                }
              >
                এসাইনমেন্ট
              </span>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                disabled={isAssignmentSubmitted}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                এসাইনমেন্ট
              </button>
            ))}

          {hasQuizzes?.length > 0 &&
            (isQuizSubmitted ? (
              <span
                onClick={() =>
                  handleWorning("Already you have submitted the quiz!")
                }
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                কুইজে অংশগ্রহণ করুন
              </span>
            ) : (
              <Link
                to={`/quizzes/${id}`}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                কুইজে অংশগ্রহণ করুন
              </Link>
            ))}
        </div>
        {worning && (
          <Worning onClick={() => setWorning("")} message={worning} />
        )}
        <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        <AssignmentModal
          showModal={showModal}
          hasAssignment={hasAssignment}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default Description;
