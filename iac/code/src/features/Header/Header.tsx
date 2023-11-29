import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import { mobileBrowserCheck } from '@shared/globalUtils';
import { useState, useEffect } from 'react';

const Header = () => {
  const router = useRouter();
  const [mobileBrowserState, setMobileBrowserState] = useState(false);
  const handleChange = (ev: React.SyntheticEvent, value: '0' | '1' | '2') => {
    ev.preventDefault();
    const hrefMap = {
      '0': '/',
      '1': '/fullstack/minesweeper',
      '2': '/fullstack/contact',
    };
    router.push(hrefMap[value]);
  };

  useEffect(() => {
    setMobileBrowserState(mobileBrowserCheck());
  }, []);

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
        <Tab
          label="Minesweeper"
          sx={{
            backgroundColor: 'ivory',
            flex: 1,
            minWidth: 'unset',
            maxWidth: 'unset',
          }}
        />
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
