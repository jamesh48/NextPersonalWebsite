import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import { useMobileBrowserCheck } from '@shared/globalUtils';

const Header = () => {
  const router = useRouter();
  const mobileBrowserState = useMobileBrowserCheck();

  const handleChange = (ev: React.SyntheticEvent, value: '0' | '1' | '2') => {
    ev.preventDefault();
    const hrefMap = (() => {
      if (mobileBrowserState) {
        return {
          '0': '/',
          '1': '/fullstack/contact',
          '2': '',
        };
      }
      return {
        '0': '/',
        '1': '/fullstack/minesweeper',
        '2': '/fullstack/contact',
      };
    })();

    router.push(hrefMap[value]);
  };

  return (
    <>
      <Tabs
        onChange={handleChange}
        sx={{
          position: 'sticky',
          top: 0,
          width: mobileBrowserState ? '100%' : '75%',
          display: 'flex',
          zIndex: 1,
          justifyContent: 'center',
          height: '3rem',
          margin: '0 auto',
          alignSelf: 'center',
        }}
      >
        <Tab
          label="Home"
          sx={{
            backgroundColor: 'ivory',
            flex: 1,
            minWidth: 'unset',
            maxWidth: 'unset',
          }}
        />
        {!mobileBrowserState ? (
          <Tab
            label="Minesweeper"
            sx={{
              backgroundColor: 'ivory',
              flex: 1,
              minWidth: 'unset',
              maxWidth: 'unset',
            }}
          />
        ) : null}

        <Tab
          label="Contact"
          sx={{
            backgroundColor: 'ivory',
            flex: 1,
            minWidth: 'unset',
            maxWidth: 'unset',
          }}
        />
      </Tabs>
    </>
  );
};

export default Header;
