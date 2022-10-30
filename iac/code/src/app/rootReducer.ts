import appReducer from './appSlice';
import marqueeReducer from '../features/Marquee/marqueeSlice';

const rootReducer = {
  app: appReducer,
  marquee: marqueeReducer,
};

export default rootReducer;
