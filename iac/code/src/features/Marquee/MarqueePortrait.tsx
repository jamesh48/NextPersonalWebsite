import { Box, Typography, useMediaQuery } from '@mui/material';
import { MarqueeInnerProps } from './marqueeTypes';
import { useEffect, useState } from 'react';
import { useMobileBrowserCheck } from '@shared/globalUtils';

const MCPortrait = (props: MarqueeInnerProps) => {
  const mobileBrowserState = useMobileBrowserCheck();
  const portraitOrientation = useMediaQuery('(orientation: portrait)');
  const landscapeOrientation = useMediaQuery('(orientation: landscape)');
  const bigSmile = useMediaQuery('(min-width:1600px) and (max-width: 1750px)');
  const mediumSmile = useMediaQuery(
    '(min-width:1300px) and (max-width: 1500px)'
  );
  const smallSmile = useMediaQuery(
    '(min-width:1150px) and (max-width: 1300px)'
  );

  const smileFlex = (() => {
    if (bigSmile) {
      return 0.4;
    }
    if (mediumSmile) {
      return 0.5;
    }

    if (smallSmile) {
      return 0.6;
    }
    return 0.5;
  })();

  return (
    <Box
      className={`marquee-container--Portrait portfolioFader`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        height: portraitOrientation ? '100%' : '90%',
        ...(() => {
          if (landscapeOrientation) {
            return { minHeight: '90vh' };
          }
        })(),
      }}
    >
      <Box className="about-me-marquee-details" sx={{ height: '100%' }}>
        <Typography
          variant="h4"
          className="about-me-marquee-title"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2.5vw',
            height: '25%',
            alignItems: 'center',
            ...(() => {
              if (portraitOrientation) {
                return {
                  paddingBottom: '8%',
                  fontSize: '4.5vh',
                };
              }

              if (landscapeOrientation) {
                return {
                  fontSize: '4.5vw',
                };
              }
            })(),
          }}
        >
          James Hrivnak
        </Typography>
        <Box className="marquee-content-container">
          <Box
            className="marquee-contents"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box className="marquee-paragraphs" sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                className="about-me-marquee-description"
                sx={{
                  textRendering: 'geometricPrecision',
                  width: '97.5%',
                  lineHeight: '1.95',
                  fontSize: '1rem',
                  fontWeight: 200,
                  letterSpacing: '0.25px',
                }}
              >
                {props.paragraphOne}
              </Typography>
              <Box
                className="smile-container"
                sx={{
                  margin: '2.5% auto',
                  minHeight: '25rem',
                  width: mobileBrowserState ? '90%' : '50%',
                  padding: 0,
                  backgroundImage: `url(${props.smileImage.url})`,
                  backgroundPositionY: '25%',
                  backgroundPositionX: '75%',
                  backgroundSize: 'cover',
                  border: '1px solid ivory',
                  backgroundRepeat: 'no-repeat',
                  flex: smileFlex,
                }}
              ></Box>
              <Typography
                variant="body2"
                className="about-me-marquee-description"
                sx={{
                  textRendering: 'geometricPrecision',
                  width: '97.5%',
                  lineHeight: '1.95',
                  fontSize: '1rem',
                  fontWeight: 200,
                  letterSpacing: '0.25px',
                }}
              >
                {props.paragraphTwo}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MCPortrait;
