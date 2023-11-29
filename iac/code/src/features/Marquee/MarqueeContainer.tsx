import Promise from 'bluebird';
import React, { useCallback, useEffect, useState } from 'react';
// import './marqueeContainer.scss';
const cfLink = process.env.NEXT_PUBLIC_CLOUDFRONTLINK;

import MCPortrait from './MarqueePortrait';
import MCLandscape from './MarqueeLandscape';
import { useDispatch, useSelector } from '@app/reduxHooks';
import { getSmallWindowState } from '@app/appSlice';
import { getSmileImage, setSmileImage } from './marqueeSlice';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { SmileImageProps } from './marqueeTypes';
import { useMobileBrowserCheck } from '@shared/globalUtils';

export interface MarqueeContainerProps {
  smileCallback: () => void;
}

const MarqueeContainer = (props: MarqueeContainerProps) => {
  const marqueeMobileBrowserState = useMobileBrowserCheck();
  const dispatch = useDispatch();
  const smileImage = useSelector(getSmileImage);
  const smallWindowState = useSelector(getSmallWindowState);

  const portraitState = useMediaQuery('(orientation: portrait)');

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

  const paragraphOne = `I have worked as an AWS Devops Engineer for the past two years. I am skilled in various services that AWS offers including EKS, ECS, ActiveMQ, Lambda/Serverless, CDK, and DynamoDB, among many others. My experience in this role has also equipped me with expertise in CI/CD pipelines, Docker, and Kubernetes. From a application development perspective, I also have a wealth of Fullstack Experience using Node, React, and Typescript.`;

  const paragraphTwo = `I am a highly motivated and detail-oriented professional, always striving for excellence in my work. I am adept at problem-solving and have a strong ability to analyze complex requirements and translate them into practical and efficient solutions. Additionally, my leadership experience in coordinating deployments and guiding frontend and backend developers further highlights my ability to work collaboratively and effectively in a team environment.`;

  /*
  /Load Portrait mode if its a mobileBrowser and is in portrait orientation
   OR--
  Load Portrait mode if its a browser and a small window
  */
  const mobileBrowserWithPortrait = marqueeMobileBrowserState && portraitState;
  const notMobileBrowserAndSmallWindow =
    !marqueeMobileBrowserState && smallWindowState;

  const portraitMode =
    smileImage.loaded &&
    (mobileBrowserWithPortrait || notMobileBrowserAndSmallWindow);

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
