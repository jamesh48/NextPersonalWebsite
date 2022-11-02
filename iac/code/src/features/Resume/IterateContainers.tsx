import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from '@app/reduxHooks';
import hFCN from './handleFadingClassNames';
import PublicDisplayContainer from './PublicDisplayContainer';
import {
  exitHoverParams,
  getHoverParams,
  updateHoverParams,
} from './resumeSlice';
import DetailContainer from './DetailContainer';

interface IterateContainersProps {
  resumeDetails: {
    title: string;
    detail: { title: string; detail: {}[] }[];
  }[];
  mobileBrowser: boolean;
}

const IterateContainers = (props: IterateContainersProps) => {
  const dispatch = useDispatch();
  const prevTitle = useRef();
  const loadedSections = useRef();
  const [hoverDepth, hoverBreadth] = useSelector(getHoverParams);
  const [hoverDebouncer, setHoverDebouncer] = useState(true);
  const [touchStartPosition, setTouchStartPosition] = useState(null);

  const handleHover = (
    event: React.SyntheticEvent<EventTarget>,
    // | React.MouseEvent<HTMLDivElement, MouseEvent>
    // | React.TouchEvent<HTMLDivElement>,
    indicator?: string
  ) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (indicator === 'exit') return dispatch(exitHoverParams);

    const {
      target: {
        dataset: { depth, breadth },
      },
    } = event;

    if (
      event.target.className === 'publicColumnContainer' &&
      !event.target.dataset.depth
    ) {
      return;
    }

    /* Setting Hover Depth */
    const newHoverParams = ([] as number[]).concat(Number(depth));

    /* Setting Hover Breadth */
    if (depth === '0') {
      return dispatch(
        updateHoverParams(newHoverParams.concat(Number(breadth)))
      );
    }

    if (depth === '1' || event.target.className === 'publicColumnContainer') {
      return dispatch(updateHoverParams(newHoverParams.concat(breadth)));
    }
  };

  const defaultParams = {
    ...props,
    prevTitle,
    hoverDebouncer,
    hoverDepth,
    hoverBreadth,
    handleHover,
    loadedSections,
  };

  return props.resumeDetails.reduce(
    (resultTitles, title, titleIndex: number) => {
      return resultTitles.concat(
        <Box
          className="resumeParentContainer"
          sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}
        >
          {/*Iterating at 0th depth */}
          <Box
            className="publicContainerRow publicChildContainerRow"
            onMouseOver={
              !props.mobileBrowser && hoverDebouncer
                ? (ev) => handleHover(ev)
                : () => {}
            }
            onTouchEnd={(ev) => {
              if (props.mobileBrowser) {
                if (touchStartPosition !== window.scrollY) {
                  return;
                }
                handleHover(ev);
              }
            }}
            sx={{
              margin: '0 1%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover .publicColumnContainerSection': {
                h6: {
                  backgroundColor: 'transparent',
                  color: 'ivory',
                },
              },
            }}
          >
            {!prevTitle.current ||
            hoverDepth ||
            hoverBreadth ||
            hoverBreadth === 0 ||
            props.mobileBrowser ? (
              <>
                <Box
                  className="publicColumnContainerTitle"
                  sx={{
                    display: 'flex',
                    width: '25%',
                    justifyContent: 'center',
                    h6: {
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '0 auto',
                      flex: 1,
                      alignSelf: 'center',
                      fontSize: '1.5rem',
                    },
                  }}
                >
                  <PublicDisplayContainer
                    key={titleIndex}
                    displayItem={title?.title || ''}
                    breadth={titleIndex}
                    depth={0}
                  />
                </Box>
                <Box>
                  <Box
                    className="publicColumnContainer"
                    data-breadth={titleIndex}
                    data-depth={1}
                    onMouseOver={
                      !props.mobileBrowser && hoverDebouncer
                        ? handleHover
                        : () => {}
                    }
                    onTouchStart={(ev) => {
                      if (props.mobileBrowser) {
                        if (touchStartPosition !== window.scrollY) {
                          return;
                        }
                        handleHover(ev);
                      }
                    }}
                  >
                    {hoverBreadth === titleIndex ||
                    (typeof hoverBreadth === 'string' &&
                      Number(hoverBreadth[0]) === titleIndex) ? (
                      <IterateSections
                        touchStartPosition={touchStartPosition}
                        sections={title.detail}
                        titleIndex={titleIndex}
                        {...defaultParams}
                      />
                    ) : null}
                  </Box>
                </Box>
              </>
            ) : (
              /* Disappearing Sections! */
              <></>
            )}
          </Box>
        </Box>
      );
    },
    [<></>]
  );
};

