import type { RootState } from '@app/store'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { PortfolioJSONEntry } from './portfolioTypes'

interface PortfolioInitialSate {
	outerContainerData: PortfolioJSONEntry[][][][]
	portfolioImages: {
		allLoaded: boolean
		imgArr: PortfolioJSONEntry[][][]
	}
}

const portfolioInitialState: PortfolioInitialSate = {
	outerContainerData: [],
	portfolioImages: { allLoaded: false, imgArr: [] },
}

export const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState: portfolioInitialState,
	reducers: {
		setPortfolioImages: (
			state,
			action: PayloadAction<{
				imgArr: PortfolioJSONEntry[][]
			}>,
		) => {
			state.portfolioImages = {
				allLoaded: true,
				imgArr: state.portfolioImages.imgArr.concat([action.payload.imgArr]),
			}
		},
		formatOuterContainerData: (state, action: PayloadAction<any>) => {
			state.outerContainerData = state.outerContainerData.concat([
				action.payload,
			])
		},
	},
})

export const { setPortfolioImages, formatOuterContainerData } =
	portfolioSlice.actions

export const getPortfolioImages = (state: RootState) =>
	state.portfolio.portfolioImages
export const getOuterContainerData = (state: RootState) =>
	state.portfolio.outerContainerData

export default portfolioSlice.reducer
