import { Box } from '@mui/material';
import React from 'react';

interface FooterItemContainerProps {
  iconData: {
    url: string;
    iconLink: string;
    loaded: boolean;
  };
}
export const FooterItemContainer = (props: FooterItemContainerProps) => {
  return (
    <Box
      className="footerItemContainer"
      onClick={() => {
        window.open(props.iconData.iconLink);
      }}
      sx={{ display: 'flex', width: '100%', alignItems: 'center' }}
    >
      <Box
        sx={{
          backgroundSize: 'contain',
          opacity: 0.4,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flex: 1,
          height: '80%',
        }}
        style={{ backgroundImage: `url(${props.iconData.url})` }}
      ></Box>
    </Box>
  );
};
