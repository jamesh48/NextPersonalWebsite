import { useDispatch } from '@app/reduxHooks';
import { Box, Typography } from '@mui/material';
import IterateContainers from './iterateContainers';
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
        <IterateContainers
          resumeDetails={[
            {
              title: 'Technical Skills',
              detail: [
                {
                  title: 'Programming',
                  detail: [{ highlightDetail: [{ title: 'goodbye' }] }],
                },
              ],
            },
            {
              title: 'Education',
              detail: [
                {
                  title: 'Hack Reactor @ Galvanize',
                  detail: [{ highlightDetail: [{ title: 'hello' }] }],
                },
              ],
            },
          ]}
          mobileBrowser={false}
        />
      </Box>
    </Box>
  );
};

export default Resume;
