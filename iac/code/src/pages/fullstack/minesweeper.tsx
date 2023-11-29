// import Script from 'next/script';
// import Link from 'next/link';
import { appInitialState } from '@app/appSlice';
import { useSelector } from '@app/reduxHooks';
import GlobalStore from '@app/store';
import { Box } from '@mui/material';
import { useIsSsr } from '@shared/customHooks';
import { useMobileBrowserCheck, smallWindowCheck } from '@shared/globalUtils';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

const MinesweeperHome = () => {
  const [_isIpad, setIsIpad] = useState(false);

  useEffect(() => {
    window.__INITIAL__DATA__ = {};
    if (navigator.userAgent.match(/iPad/i)) {
      setIsIpad(true);
    }
  }, []);

  return (
    <Box
      className="minesweeper-proxy-root"
      id="minesweeper-proxy-root"
      sx={{
        margin: '0 auto',
        width: '75%',
        height: '90vh',
        '.header-nav': {
          mt: '.75rem',
          '.header-nav-ul': {
            margin: '0 auto',
            width: '75%',
          },
        },
        '#main-space-container': {
          height: '90% !important',
          '#total-board': {
            height: '70%',
            width: '65%',
            '.sweep-square': {
              fontSize: '2rem',
            },
          },
          '#total-board.intermediate, #total-board.advanced': {
            width: '100%',
            height: '100%',
          },
          '.milli-second-timer-container': {
            padding: '2rem 0',
          },
        },
      }}
    >
      <Box
        id="minesweeper-root"
        className="container websiteMinesweeperAdjust"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          'loading-indicator': {
            textRendering: 'geometricPrecision',
            fontWeight: 150,
            fontSize: '4rem',
          },
          '#smiley-bar': {
            height: '2.5rem',
            '#flags-remaining': {
              textRendering: 'geometricPrecision',
              fontWeight: 300,
              fontSize: '1.5rem',
              paddingLeft: '.5rem',
            },
          },
          '#milli-second-timer': {
            fontSize: '3rem',
            textRendering: 'geometricPrecision',
            border: 'none !important',
            borderTop: '1px solid ivory !important',
            letterSpacing: '.025rem',
          },
          '#skill-level-selector': {
            button: {
              fontSize: '1.5rem',
              width: '100%',
              padding: '.5% 0',
              color: 'black',
              '&:hover': {
                color: 'ivory',
              },
            },
          },
        }}
      >
        <p className="loading-indicator">Loading...</p>
      </Box>
    </Box>
  );
};
const Minesweeper = () => {
  const isSsr = useIsSsr();
  let appInitialProps = {};
  if (!isSsr) {
    appInitialProps = {
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
      <MinesweeperHome />
    </Provider>
  );
};

export default Minesweeper;
