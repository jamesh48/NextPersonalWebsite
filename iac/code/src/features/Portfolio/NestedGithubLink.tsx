import { getMobileBrowserState } from '@app/appSlice';
import { useDispatch } from '@app/reduxHooks';
import { Box, Typography } from '@mui/material';
import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getNestedHovered, setNestedHovered } from './nestedSlice';

const NestedGithubLink = (props: {
  nestedColumnIndex: number;
  nestedRowIndex: number;
  outerData: { cssStyles: {} };
  outerRowIndex: number;
  outerColumnIndex: number;
  nestedGithub: { link: string; title: string };
}) => {
  const dispatch = useDispatch();
  const mobileBrowserState = useSelector(getMobileBrowserState);
  const nestedHovered = useSelector(getNestedHovered);
  const [doubleClicked, setDoubleClicked] = useState<boolean | null>(null);

  useEffect(() => {
    if (mobileBrowserState && doubleClicked) {
      window.open(props.nestedGithub.link);
    } else if (doubleClicked === true) {
      window.open(props.nestedGithub.link);
    }
  }, [doubleClicked, mobileBrowserState, props.nestedGithub.link]);

  useEffect(() => {
    setDoubleClicked(null);
  }, [nestedHovered]);

  return (
    <Box
      key={props.nestedColumnIndex}
      className="nestedGithubLinks"
      onMouseOver={() => {
        dispatch(
          setNestedHovered(props.nestedRowIndex * 2 + props.nestedColumnIndex)
        );
      }}
      style={props.outerData.cssStyles}
      onClick={() => {
        setDoubleClicked((prev) => {
          if (mobileBrowserState) {
            if (prev === null) {
              return false;
            } else if (prev === false) {
              return true;
            } else {
              return false;
            }
            // Regular Browser
          } else {
            return true;
          }
        });
      }}
    >
      <Typography>{props.nestedGithub.title}</Typography>
    </Box>
  );
};

export default memo(NestedGithubLink);
