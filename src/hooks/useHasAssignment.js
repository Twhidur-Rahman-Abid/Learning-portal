import React, { useEffect, useState } from "react";
import { useGetAssignmentsQuery } from "../features/assignments/assignmentsApi";

const useHasAssignment = (videoId) => {
  const [hasAssignment, setHasAssignment] = useState(null);
  const { data: assignments, isSuccess } = useGetAssignmentsQuery(videoId);

  useEffect(() => {
    if (isSuccess) {
      setHasAssignment(assignments[0]);
    }
  }, [isSuccess, assignments, videoId]);

  return hasAssignment;
};

export default useHasAssignment;
