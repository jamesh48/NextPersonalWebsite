import marqueeReducer from '../features/Marquee/marqueeSlice'
import nestedPortfolioReducer from '../features/Portfolio/nestedSlice'
import portfolioReducer from '../features/Portfolio/portfolioSlice'
import resumeReducer from '../features/Resume/resumeSlice'
import appReducer from './appSlice'

const rootReducer = {
	app: appReducer,
	marquee: marqueeReducer,
	portfolio: portfolioReducer,
	nestedPortfolio: nestedPortfolioReducer,
	resume: resumeReducer,
}

export default rootReducer
