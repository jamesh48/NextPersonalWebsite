import { Box } from '@mui/material';
import { MarqueeInnerProps } from './marqueeTypes';

const MCPortrait = (props: MarqueeInnerProps) => {
  return (
    <Box
      className={`marquee-container--Portrait portfolioFader`}
      sx={{ display: 'flex', height: '90%' }}
    >
      <div className="about-me-marquee-details">
        <h4 className="about-me-marquee-title">James Hrivnak</h4>
        <div className="marquee-content-container">
          <span className="marquee-contents">
            <div className="marquee-paragraphs">
              <p className="about-me-marquee-description">
                {props.paragraphOne}
              </p>
              <div
                className="smile-container"
                style={{ backgroundImage: `url(${props.smileImage.url})` }}
              ></div>
              <p className="about-me-marquee-description">
                {props.paragraphTwo}
              </p>
            </div>
          </span>
        </div>
      </div>
    </Box>
  );
};

export default MCPortrait;
