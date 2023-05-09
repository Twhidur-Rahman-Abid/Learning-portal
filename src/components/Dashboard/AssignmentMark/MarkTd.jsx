import React, { useState } from "react";
import { useEditAssignmentMarkMutation } from "../../../features/assignmentMark/assignmentMarkAPi";

const MarkTd = ({ id }) => {
  const [mark, setMark] = useState("");
  const [editAssignmentMark] = useEditAssignmentMarkMutation();
  const handleEditAssignmentMark = () => {
    editAssignmentMark({ id, data: { mark, status: "published" } });
  };
  return (
    <td className="table-td input-mark">
      <input
        max="100"
        value={mark}
        placeholder="100"
        onChange={(e) => setMark(e.target.value)}
      />
      <button onClick={handleEditAssignmentMark}>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </button>
    </td>
  );
};

export default MarkTd;
