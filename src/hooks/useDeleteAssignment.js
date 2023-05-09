import { useEffect } from "react";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from "../features/assignments/assignmentsApi";

const useDeleteAssignment = (videoId) => {
  const [deleteAssignment] = useDeleteAssignmentMutation();

  // RTK query hook
  const { data: asssignments, isSuccess } = useGetAssignmentsQuery();

  useEffect(() => {
    if (videoId && isSuccess) {
      // find assignment id
      const findAssignmentId = asssignments.find(
        (ass) => ass.video_id == videoId
      )?.id;

      // delte assignment
      deleteAssignment(findAssignmentId);
    }
  }, [videoId, isSuccess]);
};

export default useDeleteAssignment;
