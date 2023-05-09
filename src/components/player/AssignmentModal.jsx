import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import component
import Modal from "../Ui/Modal";
import Input from "../Input/Input";

import { useSubmitAssignmentMutation } from "../../features/assignmentMark/assignmentMarkAPi";

const AssignmentModal = ({ showModal, closeModal, hasAssignment }) => {
  const [input, setInput] = useState("");

  const { user } = useSelector((state) => state.auth);

  const [submitAssignment, { isSuccess: isSubAssignmentSuccess }] =
    useSubmitAssignmentMutation();

  // time to assignment create
  const assignmentCreatedAt = new Date().toISOString();

  // assignment
  const assignment = {
    student_id: user?.id,
    student_name: user?.name,
    assignment_id: hasAssignment?.id,
    title: hasAssignment?.title,
    totalMark: 100,
    mark: 0,
    createdAt: assignmentCreatedAt,
    repo_link: input,
    status: "pending",
  };

  // handle assignment submit
  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    const isAssignmentSubmit = window.confirm(
      "Are you sure you want to submit?"
    );
    if (isAssignmentSubmit) {
      submitAssignment(assignment);
    }
  };

  // Modal will close if the assignment submission is successful
  useEffect(() => {
    if (isSubAssignmentSuccess) {
      closeModal();
    }
  }, [isSubAssignmentSuccess]);

  // clear input
  useEffect(() => {
    if (!showModal) {
      setInput("");
    }
  }, [showModal]);

  return (
    showModal && (
      <Modal closeModal={closeModal}>
        <h1 className="mb-6 text-2xl font-semibold">
          <span className="text-sky-400">এসাইনমেন্ট</span> জমা দিন
        </h1>

        <h2 className="text-lg mb-6 font-semibold tracking-tight text-slate-100">
          Title : {hasAssignment?.title}
        </h2>

        <form onSubmit={handleSubmitAssignment}>
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-100">
              গিটহাব রিপোসিটরি লিঙ্ক
            </span>
          </label>
          <Input
            type="text"
            value={input}
            required
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://github.com/Learn-with-Sumit/assignment-1"
            classNamees="rounded-md"
          />
          <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
            Submit
          </button>
        </form>
      </Modal>
    )
  );
};

export default AssignmentModal;
