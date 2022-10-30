import { Box, Typography } from '@mui/material';
import { MarqueeInnerProps } from './marqueeTypes';

const MCLandscape = (props: MarqueeInnerProps) => {
  return (
    <Box
      id="marquee-container"
      className={`portfolioFader`}
      sx={{ display: 'flex', height: '90vh', alignItems: 'center' }}
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
          <Box id="marquee-contents" sx={{ display: 'flex' }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', flex: 0.9 }}
              id="marquee-paragraphs"
            >
              <Typography
                id="about-me-marquee-description-1"
                sx={{
                  width: '97.5%',
                  lineHeight: 1.95,
                  fontSize: '1.5rem',
                  fontWeight: 200,
                  letterSpacing: '.25px',
                }}
              >
                {props.paragraphOne}
              </Typography>
              <Typography
                id="about-me-marquee-description-2"
                sx={{
                  width: '97.5%',
                  lineHeight: 1.95,
                  fontSize: '1.5rem',
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
                flex: 0.4,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MCLandscape;
