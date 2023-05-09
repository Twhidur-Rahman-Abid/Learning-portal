import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizReport: [],
};

/* quizReport=[
  {
    question_id:1,
    options: [{option_id:1,isCurrect:true},{option_id:1,isCurrect:false},...]
  },
  ...
]
*/

const quizMarkSlice = createSlice({
  name: "quizMark",
  initialState,
  reducers: {
    // add quiz report
    addQuizReport: (state, action) => {
      state.quizReport.push(action.payload);
    },

    // edit quiz report
    editQuizReport: (state, action) => {
      /* possible action.payload
        {
          option_id: 1 / any number id,
          question_id: 1 / any number id,
          isCorrect: true / false,
        }
      */

      const { question_id, option_id } = action.payload;

      //findIndex - editable quiz report index
      const findIndex = state.quizReport.findIndex(
        (qr) => Number(qr.question_id) === Number(question_id)
      );

      // edited quiz report
      const editedQuizReport = {
        // current quizz report
        ...state?.quizReport[findIndex],

        // edit options
        options: state?.quizReport[findIndex]?.options?.map((opt) =>
          Number(opt.option_id) === Number(option_id)
            ? { ...opt, isCorrect: action.payload.isCorrect }
            : opt
        ),
      };

      state.quizReport[findIndex] = editedQuizReport;
    },

    // clean quiz report
    clearQuizReport: (state) => {
      state.quizReport = [];
    },
  },
});

export const { addQuizReport, editQuizReport, clearQuizReport } =
  quizMarkSlice.actions;
export default quizMarkSlice.reducer;
