import {
	useDispatch as ogDispatch,
	useSelector as ogSelector,
	type TypedUseSelectorHook,
} from 'react-redux'
import type { AppDispatch, RootState } from './store'

export const useDispatch = () => ogDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = ogSelector
