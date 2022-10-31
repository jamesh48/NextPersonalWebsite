import { getMobileBrowserState } from '@app/appSlice';
import { useDispatch } from '@app/reduxHooks';
import { Box, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { setNestedHovered } from './nestedSlice';

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

  const [doubleClicked, setDoubleClicked] = useState(null);

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
    >
      <Typography>{props.nestedGithub.title}</Typography>
    </Box>
  );
};

export default memo(NestedGithubLink);
