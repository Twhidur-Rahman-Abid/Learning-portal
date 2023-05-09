import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetAssignmentMarkQuery } from "../../features/assignmentMark/assignmentMarkAPi";
import { useGetQuizMarksQuery } from "../../features/quizMark/quizMarkApi";

import { createLeaderboard } from "../../features/leaderboard/leaderboard";
import { selectAuth } from "../../features/auth/select";

const Leaderboard = () => {
  const dispatch = useDispatch();

  const { leaderboard } = useSelector((state) => state.leaderboard);
  const { user } = useSelector(selectAuth);

  // current user rank
  const userRank = leaderboard?.filter((r) => r.student_id === user.id) || [];
  // filter top 20 rank
  const filterTop_20_Rank = (r) => r.rank < 21;

  const { data: assignmentMark, isSuccess: isAssignmentSuccess } =
    useGetAssignmentMarkQuery();
  const { data: quizMark, isSuccess: isQuizSuccess } = useGetQuizMarksQuery();

  useEffect(() => {
    if (isAssignmentSuccess && isQuizSuccess)
      dispatch(createLeaderboard({ assignmentMark, quizMark }));
  }, [isAssignmentSuccess, isQuizSuccess, dispatch, assignmentMark, quizMark]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr>
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              {userRank?.map((sr) => {
                const {
                  student_name,
                  student_id,
                  rank,
                  quizMark,
                  assignmentMark,
                  totalMark,
                } = sr;
                return (
                  <tr key={student_id} className="border-2 border-cyan">
                    <td className="table-td text-center font-bold">{rank}</td>
                    <td className="table-td text-center font-bold">
                      {student_name}
                    </td>
                    <td className="table-td text-center font-bold">
                      {quizMark}
                    </td>
                    <td className="table-td text-center font-bold">
                      {assignmentMark}
                    </td>
                    <td className="table-td text-center font-bold">
                      {totalMark}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr className="border-b border-slate-600/50">
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              {leaderboard?.filter(filterTop_20_Rank)?.map((leader) => {
                const {
                  student_name,
                  student_id,
                  rank,
                  quizMark,
                  assignmentMark,
                  totalMark,
                } = leader;
                return (
                  <tr className="border-b border-slate-600/50" key={student_id}>
                    <td className="table-td text-center">{rank}</td>
                    <td className="table-td text-center">{student_name}</td>
                    <td className="table-td text-center">{quizMark}</td>
                    <td className="table-td text-center">{assignmentMark}</td>
                    <td className="table-td text-center">{totalMark}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