interface IterateSectionsProps {
  handleHover: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
    indicator?: string
  ) => void;
  titleIndex: number;
  mobileBrowser: boolean;
  hoverDebouncer: boolean;
  touchStartPosition: number | null;
  prevTitle: string;
  sections: { detail: string }[];
  hoverBreadth: string;
}

const IterateSections = (props: IterateSectionsProps) => {
  return props.sections.reduce(
    (resultSections, section, sectionIndex) => {
      const hoveredIndex = `${props.titleIndex}_${sectionIndex}`;

      return resultSections.concat(
        <Box
          className="resumeParentContainer"
          ref={props.prevTitle}
          data-titleindex={props.titleIndex}
        >
          <Box
            className="publicContainerRow publicChildContainerRow"
            onMouseOver={
              !props.mobileBrowser && props.hoverDebouncer
                ? (ev) => props.handleHover(ev)
                : () => {}
            }
            onTouchEnd={(ev) => {
              if (props.mobileBrowser) {
                if (props.touchStartPosition !== window.scrollY) {
                  return;
                }
                props.handleHover(ev);
              }
            }}
          >
            <Box
              className="publicColumnContainerSection"
              sx={{
                width: '100%',
                h6: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'middle',
                  padding: '1% 0',
                  color: 'ivory',
                },
              }}
            >
              <PublicDisplayContainer
                key={sectionIndex}
                displayItem={section?.title || ''}
                breadth={hoveredIndex}
                depth={1}
              />
            </Box>
            {hoveredIndex === props.hoverBreadth ||
            (Number(props.hoverBreadth[0]) === props.titleIndex &&
              Number(props.hoverBreadth[2]) === sectionIndex) ? (
              <div>
                <div className="publicColumnContainer">
                  <IterateDetails
                    details={section.detail}
                    hoveredIndex={hoveredIndex}
                    {...props}
                  />
                </div>
                <div
                  className="minorContainer"
                  ref={props.loadedSections}
                  data-dex={sectionIndex}
                >
                  <h5 className="minorContainerTitle">
                    {section.highlightDetail[0]?.title || ''}
                  </h5>
                  <div className="minorHighlights">
                    {iterateHighlights(section.highlightDetail.slice(1))}
                  </div>
                </div>
              </div>
            ) : // This section of the code makes the text disappear animation style, to remove simply replace with (: null)
            props.loadedSections.current?.dataset.dex ===
                String(sectionIndex) &&
              (props.hoverDepth === 1 || props.hoverDepth === 0) ? (
              <div className="faderContainer">
                <div className="publicColumnContainer">
                  {iterateDetails(
                    {
                      details: section.detail,
                      hoveredIndex: hoveredIndex,
                      ...props,
                    },
                    'cancel'
                  )}
                </div>
                <div className="minorContainer">
                  <Typography
                    variant="h5"
                    className="minorContainerTitle"
                    sx={{ fontSize: '1.45rem' }}
                  >
                    {section.highlightDetail[0]?.title || ''}
                  </Typography>
                  <div className="minorHighlights">
                    {iterateHighlights(section.highlightDetail.slice(1))}
                  </div>
                </div>
              </div>
            ) : null}
          </Box>
        </Box>
      );
    },
    [<></>]
  );
};

const IterateDetails = (
  props: {
    hoveredIndex: number;
    details: {}[];
    mobileBrowser: boolean;
    prevTitle: string;
  },
  ind: boolean
) => {
  return props.details.reduce(
    (resultDetails, detail, detailIndex) => {
      return resultDetails.concat(
        <DetailContainer
          detail={detail}
          detailIndex={detailIndex}
          ind={ind}
          hoveredIndex={props.hoveredIndex}
          mobileBrowser={props.mobileBrowser}
          prevTitle={props.prevTitle}
        />
      );
    },
    [<></>]
  );
};

export default IterateContainers;
