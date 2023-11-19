import { useDispatch, useSelector } from '@app/reduxHooks';
import { Box, Typography, useMediaQuery } from '@mui/material';
import resumeDetails from '../../Data/Resume.json';
import IterateContainers from './IterateContainers';
import { exitHoverParams } from './resumeSlice';
import { getMobileBrowserState } from '@app/appSlice';
interface ResumeProps {
  smallWindowState: boolean;
  mobileBrowserState: boolean;
}
const Resume = (props: ResumeProps) => {
  const dispatch = useDispatch();
  const mobileBrowserState = useSelector(getMobileBrowserState);
  const landscapeOrientation = useMediaQuery('(orientation: landscape)');
  const portraitOrientation = useMediaQuery('(orientation: portrait)');
  return (
    <Box
      className="resumeContainer"
      sx={{
        textRendering: 'geometricPrecision',
        fontWeight: 150,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Typography
        className="resumeContainerTitle"
        sx={{
          alignSelf: 'center',
          padding: '5% 0',
          fontSize: mobileBrowserState ? '2.5vmax' : '3rem',
          ...(() => {
            if (landscapeOrientation) {
              return { marginBottom: '5%' };
            }
            if (portraitOrientation) {
              return { paddingBottom: 0 };
            }
            return {};
          })(),
        }}
      >
        Resume
      </Typography>
      <Box
        className="resumeUIContainer"
        onMouseLeave={() => {
          dispatch(exitHoverParams());
        }}
        sx={{
          margin: mobileBrowserState ? '5% 0' : '1% 0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {IterateContainers({
          mobileBrowser: mobileBrowserState,
          resumeDetails: resumeDetails,
        })}
      </Box>
    </Box>
  );
};

export default Resume;
