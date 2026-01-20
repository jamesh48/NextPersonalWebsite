import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface AppInitialState {
	mobileBrowserState: boolean
	smallWindowState: boolean
	portraitState: boolean
}
export const appInitialState: AppInitialState = {
	mobileBrowserState: false,
	smallWindowState: false,
	portraitState: false,
}

export const appSlice = createSlice({
	name: 'app',
	initialState: appInitialState,
	reducers: {
		setSmallWindowState: (state, action: PayloadAction<boolean>) => {
			state.smallWindowState = action.payload
		},
		setPortraitState: (state, action: PayloadAction<boolean>) => {
			state.portraitState = action.payload
		},
	},
})

export const { setPortraitState, setSmallWindowState } = appSlice.actions

export const getSmallWindowState = (state: RootState) =>
	state.app.smallWindowState

export const getPortraitState = (state: RootState) => state.app.portraitState

export default appSlice.reducer
