import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import { MarqueeInnerProps } from './marqueeTypes';

const MCLandscape = (props: MarqueeInnerProps) => {
  const bigSmile = useMediaQuery('(min-width:1600px) and (max-width: 1750px)');

  const mediumSmile = useMediaQuery(
    '(min-width:1300px) and (max-width: 1500px)'
  );

  const smallSmile = useMediaQuery(
    '(min-width:1150px) and (max-width: 1300px)'
  );

  const smileFlex = (() => {
    if (bigSmile) {
      return { flex: 0.4, minHeight: '40rem' };
    }
    if (mediumSmile) {
      return { flex: 0.5, minHeight: '25rem' };
    }

    if (smallSmile) {
      return { flex: 0.6, minHeight: '25rem' };
    }
    return { flex: 0.5, minHeight: '25rem' };
  })();
  return (
    <Box
      id="marquee-container"
      className={`portfolioFader`}
      sx={{ display: 'flex' }}
    >
      <Box sx={{ height: '100%' }} id="about-me-marquee-details">
        <Typography
          id="about-me-marquee-title"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '3rem',
            height: '25%',
            alignItems: 'center',
          }}
        >
          James Hrivnak
        </Typography>
        <Box>
          <Box
            id="marquee-contents"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: 'column', flex: 0.9 }}
              id="marquee-paragraphs"
            >
              <Typography
                id="about-me-marquee-description-1"
                sx={{
                  width: '97.5%',
                  lineHeight: 1.95,
                  fontSize: '1.5vw',
                  fontWeight: 200,
                  letterSpacing: '.25px',
                }}
              >
                {props.paragraphOne}
              </Typography>
              <Divider
                sx={{
                  background: 'ivory',
                  marginY: '1rem',
                  visibility: 'hidden',
                }}
              />
              <Typography
                id="about-me-marquee-description-2"
                sx={{
                  width: '97.5%',
                  lineHeight: 1.95,
                  fontSize: '1.5vw',
                  fontWeight: 200,
                  letterSpacing: '.25px',
                }}
              >
                {props.paragraphTwo}
              </Typography>
            </Box>
            <Box
              id="smile-container"
              sx={{
                backgroundImage: `url(${props.smileImage.url})`,
                maxWidth: '50%',
                minWidth: '27.5%',
                backgroundSize: 'cover',
                border: '1px solid ivory',
                backgroundPositionY: '25%',
                backgroundPositionX: '75%',
                backgroundRepeat: 'no-repeat',
                borderRadius: '50%',
                ...smileFlex,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MCLandscape;
