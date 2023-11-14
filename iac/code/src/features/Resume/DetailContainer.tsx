import { Box } from '@mui/material';
import PublicDisplayContainer from './PublicDisplayContainer';

interface DetailContainerProps {
  detail: { title: string };
  detailIndex: number;
  hoveredIndex: number | string;
  prevTitle: React.MutableRefObject<HTMLElement>;
  ind: boolean | undefined | 'cancel';
  mobileBrowser: boolean;
}
const DetailContainer = ({
  detail,
  detailIndex,
  hoveredIndex,
  prevTitle,
  ind,
}: DetailContainerProps) => {
  return (
    <Box
      className="resumeParentContainer"
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <Box
        className="publicColumnContainerDetail"
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1.5% 0',
          h6: {
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            flex: 1,
            alignSelf: 'center',
            fontSize: '1.3vmax',
            lineHeight: '1.5',
            textRendering: 'geometricPrecision',
          },
        }}
      >
        <PublicDisplayContainer
          key={detailIndex}
          displayItem={detail?.title || ''}
          breadth={hoveredIndex.toString()}
          depth={1}
        />
      </Box>
    </Box>
  );
};

export default DetailContainer;
