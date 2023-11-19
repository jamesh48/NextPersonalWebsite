import React from 'react';
import { FooterItemContainer } from './FooterItemContainer';
// import { mobileBrowserFunction } from 'GlobalUtils';
import { mobileBrowserCheck } from '@shared/globalUtils';
import { Box } from '@mui/material';
// import { useGlobalContext } from 'GlobalStore';
// import './footerStyles.scss';

interface FooterProps {
  footerJSON: { iconLink: string; imageUrl: string }[];
}
function Footer(props: FooterProps) {
  const [images, setImages] = React.useState([
    { url: '', loaded: false, iconLink: '' },
  ]);
  const [mb, setMb] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  // const [{ mobileBrowser }, globalDispatch] = useGlobalContext();

  //Set Mobile Browser
  React.useEffect(() => {
    const mobileBrowser = mobileBrowserCheck();
    setMb(mobileBrowser);
  }, []);

  const incrementImageLoad = (i: number) => {
    setImages((x) => {
      x[i].loaded = true;
      return [...x];
    });
  };

  React.useEffect(() => {
    if (images.every((image) => image.loaded)) {
      setIsLoaded(true);
    }
  }, [images]);

  React.useEffect(() => {
    setImages(
      props.footerJSON.map(({ imageUrl, iconLink }, loadedIndex) => {
        let img = new Image();
        img.onload = () => incrementImageLoad(loadedIndex);
        img.src = imageUrl;

        return {
          iconLink: iconLink,
          url: imageUrl,
          loaded: false,
        };
      })
    );
  }, []);

  return isLoaded ? (
    <Box
      id="footerContainer"
      className={
        mb ? `footer-container footer-container--Mobile` : `footer-container`
      }
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '5vh',
        width: mb ? '90%' : '75%',
        margin: '0 auto',
      }}
    >
      <Box
        id="footer-items-container"
        sx={{
          display: 'flex',
          width: '100%',
          border: '3px solid darkslategray',
          borderBottom: 'none',
          backgroundColor: 'rgb(255, 255, 240)',
          borderRadius: '0.7% / 25%',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        {images.map((iconData, iconIndex) => {
          return <FooterItemContainer key={iconIndex} iconData={iconData} />;
        })}
      </Box>
    </Box>
  ) : null;
}

export default Footer;
