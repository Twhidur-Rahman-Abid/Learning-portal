import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetAssignmentMarkQuery } from "../features/assignmentMark/assignmentMarkAPi";
import useHasAssignment from "./useHasAssignment";

import { selectAuth } from "../features/auth/select";

const useIsAssignmentSubmitted = (videoId) => {
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState(undefined);
  const { user } = useSelector(selectAuth);
  const hasAssignment = useHasAssignment(videoId);

  const { data: assignmentMark } = useGetAssignmentMarkQuery();

  // check user this assignment submitted
  useEffect(() => {
    const AssignmentSubmitted = assignmentMark?.find(
      (m) => m?.student_id == user?.id && m?.assignment_id == hasAssignment?.id
    );
    setIsAssignmentSubmitted(AssignmentSubmitted);
  }, [assignmentMark, user, videoId, hasAssignment]);

  return isAssignmentSubmitted;
};

export default useIsAssignmentSubmitted;
