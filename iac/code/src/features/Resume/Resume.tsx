import { useDispatch } from '@app/reduxHooks';
import { Box, Typography } from '@mui/material';
import resumeDetails from '../../Data/Resume.json';
import IterateContainers from './IterateContainers';
import { exitHoverParams } from './resumeSlice';
interface ResumeProps {
  smallWindowState: boolean;
  mobileBrowserState: boolean;
}
const Resume = (props: ResumeProps) => {
  const dispatch = useDispatch();
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
        sx={{ alignSelf: 'center', padding: '5% 0', fontSize: '3rem' }}
      >
        Resume
      </Typography>
      <Box
        className="resumeUIContainer"
        onMouseLeave={() => dispatch(exitHoverParams)}
        sx={{
          margin: '1% 0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {IterateContainers({
          mobileBrowser: false,
          resumeDetails: resumeDetails,
        })}
      </Box>
    </Box>
  );
};

export default Resume;
