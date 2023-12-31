interface HandleFadingClassNamesProps {
  existing: string;
  prevTitle: React.RefObject<number>;
  hoverBreadth: string;
  hoverDepth: number;
  mobileBrowser: boolean;
  itrDepth: number;
  hoveredIndex: number | string;
}

const handleFadingClassNames = ({
  existing,
  hoverBreadth,
  hoveredIndex,
  itrDepth,
  hoverDepth,
  mobileBrowser,
  prevTitle,
}: HandleFadingClassNamesProps) => {
  const testedHoverBreadth =
    typeof hoverBreadth === 'string'
      ? hoverBreadth.split('_').map((x) => Number(x))
      : hoverBreadth;
  const testedHoveredIndex =
    typeof hoveredIndex === 'string'
      ? hoveredIndex.split('_').map((y) => Number(y))
      : hoveredIndex;
  const initTitleFadeInCondition =
    // Nothing is selected...
    hoverBreadth === null && !prevTitle.current;

  if (initTitleFadeInCondition) {
    return existing + ' ' + 'initFader';
  }

  // Mobile classname applies to all conditions where testedHoverBreadth === testedHoveredIndex, both at title and detail levels
  const mobileClassname = mobileBrowser
    ? 'activeMobileHighlightedContainer'
    : 'activeBrowserHighlightedContainer';

  // Iterating at Title Level
  if (itrDepth === 0) {
    const { dataset: { titleindex: titleIndex = null } = {} } =
      prevTitle?.current || {};

    if (hoverDepth === 0) {
      const fadeInTitleOnTitleChangeCondition =
        titleIndex &&
        Number(titleIndex) !== testedHoverBreadth &&
        testedHoverBreadth === testedHoveredIndex;
      if (fadeInTitleOnTitleChangeCondition) {
        return `${existing} fader ${mobileClassname}`;
      }

      const persistTitleConditionOnReturnFromSection =
        titleIndex && testedHoverBreadth === testedHoveredIndex;
      if (persistTitleConditionOnReturnFromSection) {
        return `${existing} ${mobileClassname}`;
      }

      const persistTitleConditionOnInitialSelect =
        !titleIndex && testedHoverBreadth === testedHoveredIndex;
      if (persistTitleConditionOnInitialSelect) {
        return `${existing} ${mobileClassname}`;
      }

      // Fade Out Condition (activeMobileHighlightedContainer doesn't apply in any case)
      const normalTitleFadeOutCondition =
        testedHoverBreadth !== testedHoveredIndex;
      if (normalTitleFadeOutCondition) {
        return existing + ' ' + 'faderOuter';
      }

      // && testedHoveBreadth prevents an error from being thrown when the user hovers into the 1 depth from the right of the screen in mobile view, unclear why but this is a tempoary patch for the unforeseeable future.
    } else if (hoverDepth === 1 && testedHoverBreadth) {
      // Base Title doesn't match
      const titleFadeOutConditionOnSectionChild =
        testedHoverBreadth[0] !== testedHoveredIndex;
      if (titleFadeOutConditionOnSectionChild) {
        return existing + ' ' + 'faderOuter';
      }

      const persistTitleConditionOnChild = true;
      if (persistTitleConditionOnChild) {
        return existing;
      }
    }
  }
  // Iterating at Section Level
  else if (itrDepth === 1) {
    const { dataset: { titleindex: titleIndex = null } = {} } =
      prevTitle?.current || {};

    // Hovering at Title Level
    if (hoverDepth === 0) {
      // Init Fader is prevTitle.current is false (initial load of sections) or titleIndex changes.
      if (!prevTitle.current || Number(titleIndex) !== testedHoverBreadth) {
        return `${existing} initFader`;
      }
    }
    // Hovering at Section Level
    else if (hoverDepth === 1) {
      const sectionPersistOnSelectCondition =
        // Selected Section Matches (array of numbers does not prove deep equality)
        testedHoverBreadth.join('_') === testedHoveredIndex.join('_');

      if (sectionPersistOnSelectCondition) {
        return `${existing} fader ${mobileClassname}`;
      }

      // When the user goes from one title section to another
      if (testedHoverBreadth.length === 1 && testedHoveredIndex.length === 2) {
        return `${existing} fader`;
      }

      // Fade Out Condition
      const sectionFadeOutOnSiblingSelectCondition =
        testedHoverBreadth.join('_') !== testedHoveredIndex.join('_');
      if (sectionFadeOutOnSiblingSelectCondition) {
        return `${existing} faderOuter`;
      }
    }
  }
  // Iterating at Detail Level
  else if (itrDepth === 2) {
    const initDetailFadeInCondition = hoverDepth === 1;

    if (initDetailFadeInCondition) {
      return existing + ' ' + 'fader';
    }
  }

  return existing;
};

export default handleFadingClassNames;
