import { getSmallWindowState } from '@app/appSlice'
import { useDispatch, useSelector } from '@app/reduxHooks'
import { Skeleton, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { useMinimumFetchTimeElapsed } from '@shared/useMinimumFetchTimeElapsed'
import { Promise as BBPromise } from 'bluebird'
import { useCallback, useEffect } from 'react'
import { Else, If, Then } from 'react-if'
import { STATIC_CLOUDFRONT_LINK } from '../../constants'
import MCLandscape from './MarqueeLandscape'
import MCPortrait from './MarqueePortrait'
import MCLandscapeSkeleton from './MCLandscapeSkeleton'
import MCPortraitSkeleton from './MCPortraitSkeleton'
import { getSmileImage, setSmileImage } from './marqueeSlice'
import type { SmileImageProps } from './marqueeTypes'

export interface MarqueeContainerProps {
	smileCallback: () => void
}

const MarqueeContainer = ({ smileCallback }: MarqueeContainerProps) => {
	const marqueeMobileBrowserState = useMobileBrowserCheck()
	const dispatch = useDispatch()
	const smileImage = useSelector(getSmileImage)
	const smallWindowState = useSelector(getSmallWindowState)

	const portraitState = useMediaQuery('(orientation: portrait)')
	const landscapeState = useMediaQuery('(orientation: landscape)')

	const contentReady = useMinimumFetchTimeElapsed({
		isLoaded: smileImage.loaded,
		minimumTime: 1500,
	})

	const handleSmileImage = useCallback(
		async (smileImageToLoad: SmileImageProps) => {
			const loadedSmileImage: SmileImageProps = await new BBPromise(
				(resolve, reject) => {
					const img = new Image()
					img.onload = () =>
						resolve({
							url: smileImageToLoad.url,
							title: smileImageToLoad.title,
							loaded: true,
						})
					img.onerror = () => {
						reject(
							new Error(`The ${smileImageToLoad.title} image failed to load`),
						)
					}
					img.src = smileImageToLoad.url
				},
			)

			dispatch(setSmileImage(loadedSmileImage))
		},
		[dispatch],
	)

	useEffect(() => {
		handleSmileImage({
			url: `${STATIC_CLOUDFRONT_LINK}/main/main-images/linkedin.jpg`,
			title: 'Linkedin Photo',
			loaded: false,
		})
	}, [portraitState, handleSmileImage])

	useEffect(() => {
		if (smileImage.loaded === true) {
			const timeout = setTimeout(() => {
				smileCallback()
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [smileImage.loaded, smileCallback])

	const paragraphOne = `I'm a Full-Stack Software Engineer specializing in building scalable web applications with React, TypeScript, and Node.js. Most recently, I led frontend architecture at airx health, where I built a comprehensive UI component library and engineered patient-facing features for a pharmaceutical management platform. I have deep experience with modern frontend tooling—Next.js, Redux Toolkit Query, Material UI—and backend technologies including Python/Django, GraphQL, as well as event-driven architectures. I'm passionate about developer experience and code quality, whether that's migrating to better tooling or integrating AI-assisted development workflows.`

	const paragraphTwo = `I excel at taking ownership of complex features from conception to deployment. At airx health, I was trusted with product direction and customer satisfaction on a small engineering team, building everything from scheduling portals to printer integrations. Previously at United Airlines, I modernized frontend architecture and built real-time notification systems serving thousands of users. I also contribute to open source—recently extending a Homebridge plugin to add smart home controls for GE appliances. I bring strong technical judgment, a collaborative mindset, and a drive to ship polished, user-focused products.`

	/*
  /Load Portrait mode if its a mobileBrowser and is in portrait orientation
   OR--
  Load Portrait mode if its a browser and a small window
  */
	const mobileBrowserWithPortrait = marqueeMobileBrowserState && portraitState
	const notMobileBrowserAndSmallWindow =
		!marqueeMobileBrowserState && smallWindowState

	// Determine which MODE to use (independent of loading state)
	const shouldUsePortraitMode =
		mobileBrowserWithPortrait || notMobileBrowserAndSmallWindow

	// Check if orientation is determined
	const orientationDetermined = portraitState || landscapeState

	return (
		<If condition={orientationDetermined}>
			<Then>
				<If condition={shouldUsePortraitMode}>
					<Then>
						<If condition={contentReady}>
							<Then>
								<MCPortrait
									smileImage={smileImage}
									paragraphOne={paragraphOne}
									paragraphTwo={paragraphTwo}
								/>
							</Then>
							<Else>
								<MCPortraitSkeleton />
							</Else>
						</If>
					</Then>
					<Else>
						<If condition={contentReady}>
							<Then>
								<MCLandscape
									smileImage={smileImage}
									paragraphOne={paragraphOne}
									paragraphTwo={paragraphTwo}
								/>
							</Then>
							<Else>
								<MCLandscapeSkeleton />
							</Else>
						</If>
					</Else>
				</If>
			</Then>
			<Else>
				{/* Show Skeleton while orientation is being determined */}
				<Skeleton height="100vh" width="100%" />
			</Else>
		</If>
	)
}

export default MarqueeContainer
