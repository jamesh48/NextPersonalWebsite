import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@app/store';
import { SmileImageProps } from './marqueeTypes';

interface MarqueeInitialState {
  smileImage: { loaded: boolean; url: string };
}
const marqueeInitialState: MarqueeInitialState = {
  smileImage: { url: '', loaded: false },
};
export const marqueeSlice = createSlice({
  name: 'marquee',
  initialState: marqueeInitialState,
  reducers: {
    setSmileImage: (state, action: PayloadAction<SmileImageProps>) => {
      state.smileImage = action.payload;
    },
  },
});

export const { setSmileImage } = marqueeSlice.actions;

export const getSmileImage = (state: RootState) => state.marquee.smileImage;

export default marqueeSlice.reducer;
