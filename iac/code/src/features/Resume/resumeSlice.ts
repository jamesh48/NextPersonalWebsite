import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface ResumeInitialState {
  hoverParams: [null | number, number | string | null];
}
const resumeInitialState: ResumeInitialState = {
  hoverParams: [null, null],
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: resumeInitialState,
  reducers: {
    exitHoverParams: (state) => {
      state.hoverParams = [null, null];
    },
    updateHoverParams: (
      state,
      action: PayloadAction<[null | number, number | string]>
    ) => {
      state.hoverParams = action.payload;
    },
  },
});

export const { exitHoverParams, updateHoverParams } = resumeSlice.actions;

export const getHoverParams = (state: RootState) => state.resume.hoverParams;
export default resumeSlice.reducer;
