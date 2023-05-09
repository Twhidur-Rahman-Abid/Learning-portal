import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaderboard: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    createLeaderboard: (state, action) => {
      /* create leaderboard

      - get assignmentMarks and quizMarks from action.payload
      - merge marks
      - celculate marks
      - sort total marks in descending
      - create rank leaderboard
          - determining what to add to the current element rank
          - get individual assignment marks
          - get individual assignment marks

    */
      const { assignmentMark, quizMark } = action.payload;

      // Merge all mark
      const marge_all_mark = (markReports) => {
        let margeMark = [];

        markReports?.forEach((mark) => {
          // find index of mark
          const findIndex = margeMark.findIndex(
            (r) => r.student_id == mark.student_id
          );
          // search already mereged mark
          const search = margeMark.find((r) => r.student_id == mark.student_id);

          if (!search) {
            margeMark.push({
              ...mark,
              mark: [mark.mark],
            });
          } else {
            margeMark[findIndex] = {
              ...search,
              mark: [...search.mark, mark.mark],
            };
          }
        });

        return margeMark;
      };

      // merged mark
      const quizMarkMerged = marge_all_mark(quizMark);
      const assignmentMarkMerged = marge_all_mark(assignmentMark);
      const totalMarkMerged = marge_all_mark([...quizMark, ...assignmentMark]);

      // mark calculator
      const markCalculator = (arr) => {
        const calculateMark = arr.map((markReport) => {
          return {
            ...markReport,
            mark: markReport.mark.reduce((a, c) => Number(a) + Number(c), 0),
          };
        });

        return calculateMark;
      };

      // get ceculated mark
      const getQuizMark = markCalculator(quizMarkMerged);
      const getAssignmentMArk = markCalculator(assignmentMarkMerged);
      const totalMark = markCalculator(totalMarkMerged).sort(
        (a, b) => Number(b.mark) - Number(a.mark)
      );

      // get individual quiz marks
      const getIndividualQuizMarks = (student_id) => {
        // filter current student quiz mark

        return getQuizMark?.find((m) => m.student_id == student_id)?.mark;
      };

      // get individual assignment marks
      const getIndividualAssignmentMarks = (student_id) => {
        // filter current student assigmnet mark
        return getAssignmentMArk?.find((m) => m.student_id == student_id)?.mark;
      };

      // decide what to add to the current element rank.
      const rankCreator = (arr) => {
        const r = arr.reduce((a, c) => {
          return c.rank + 1;
        }, 1);

        return r;
      };

      // create rnak leaderboard
      const leaderboard = () => {
        const markReports = [];

        totalMark?.forEach((markReport, i) => {
          const { student_id, student_name, mark: totalMark } = markReport;
          /*
          If the mark of the previous mark report matches the mark of the current mark report,
          then the rank of the previous mark report will be the rank of the current mark report;
          otherwise, a new rank will be created.
          */

          if (totalMark === markReports[i - 1]?.totalMark) {
            // Push mark report
            markReports.push({
              student_id,
              student_name,
              quizMark: getIndividualQuizMarks(student_id),
              assignmentMark: getIndividualAssignmentMarks(student_id),
              rank: markReports[i - 1]?.rank,
              totalMark,
            });
          } else {
            // Push mark report
            markReports.push({
              student_id,
              student_name,
              quizMark: getIndividualQuizMarks(student_id),
              assignmentMark: getIndividualAssignmentMarks(student_id),
              rank: rankCreator(markReports),
              totalMark,
            });
          }
        });

        return markReports;
      };

      state.leaderboard = leaderboard();
    },
  },
});

export const { createLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
