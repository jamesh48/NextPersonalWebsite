import Promise from 'bluebird';
import React, { useCallback, useEffect } from 'react';
// import './marqueeContainer.scss';
const cfLink = process.env.NEXT_PUBLIC_CLOUDFRONTLINK;

import MCPortrait from './MarqueePortrait';
import MCLandscape from './MarqueeLandscape';
import { useDispatch, useSelector } from '@app/reduxHooks';
import {
  getMobileBrowserState,
  getPortraitState,
  getSmallWindowState,
} from '@app/appSlice';
import { getSmileImage, setSmileImage } from './marqueeSlice';
import { Box, Typography } from '@mui/material';
import { MarqueeContainerProps, SmileImageProps } from './marqueeTypes';

const MarqueeContainer = (props: MarqueeContainerProps) => {
  const dispatch = useDispatch();
  const smileImage = useSelector(getSmileImage);
  const mobileBrowserState = useSelector(getMobileBrowserState);
  const smallWindowState = useSelector(getSmallWindowState);
  const portraitState = useSelector(getPortraitState);

  const handleSmileImage = useCallback(
    async (smileImageToLoad: SmileImageProps) => {
      const loadedSmileImage: SmileImageProps = await new Promise(
        (resolve, reject) => {
          let img = new Image();
          img.onload = () =>
            resolve({
              url: smileImageToLoad.url,
              title: smileImageToLoad.title,
              loaded: true,
            });
          img.onerror = () => {
            reject(
              new Error(`The ${smileImageToLoad.title} image failed to load`)
            );
          };
          img.src = smileImageToLoad.url;
        }
      );

      dispatch(setSmileImage(loadedSmileImage));
    },
    [dispatch]
  );

  useEffect(() => {
    handleSmileImage({
      url: `${cfLink}/main/main-images/linkedin.jpg`,
      title: 'Linkedin Photo',
      loaded: false,
    });
  }, [portraitState, handleSmileImage]);

  useEffect(() => {
    if (smileImage.loaded === true) {
      const timeout = setTimeout(() => {
        props.smileCallback();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [smileImage.loaded, props]);

  const paragraphOne = `I have just finished working on several software engineering applications- my favorite technologies are front end technologies like React and its testing frameworks, but I particularly enjoy working on optimizing backend Relational Databases like mySQL and Postgres. For example, I recently worked on horizontally scaling an Amazon Web Services microservice to take in a large RPS which mainly required optimizing database queries. I really enjoy coding- particularly working on teams while also working solo.`;

  const paragraphTwo = `I am kind, compassionate, empathetic and a good listener. I have a background in secular Buddhism, and have worked on compassionate and mindful teams in eldercare for the past two years. I value self care but I also like going in hard. I’ve trained for and have run a marathon, and I was also a competitive swimmer in college and now. I also have lived in two foreign countries and have visited 32 others.`;

  /*
  /Load Portrait mode if its a mobileBrowser and is in portrait orientation
   OR--
  Load Portrait mode if its a browser and a small window
  */
  const portraitMode =
    smileImage.loaded &&
    ((mobileBrowserState && portraitState) ||
      (!mobileBrowserState && smallWindowState));

  return portraitMode ? (
    <MCPortrait
      smileImage={smileImage}
      paragraphOne={paragraphOne}
      paragraphTwo={paragraphTwo}
    />
  ) : smileImage.loaded ? (
    <MCLandscape
      smileImage={smileImage}
      paragraphOne={paragraphOne}
      paragraphTwo={paragraphTwo}
    />
  ) : (
    <Box>
      <Typography>Marquee Contents Loading...</Typography>
    </Box>
  );
};

export default MarqueeContainer;
