import { useDispatch, useSelector } from '@app/reduxHooks'
import { keyframes } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { useEffectOnlyOnUpdate } from '@shared/customHooks'
import type React from 'react'
import { useRef, useState } from 'react'
import DetailContainer from './DetailContainer'
import PublicDisplayContainer from './PublicDisplayContainer'
import {
	exitHoverParams,
	getHoverParams,
	updateHoverParams,
} from './resumeSlice'

const myEffect = keyframes`
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`

const disappearTextOnly = keyframes`
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
`

export const disappearSlidingText = keyframes`
  0% {
    opacity: 0.5;
    max-height: 4em;
  }

  100% {
    opacity: 0;
    max-height: 0rem;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
    // height: 6vh;
  }
  100% {
    opacity: 0.2;
    // height: 0px;
    // z-index: -1;
  }
`

const collapseTitleContainer = keyframes`
  0% {
    padding: 40% 0;
  }
  100% {
    padding: 0 0;
  }
`

const initFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

interface IterateContainersProps {
	resumeDetails: {
		title: string
		detail: {
			title: string
			detail: { title: string; detail: { title: string }[] }[]
			highlightDetail: { title: string }[]
		}[]
	}[]
	mobileBrowser: boolean
}

const IterateContainers = (props: IterateContainersProps) => {
	const [hoverDepth, hoverBreadth] = useSelector(getHoverParams)
	const resumeDispatch = useDispatch()

	const handleHover = (
		event: React.SyntheticEvent<EventTarget>,
		// | React.MouseEvent<HTMLDivElement, MouseEvent>
		// | React.TouchEvent<HTMLDivElement>,
		indicator?: string,
	) => {
		if (!(event.target instanceof HTMLElement)) {
			return
		}

		if (indicator === 'exit') return resumeDispatch(exitHoverParams)
		const {
			target: {
				dataset: { depth, breadth },
			},
		} = event

		if (!breadth) {
			return
		}

		// The first condition prevents details from disappearing momentarily when the user hovers downards over the border between the section title and the details
		// The second condition ensures that when the user goes to a new title, that the UI shows it, as there is no data-depth of publicColumnContainer between section and details but there is a data-depth in the empty space.
		if (
			event.target.className === 'publicColumnContainer' &&
			!event.target.dataset.depth
		)
			return

		// Setting hoverDepth------------------->
		const newHoverParams = ([] as number[]).concat(Number(depth))

		// setting hoverBreadth----------------->
		if (depth === '0') {
			return resumeDispatch(
				updateHoverParams([Number(depth), Number(breadth)]),
				// updateHoverParams(newHoverParams.concat(Number(breadth)))
			)
		}

		if (depth === '1' || event.target.className === 'publicColumnContainer') {
			return resumeDispatch(updateHoverParams([Number(depth), breadth]))
		}
	}

	const { resumeDetails, mobileBrowser } = props
	const [hoverDebouncer, setHoverDebouncer] = useState(true)
	const [touchStartPosition, setTouchStartPosition] = useState<number | null>(
		null,
	)
	const prevTitle = useRef() as React.MutableRefObject<HTMLElement>
	const loadedSections = useRef() as React.MutableRefObject<HTMLElement>
	const defaultParams = {
		...props,
		prevTitle,
		hoverDebouncer,
		hoverDepth,
		hoverBreadth,
		handleHover,
		loadedSections,
	}

	useEffectOnlyOnUpdate(
		() => {
			if (hoverDepth === 1) {
				setHoverDebouncer(false)

				const timeout = setTimeout(() => {
					setHoverDebouncer(true)
				}, 500)

				return () => clearTimeout(timeout)
			}
		},
		[hoverBreadth],
		[],
	)

	return resumeDetails.reduce((resultTitles, title, titleIndex) => {
		return resultTitles.concat(
			<Box
				sx={{
					display: 'flex',
					flex: 1,
					flexDirection: 'column',
					fontWeight: 150,
				}}
			>
				{/* Iterating at 0th depth */}
				<Box
					// className={hFCN({
					//   existing: `publicContainerRow publicParentContainerRow`,
					//   itrDepth: 0,
					//   hoveredIndex: titleIndex,
					//   ...defaultParams,
					// })}
					onMouseOver={
						!mobileBrowser && hoverDebouncer ? handleHover : () => {}
					}
					onTouchStart={() => {
						// Title Level
						if (mobileBrowser) {
							setTouchStartPosition(window.scrollY)
						}
					}}
					onTouchEnd={(event) => {
						if (mobileBrowser) {
							// if user is scrolling don't run...
							if (touchStartPosition !== window.scrollY) {
								return
							}
							handleHover(event)
						}
					}}
					sx={{
						...(() => {
							const testedHoverBreadth =
								typeof hoverBreadth === 'string'
									? hoverBreadth.split('_').map((x) => Number(x))
									: hoverBreadth

							const testedHoveredIndex = titleIndex

							const initTitleFadeInCondition =
								hoverBreadth === null && !prevTitle.current

							if (initTitleFadeInCondition) {
								return { animation: `${initFade} ease 3s` }
							}
							if (hoverDepth === 0) {
								const fadeInTitleOnTitleChangeCondition =
									titleIndex &&
									Number(titleIndex) !== testedHoverBreadth &&
									testedHoverBreadth === testedHoveredIndex

								if (fadeInTitleOnTitleChangeCondition) {
									return { animation: `${myEffect} 3s ease` }
								}

								const normalTitleFadeOutCondition =
									testedHoverBreadth !== testedHoveredIndex

								if (normalTitleFadeOutCondition) {
									return {
										animation: `${fadeOut} ease 3s`,
									}
								}
							} else if (hoverDepth === 1 && testedHoverBreadth) {
								// Base Title doesn't match
								const titleFadeOutConditionOnSectionChild =
									Array.isArray(testedHoverBreadth) &&
									testedHoverBreadth[0] !== testedHoveredIndex

								if (titleFadeOutConditionOnSectionChild) {
									return { animation: `${fadeOut} ease 3s` }
								}
							}
							return {}
						})(),
						margin: '0 1%',
						display: 'flex',
						'&:hover .publicColumnContainerTitle': {
							// height: 100%;
							border: mobileBrowser ? 'none' : '1px solid lightslategray',
							backgroundColor: mobileBrowser ? 'transparent' : 'ivory',
							marginLeft: '0.5%',
							h6: {
								padding: mobileBrowser ? '100% 10%' : '100% 0',
								color: mobileBrowser ? 'ivory' : 'darkslategray',
							},
						},
					}}
				>
					{
						// For now mobile browser wont have this animation
						// Regular View...
						!prevTitle.current ||
						hoverDepth ||
						hoverBreadth ||
						hoverBreadth === 0 ||
						mobileBrowser ? (
							<>
								<Box
									className={`publicColumnContainerTitle`}
									sx={{
										padding: '2% 0',
										display: 'flex',
										width: mobileBrowser ? '100%' : '25%',
										justifyContent: 'center',
										textAlign: 'center',
										h6: {
											display: 'flex',
											justifyContent: 'center',
											margin: '0 auto',
											flex: 1,
											alignSelf: 'center',
											fontSize: '1.5rem',
											color: 'ivory',
											textAlign: 'center',
										},
										'&:hover': {
											border: '1px solid lightslategray',
											backgroundColor: 'ivory',
											marginLeft: '0.5%',
											h6: {
												padding: '100% 0',
												color: 'darkslategray',
												...(() => {
													if (mobileBrowser) {
														return {
															padding: '100% 0',
															fontSize: '2em',
															lineHeight: 1.5,
														}
													}
												})(),
											},
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
								<Box
									className="publicColumnContainer"
									data-breadth={titleIndex}
									data-depth={1}
									onMouseOver={
										!mobileBrowser && hoverDebouncer ? handleHover : () => {}
									}
									onTouchStart={() => {
										if (mobileBrowser) {
											setTouchStartPosition(window.scrollY)
										}
									}}
									onTouchEnd={(event) => {
										if (mobileBrowser) {
											if (touchStartPosition !== window.scrollY) {
												return
											}
											handleHover(event)
										}
									}}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										// border: 1px solid white;
										width: '100%',
									}}
								>
									{hoverBreadth === titleIndex ||
									(typeof hoverBreadth === 'string' &&
										Number(hoverBreadth[0]) === titleIndex) ? (
										IterateSections({
											touchStartPosition: touchStartPosition,
											sections: title.detail,
											titleIndex,
											...defaultParams,
										})
									) : (
										<></>
									)}
								</Box>
							</>
						) : // Disappearing Sections!
						(!hoverDepth || !hoverBreadth) && hoverBreadth !== 0 ? (
							<>
								<Box
									className="publicColumnContainerTitle"
									sx={{
										padding: '2% 0',
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
											color: 'ivory',
											textAlign: 'center',

											// ...(() => {
											//   if (
											//     prevTitle?.current?.dataset?.titleindex ===
											//     String(titleIndex)
											//   ) {
											//     return {
											//       animation: `${myEffect} ease 3s forwards`,
											//     };
											//   }
											// })(),
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
								<Box
									className="publicColumnContainer"
									data-breadth={titleIndex}
									data-depth={1}
									onMouseOver={
										!mobileBrowser && hoverDebouncer ? handleHover : () => {}
									}
									onTouchEnd={mobileBrowser ? handleHover : () => {}}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										width: '100%',
									}}
								>
									{prevTitle?.current?.dataset?.titleindex ===
									String(titleIndex)
										? iterateDisappearingSections({
												sections: title.detail,
												titleIndex,
												...defaultParams,
											})
										: null}
								</Box>
							</>
						) : null
					}
				</Box>
			</Box>,
		)
	}, [] as JSX.Element[])
}

interface IterateDisappearingSectionsProps {
	sections: { title: string }[]
	titleIndex: number
	hoverDepth: number | null
	hoverBreadth: string | number | null
}

const iterateDisappearingSections = (
	props: IterateDisappearingSectionsProps,
) => {
	return props.sections.reduce((resultSections, section, sectionIndex) => {
		const hoveredIndex = `${props.titleIndex}_${sectionIndex}`
		return resultSections.concat(
			<Box
				className={`resumeParentContainer faderContainerSection`}
				sx={{
					animation: `${disappearTextOnly} ease 3s forwards`,
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						margin: '0 1%',
						flexDirection: 'column',
						...(() => {
							if (props.hoverDepth === 1) {
								const testedHoverBreadth =
									typeof props.hoverBreadth === 'string'
										? props.hoverBreadth.split('_').map((x) => Number(x))
										: props.hoverBreadth
								const testedHoveredIndex =
									typeof hoveredIndex === 'string'
										? hoveredIndex.split('_').map((y) => Number(y))
										: hoveredIndex

								const sectionPersistOnSelectCondition =
									// Selected Section Matches (array of numbers does not prove deep equality)
									Array.isArray(testedHoverBreadth) &&
									testedHoverBreadth.join('_') === testedHoveredIndex.join('_')

								if (sectionPersistOnSelectCondition) {
									return { animation: `${myEffect} ease 3s` }
								}

								const sectionFadeOutOnSiblingSelectCondition =
									Array.isArray(testedHoverBreadth) &&
									testedHoverBreadth.join('_') !== testedHoveredIndex.join('_')

								if (sectionFadeOutOnSiblingSelectCondition) {
									return { animation: `${fadeOut} ease 2s` }
								}
							}
							return {}
						})(),
					}}
					// className={hFCN({
					//   existing: `publicContainerRow publicChildContainerRow`,
					//   itrDepth: 1,
					//   hoveredIndex,
					//   ...props,
					// })}
				>
					<Box
						className="publicColumnContainerSection"
						sx={{
							fontSize: '1.4vmax',
							display: 'flex',
							width: '100%',
							justifyContent: 'center',
							h6: {
								display: 'flex',
								justifyContent: 'center',
								margin: '0 auto',
								flex: 1,
								alignSelf: 'center',
							},
						}}
					>
						<PublicDisplayContainer
							key={sectionIndex}
							displayItem={section?.title || ''}
							depth={1}
							breadth={0}
						/>
					</Box>
				</Box>
			</Box>,
		)
	}, [] as JSX.Element[])
}

interface IterateSectionsProps {
	handleHover: (
		event:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.TouchEvent<HTMLDivElement>,
		indicator?: string,
	) => void
	mobileBrowser: boolean
	hoverDebouncer: boolean
	hoverDepth: number | null
	hoverBreadth: string | number | null
	loadedSections: React.MutableRefObject<HTMLElement>
	prevTitle: React.MutableRefObject<HTMLElement>
	titleIndex: number
	touchStartPosition: number | null
	sections: {
		title: string
		detail: { title: string; detail: { title: string }[] }[]
		highlightDetail: { title: string }[]
	}[]
}

const IterateSections = (props: IterateSectionsProps) => {
	const { touchStartPosition, mobileBrowser, hoverBreadth, hoverDebouncer } =
		props
	return props.sections.reduce((resultSections, section, sectionIndex) => {
		const hoveredIndex = `${props.titleIndex}_${sectionIndex}`

		return resultSections.concat(
			<Box
				ref={props.prevTitle}
				data-titleindex={props.titleIndex}
				sx={{
					display: 'flex',
					flex: 1,
					flexDirection: 'column',

					h6: mobileBrowser
						? {
								textAlign: 'center',
							}
						: null,
					'&:hover': {
						'.publicColumnContainerSection': {
							border: mobileBrowser ? 'none' : '1px solid lightslategrey',
							h6: {
								padding: '0 0',
								lineHeight: mobileBrowser ? 1.5 : 3,
								backgroundColor: mobileBrowser ? 'transparent' : 'ivory',
								color: mobileBrowser ? 'ivory' : 'darkslategrey',
							},
						},
					},
				}}
			>
				<Box
					// className={hFCN({
					//   existing: `publicContainerRow publicChildContainerRow`,
					//   itrDepth: 1,
					//   hoveredIndex: hoveredIndex,
					//   ...props,
					// })}
					sx={{
						margin: '0 1%',
						display: 'flex',
						flexDirection: 'column',
						...(() => {
							if (props.hoverBreadth === null && !props.prevTitle.current) {
								return { animation: `${initFade} 3s ease` }
							}
							if (props.hoverDepth === 1) {
								const testedHoverBreadth =
									typeof hoverBreadth === 'string'
										? hoverBreadth.split('_').map((x) => Number(x))
										: hoverBreadth
								const testedHoveredIndex =
									typeof hoveredIndex === 'string'
										? hoveredIndex.split('_').map((y) => Number(y))
										: hoveredIndex

								const sectionPersistOnSelectCondition =
									// Selected Section Matches (array of numbers does not prove deep equality)
									Array.isArray(testedHoverBreadth) &&
									testedHoverBreadth.join('_') === testedHoveredIndex.join('_')

								if (sectionPersistOnSelectCondition) {
									return { animation: `${myEffect} ease 3s` }
								}

								const sectionFadeOutOnSiblingSelectCondition =
									Array.isArray(testedHoverBreadth) &&
									testedHoverBreadth.join('_') !== testedHoveredIndex.join('_')

								if (sectionFadeOutOnSiblingSelectCondition) {
									return { animation: `${fadeOut} ease 3s` }
								}
							}
							return {}
						})(),
					}}
					onMouseOver={
						!mobileBrowser && hoverDebouncer ? props.handleHover : () => {}
					}
					onTouchEnd={(event) => {
						if (mobileBrowser) {
							if (touchStartPosition !== window.scrollY) {
								return
							}
							props.handleHover(event)
						}
					}}
				>
					<Box
						className="publicColumnContainerSection"
						sx={{
							fontSize: '1.4vmax',
							display: 'flex',
							width: '100%',
							justifyContent: 'center',
							...(() => {
								if (mobileBrowser) {
									return { margin: '0 2%' }
								}
							})(),
							h6: {
								display: 'flex',
								justifyContent: 'center',
								margin: '0 auto',
								flex: 1,
								alignSelf: 'center',
								...(() => {
									if (mobileBrowser) {
										return {
											fontSize: '1.2rem',
											color: 'ivory',
											height: '5rem',
											alignItems: 'center',
										}
									}
								})(),
							},
							'&:hover': {
								// border: 1px solid lightslategrey;
								h6: {
									// line-height: 3;
									backgroundColor: 'transparent',
									color: 'ivory',
								},
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
					{hoveredIndex === hoverBreadth ||
					(typeof hoverBreadth === 'string' &&
						Number(hoverBreadth[0]) === props.titleIndex &&
						Number(hoverBreadth[2]) === sectionIndex) ? (
						<Box>
							<Box
								className="publicColumnContainer"
								sx={{
									display: 'flex',
									flexDirection: 'column',
									// border: 1px solid white;
									width: '100%',
								}}
							>
								{IterateDetails({
									details: section.detail,
									hoveredIndex: hoveredIndex,
									...props,
								})}
							</Box>
							<Box
								// className={hFCN({
								//   existing: `minorContainer`,
								//   hoveredIndex: hoveredIndex,
								//   itrDepth: 2,
								//   ...props,
								// })}
								ref={props.loadedSections}
								data-dex={sectionIndex}
								sx={{
									...(() => {
										if (props.hoverDepth === 1) {
											return { animation: `${myEffect} 3s ease` }
										}
									})(),
								}}
							>
								<Typography
									variant="h5"
									className="minorContainerTitle"
									sx={{
										fontSize: '1.2vmax',
										...(() => {
											if (mobileBrowser) {
												return { textAlign: 'center' }
											}
											return {}
										})(),
									}}
								>
									{section.highlightDetail[0]?.title || ''}
								</Typography>
								<Box
									className="minorHighlights"
									sx={{
										margin: '0 1%',
										...(() => {
											if (mobileBrowser) {
												return { textAlign: 'center' }
											}
											return {}
										})(),
									}}
								>
									{IterateHighlights({
										highlights: section.highlightDetail.slice(1),
									})}
								</Box>
							</Box>
						</Box>
					) : // This section of the code makes the text disappear animation style, to remove simply replace with (: null)
					props.loadedSections.current?.dataset.dex === String(sectionIndex) &&
						(props.hoverDepth === 1 || props.hoverDepth === 0) ? (
						<Box
							className="faderContainer"
							sx={{
								padding: '0 0',
								margin: '0 0',
							}}
						>
							<Box
								className="publicColumnContainer"
								sx={{
									display: 'flex',
									flexDirection: 'column',
									width: '100%',
								}}
							>
								{IterateDetails(
									{
										details: section.detail,
										hoveredIndex: hoveredIndex,
										...props,
									},
									'cancel',
								)}
							</Box>
							<Box
								className="minorContainer"
								sx={{
									animation: `${disappearSlidingText} ease 1s forwards`,
								}}
							>
								<Typography
									variant="h5"
									className="minorContainerTitle"
									sx={{
										fontSize: '1.2vmax',
									}}
								>
									{section.highlightDetail[0]?.title || ''}
								</Typography>
								<Box
									className="minorHighlights"
									sx={{
										margin: '0 1%',
									}}
								>
									{IterateHighlights({
										highlights: section.highlightDetail.slice(1),
									})}
								</Box>
							</Box>
						</Box>
					) : null}
				</Box>
			</Box>,
		)
	}, [] as JSX.Element[])
}

interface IterateDetailsProps {
	details: { title: string; detail: { title: string }[] }[]
	hoveredIndex: string
	mobileBrowser: boolean
	prevTitle: React.MutableRefObject<HTMLElement>
}

const IterateDetails = (
	props: IterateDetailsProps,
	ind?: boolean | 'cancel',
) => {
	return props.details.reduce((resultDetails, detail, detailIndex) => {
		return resultDetails.concat(
			<DetailContainer
				detail={detail}
				detailIndex={detailIndex}
				ind={ind}
				hoveredIndex={props.hoveredIndex}
				mobileBrowser={props.mobileBrowser}
			/>,
		)
	}, [] as JSX.Element[])
}

interface IterateHighlightsProps {
	highlights: { title: string }[]
}
const IterateHighlights = (props: IterateHighlightsProps) => {
	return props.highlights.reduce((resultHighlights, highlight) => {
		return resultHighlights.concat(
			<Box
				className="minor-item"
				sx={{
					display: 'inline-flex',
					margin: '0 1%',
					color: 'ivory',
					fontSize: '1vmax',
				}}
			>
				{highlight?.title || ''}
			</Box>,
		)
	}, [] as JSX.Element[])
}

export default IterateContainers
