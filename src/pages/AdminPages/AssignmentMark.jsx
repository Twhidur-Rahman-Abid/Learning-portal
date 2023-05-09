import React from "react";
import moment from "moment";

// import components
import MarkTd from "../../components/Dashboard/AssignmentMark/MarkTd";
import Table from "../../components/Dashboard/Table/Table";
import Error from "../../components/Ui/Error";

import { useGetAssignmentMarkQuery } from "../../features/assignmentMark/assignmentMarkAPi";
import TableLoader from "../../components/Ui/Loader/TableLoader";

const AssignmentMark = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarkQuery();

  // total number of assignments (total)
  const numberOfAssignments = assignmentMarks?.length;
  // total number of unmarked assignments (pending)
  const pendingAssignments = assignmentMarks?.filter(
    (ass) => ass.status === "pending"
  )?.length;
  // total number of marked assignments (mark sent)
  const publishedAssignments = assignmentMarks?.filter(
    (ass) => ass.status === "published"
  )?.length;

  // decide what to render
  let content = null;
  if (isLoading) content = <TableLoader />;
  if (!isLoading && isError)
    content = <Error message="There was an error occur!" />;
  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = (
      <Table
        tableHeaders={[
          "Assignment",
          "Date",
          "Student Name",
          "Repo Link",
          "Mark",
        ]}
      >
        {/* tbale row */}
        {assignmentMarks.map((assignmentMark) => {
          const {
            id,
            title,
            student_name,
            repo_link,
            createdAt,
            status,
            mark: resposeMark,
          } = assignmentMark || {};

          return (
            <tr key={id}>
              <td className="table-td">{title}</td>
              <td className="table-td">
                {moment(createdAt).format("DD MMM YYYY h:mm:ss A")}
              </td>
              <td className="table-td">{student_name}</td>
              <td className="table-td">{repo_link}</td>
              {/* if the status is published render resposeMarke else render mark input */}
              {status === "published" ? (
                <td className="table-td">{resposeMark}</td>
              ) : (
                // mark td
                <MarkTd id={id} />
              )}
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
          <ul className="assignment-status">
            <li>
              Total <span>{numberOfAssignments}</span>
            </li>
            <li>
              Pending <span>{pendingAssignments}</span>
            </li>
            <li>
              Mark Sent <span>{publishedAssignments}</span>
            </li>
          </ul>
          <div className="overflow-x-auto mt-4">
            {/* assignment mark table */}
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmentMark;
