import { useDispatch } from '@app/reduxHooks';
import { Box, Typography } from '@mui/material';
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
          resumeDetails: [
            {
              // Title
              title: 'Recent Applications',
              detail: [
                {
                  // Section
                  title: 'Strava Top Times Generator',
                  detail: [
                    {
                      // Details
                      title:
                        'Leveraged the Strava API to deliver the unique solution of displaying a sorted list of a user’s top times.',
                      detail: [],
                    },
                    {
                      title:
                        'Built an intuitive user interface using pagination, loading animations, and additional detail links.',
                      detail: [],
                    },
                    {
                      title:
                        'Employed Redis and Express-Session to store cookies for database lookups on future visits',
                      detail: [],
                    },
                  ],
                  highlightDetail: [
                    {
                      title: 'Main Technologies Used',
                    },
                    {
                      title: 'Javascript es6/Typescript',
                    },
                    {
                      title: 'React Hooks, Redux, Router',
                    },
                    {
                      title: 'Express.js/Express Session/Redis',
                    },
                    {
                      title: 'PostgreSQL',
                    },
                    {
                      title: 'Strava API / OAuth2.0',
                    },
                  ],
                },
                {
                  title: 'FullstackHrivnak.com',
                  detail: [
                    {
                      title:
                        'Created a website for promoting myself from scratch',
                      detail: [],
                    },
                    {
                      title:
                        'Served Static assets from AWS Cloudfront, Website is also server-side rendered',
                      detail: [],
                    },
                    {
                      title:
                        'Proxied in gameplay only version of beatminesweeper.app (Service Oriented Architecture)',
                      detail: [],
                    },
                    {
                      title:
                        'Crafted a responsive design for mobile, tablet, laptop and monitor (large) browser screens',
                      detail: [],
                    },
                  ],
                  highlightDetail: [
                    {
                      title: 'Main Technologies Used',
                    },
                    {
                      title: 'Server Side Rendering',
                    },
                    {
                      title: 'React Hooks, Router/Redux',
                    },
                    {
                      title: 'AWS- ec2, s3, cloudfront',
                    },
                    {
                      title: 'PostgreSQL',
                    },
                    {
                      title: 'Grunt, PM2, & Webpack',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Technical Skills',
              detail: [
                {
                  title: 'Programming',
                  detail: [{ title: 'title', detail: [] }],
                  highlightDetail: [{ title: 'goodbye' }],
                },
              ],
            },
          ],
        })}
        {/* <IterateContainers mobileBrowser={false} /> */}
      </Box>
    </Box>
  );
};

export default Resume;
