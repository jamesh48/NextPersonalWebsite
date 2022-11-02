import appReducer from './appSlice';
import marqueeReducer from '../features/Marquee/marqueeSlice';
import portfolioReducer from '../features/Portfolio/portfolioSlice';
import nestedPortfolioReducer from '../features/Portfolio/nestedSlice';
import resumeReducer from '../features/Resume/resumeSlice';

const rootReducer = {
  app: appReducer,
  marquee: marqueeReducer,
  portfolio: portfolioReducer,
  nestedPortfolio: nestedPortfolioReducer,
  resume: resumeReducer,
};

export default rootReducer;
