import React, { useState } from "react";
import { useDispatch } from "react-redux";

// import components
import AssignmentModal from "../../components/Dashboard/Assignmet/AssignmentModal";
import Table from "../../components/Dashboard/Table/Table";
import Button from "../../components/Ui/Button";
import Error from "../../components/Ui/Error";

// RTK query hooks
import { useGetAssignmentsQuery } from "../../features/assignments/assignmentsApi";

// action
import { addEditableAssignment } from "../../features/assignments/assignmentsSlice";
import TableLoader from "../../components/Ui/Loader/TableLoader";
import useDeleteAssignment from "../../hooks/useDeleteAssignment";

const AssignmentPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState("");
  const dispatch = useDispatch();
  useDeleteAssignment(videoId);

  // RTK query hooks
  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();

  // open modal
  const openModal = () => {
    setShowModal(true);
  };

  // handle delete assignment
  const handleDelete = (id) => {
    // deleteAssignment(id);
    setVideoId(id);
  };

  // handle editable assignment
  const handleEditableAssignment = (assignment) => {
    // add editable assignment
    dispatch(addEditableAssignment(assignment));
    // open modal
    openModal();
  };

  // decide what to render
  let content = null;
  if (isLoading) content = <TableLoader />;
  if (!isLoading && isError)
    content = <Error message="There was an error occur!" />;
  if (!isLoading && !isError && assignments?.length === 0)
    content = <div>Not assignment found!</div>;
  if (!isLoading && !isError && assignments?.length > 0) {
    content = (
      <>
        <Table tableHeaders={["Title", "Video Title", "Mark", "Action"]}>
          {assignments?.map((assignment) => {
            const { id, title, video_id, video_title, totalMark } = assignment;
            return (
              <tr key={id}>
                <td className="table-td">{title}</td>
                <td className="table-td">{video_title}</td>
                <td className="table-td">{totalMark}</td>
                <td className="table-td flex gap-x-2">
                  {/* delete button */}
                  <button onClick={() => handleDelete(video_id)}>
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
                  {/* edit button */}
                  <button onClick={() => handleEditableAssignment(assignment)}>
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
      </>
    );
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <Button onClick={openModal}>Add Assignment</Button>

          <div className="overflow-x-auto mt-4">
            {/* assignments Table */}
            {content}
          </div>
        </div>
      </div>
      {/* assignment input modale */}
      <AssignmentModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default AssignmentPage;
