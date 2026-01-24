import type { RootState } from '@app/store'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface NestedPortfolioInitialState {
	nestedContainerData: unknown[]
	nestedIndicator: boolean
	nestedHovered: null | number
	hoveredIndexes: (number | null)[]
}
const nestedPortfolioInitialState: NestedPortfolioInitialState = {
	nestedContainerData: [],
	nestedIndicator: false,
	nestedHovered: null,
	hoveredIndexes: [null, null],
}

export const nestedPortfolioSlice = createSlice({
	name: 'nestedPortfolio',
	initialState: nestedPortfolioInitialState,
	reducers: {
		formatNestedContainerData: (state, action: PayloadAction<any>) => {
			state.nestedContainerData = action.payload
		},
		toggleNestedIndicator: (state, action: PayloadAction<boolean>) => {
			state.nestedIndicator = action.payload
		},
		setHoveredIndexes: (state, action: PayloadAction<(number | null)[]>) => {
			state.hoveredIndexes = action.payload
		},
		setNestedHovered: (state, action: PayloadAction<number>) => {
			state.nestedHovered = action.payload
		},
	},
})

export const {
	formatNestedContainerData,
	setNestedHovered,
	setHoveredIndexes,
	toggleNestedIndicator,
} = nestedPortfolioSlice.actions

export const getHoveredIndexes = (state: RootState) =>
	state.nestedPortfolio.hoveredIndexes
export const getNestedIndicator = (state: RootState) =>
	state.nestedPortfolio.nestedIndicator
export const getNestedContainerData = (state: RootState) =>
	state.nestedPortfolio.nestedContainerData
export const getNestedHovered = (state: RootState) =>
	state.nestedPortfolio.nestedHovered

export default nestedPortfolioSlice.reducer
