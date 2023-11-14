import Head from 'next/head';
import PortfolioJSON from './Data/PortfolioDataJSON';
import { Provider } from 'react-redux';
import GlobalStore from '@app/store';
import MarqueeContainer from './features/Marquee/MarqueeContainer';
import PortfolioCarousel from './features/Portfolio/PortfolioCarousel/Carousel';
import { mobileBrowserCheck, smallWindowCheck } from './shared/globalUtils';
import styles from './styles/Home.module.scss';
import { Box } from '@mui/material';
import { useIsSsr } from '@shared/customHooks';
import {
  appInitialState,
  getMobileBrowserState,
  getSmallWindowState,
  setPortraitState,
} from '@app/appSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@app/reduxHooks';
import Resume from './features/Resume/Resume';

const Home = (props: { portfolioJSON: {}[] }) => {
  const [smileLoaded, setSmileLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const portraitEventListener = (event: MediaQueryListEvent) => {
      dispatch(setPortraitState(event.matches));
    };
    const mediaQueryList = window.matchMedia('(orientation: portrait)');
    mediaQueryList.addEventListener('change', portraitEventListener);
    return () =>
      mediaQueryList.removeEventListener('change', portraitEventListener);
  }, [dispatch]);

  const smileCallback = useCallback(() => {
    setSmileLoaded(true);
  }, []);

  const smallWindowState = useSelector(getSmallWindowState);
  const mobileBrowserState = useSelector(getMobileBrowserState);

  return (
    <Box className={styles.container}>
      <Head>
        <title>James Hrivnak</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box
          id="homeContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            width: '75%',
          }}
        >
          <Box
            id="about-me-root"
            sx={{
              height: '90vh',
              paddingBottom: '5%',
            }}
            data-name="About Me"
          >
            <MarqueeContainer smileCallback={smileCallback} />
          </Box>

          <Box
            data-name="Resume"
            id="resume-root"
            className="container"
            sx={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}
          >
            <Resume
              smallWindowState={smallWindowState}
              mobileBrowserState={mobileBrowserState}
            />
          </Box>

          <Box
            data-name="Portfolio"
            id="portfolio-root"
            sx={{
              minHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: 0,
              marginBottom: 0,
              width: '100%',
              margin: '0 auto',
              'p, h3, h4, h5, h6': { margin: '1%' },
            }}
          >
            <PortfolioCarousel portfolioJSON={props.portfolioJSON} />
          </Box>
        </Box>
      </main>

      <footer className={styles.footer}></footer>
    </Box>
  );
};

const App = (props: {}) => {
  const isSsr = useIsSsr();
  let appInitialProps = {};
  if (!isSsr) {
    appInitialProps = {
      mobileBrowserState: mobileBrowserCheck(),
      smallWindowState: smallWindowCheck(),
    };
  }
  GlobalStore.prototype.configureGlobalStore({
    app: {
      ...appInitialState,
      ...appInitialProps,
    },
  });
  return (
    <Provider store={GlobalStore.prototype.getStore()}>
      <Home portfolioJSON={PortfolioJSON} />
    </Provider>
  );
};

export default App;
