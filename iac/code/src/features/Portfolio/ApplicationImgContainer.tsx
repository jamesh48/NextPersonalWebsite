import { useEffect, useState } from 'react';
import {
  getMobileBrowserState,
  getPortraitState,
  getSmallWindowState,
} from '@app/appSlice';
import { useDispatch, useSelector } from '@app/reduxHooks';
import { Box } from '@mui/material';
import NestedGithubLink from './NestedGithubLink';
import { getHoveredIndexes, setHoveredIndexes } from './nestedSlice';
import { GithubEntry, PortfolioJSONEntry } from './portfolioTypes';

import { handleNestedContainerData } from './publicViewPortfolioUtils';

const ApplicationImgContainer = (props: {
  rowIndex: number;
  columnIndex: number;
  appData: PortfolioJSONEntry;
}) => {
  const dispatch = useDispatch();
  const portraitState = useSelector(getPortraitState);
  const smallWindowState = useSelector(getSmallWindowState);
  const mobileBrowserState = useSelector(getMobileBrowserState);
  const [landScapeOrPortraitRenderData, setLandScapeOrPortraitRenderData] =
    useState([[], []] as GithubEntry[][][]);
  const [nestedIndicator, setNestedIndicator] = useState(false);
  const [hoveredColumn, hoveredRow] = useSelector(getHoveredIndexes);

  useEffect(() => {
    if (props.rowIndex === hoveredColumn && props.columnIndex === hoveredRow) {
      setNestedIndicator(true);
    } else {
      setNestedIndicator(false);
    }
  }, [hoveredColumn, hoveredRow]);

  useEffect(() => {
    const nestedRenderData = handleNestedContainerData(props.appData.github);

    setLandScapeOrPortraitRenderData(nestedRenderData as GithubEntry[][][]);
  }, [smallWindowState, mobileBrowserState]);

  const renderData = portraitState
    ? landScapeOrPortraitRenderData[0]
    : landScapeOrPortraitRenderData[1];

  return (
    <Box
      className="applicationImgContainer"
      onMouseLeave={
        nestedIndicator
          ? () => {
              dispatch(setHoveredIndexes([null, null]));
            }
          : () => {}
      }
      onMouseOver={
        !nestedIndicator
          ? () => {
              dispatch(setHoveredIndexes([props.rowIndex, props.columnIndex]));
            }
          : () => {}
      }
      sx={{
        backgroundImage: `url(${props.appData.imgUrl})`,
        backgroundColor: props.appData.cssStyles.backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        '&:hover': {
          backgroundColor: 'inherit',
          '.nestedGithubLinks': {
            opacity: 0.5,
            zIndex: 0,
            height: 'auto',
          },
        },
        '.nestedGithubRow': {
          display: 'flex',
          width: '100%',
          height: '100%',
          '.nestedGithubLinks': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            '&:hover': {
              opacity: 0.8,
              cursor: 'pointer',
            },
          },
        },
      }}
    >
      {nestedIndicator
        ? renderData?.map((appRow: GithubEntry[], nestedRowIndex: number) => {
            return (
              <Box
                className="nestedGithubRow"
                key={nestedRowIndex}
                sx={{ display: 'flex', width: '100%', height: '100%' }}
              >
                {appRow.map(
                  (
                    nestedGithub: { link: string; title: string },
                    nestedColumnIndex: number
                  ) => {
                    return (
                      <NestedGithubLink
                        key={nestedColumnIndex}
                        nestedRowIndex={nestedRowIndex}
                        nestedColumnIndex={nestedColumnIndex}
                        outerRowIndex={props.rowIndex}
                        outerColumnIndex={props.columnIndex}
                        outerData={props.appData}
                        nestedGithub={nestedGithub}
                      />
                    );
                  }
                )}
              </Box>
            );
          })
        : null}
    </Box>
  );
};

export default ApplicationImgContainer;
