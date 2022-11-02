import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';

const Header = () => {
  const router = useRouter();
  const handleChange = (ev: React.SyntheticEvent, value: '0' | '1' | '2') => {
    ev.preventDefault();
    const hrefMap = {
      '0': '/',
      '1': '/fullstack/minesweeper',
      '2': '/fullstack/contact',
    };
    router.push(hrefMap[value]);
  };
  return (
    <>
      <Tabs
        onChange={handleChange}
        sx={{
          position: 'sticky',
          top: 0,
          width: '75%',
          display: 'flex',
          zIndex: 1,
          justifyContent: 'center',
          height: '5.5rem',
          margin: '0 auto',
        }}
      >
        <Tab label="Home" sx={{ backgroundColor: 'ivory' }} />
        <Tab label="Minesweeper" sx={{ backgroundColor: 'ivory' }} />
        <Tab label="Contact" sx={{ backgroundColor: 'ivory' }} />
      </Tabs>
    </>
  );
};

export default Header;
