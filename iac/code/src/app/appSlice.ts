import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AppInitialState {
  mobileBrowserState: boolean;
  smallWindowState: boolean;
  portraitState: boolean;
}
export const appInitialState: AppInitialState = {
  mobileBrowserState: false,
  smallWindowState: false,
  portraitState: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setMobileBrowserState: (state, action: PayloadAction<boolean>) => {
      state.mobileBrowserState = action.payload;
    },
    setSmallWindowState: (state, action: PayloadAction<boolean>) => {
      state.smallWindowState = action.payload;
    },
    setPortraitState: (state, action: PayloadAction<boolean>) => {
      state.portraitState = action.payload;
    },
  },
});

export const { setPortraitState } = appSlice.actions;

export const getMobileBrowserState = (state: RootState) =>
  state.app.mobileBrowserState;

export const getSmallWindowState = (state: RootState) =>
  state.app.smallWindowState;

export const getPortraitState = (state: RootState) => state.app.portraitState;

export default appSlice.reducer;
