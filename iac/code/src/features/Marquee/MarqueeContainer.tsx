import { getSmallWindowState } from '@app/appSlice'
import { useDispatch, useSelector } from '@app/reduxHooks'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { Promise as BBPromise } from 'bluebird'
import { useCallback, useEffect } from 'react'
import MCLandscape from './MarqueeLandscape'
import MCPortrait from './MarqueePortrait'
import { getSmileImage, setSmileImage } from './marqueeSlice'
import type { SmileImageProps } from './marqueeTypes'

export interface MarqueeContainerProps {
	smileCallback: () => void
}

const MarqueeContainer = (props: MarqueeContainerProps) => {
	const marqueeMobileBrowserState = useMobileBrowserCheck()
	const dispatch = useDispatch()
	const smileImage = useSelector(getSmileImage)
	const smallWindowState = useSelector(getSmallWindowState)

	const portraitState = useMediaQuery('(orientation: portrait)')

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
			url: 'https://static.fullstackhrivnak.com/main/main-images/linkedin.jpg',
			title: 'Linkedin Photo',
			loaded: false,
		})
	}, [portraitState, handleSmileImage])

	useEffect(() => {
		if (smileImage.loaded === true) {
			const timeout = setTimeout(() => {
				props.smileCallback()
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [smileImage.loaded, props])

	const paragraphOne = `I'm a Full-Stack Software Engineer specializing in building scalable web applications with React, TypeScript, and Node.js. Most recently, I led frontend architecture at airx health, where I built a comprehensive UI component library and engineered patient-facing features for a pharmaceutical management platform. I have deep experience with modern frontend tooling—Next.js, Redux Toolkit Query, Material UI—and backend technologies including Python/Django, GraphQL, and event-driven architectures. I'm passionate about developer experience and code quality, whether that's migrating to better tooling or integrating AI-assisted development workflows.`

	const paragraphTwo = `I excel at taking ownership of complex features from conception to deployment. At airx health, I was trusted with product direction and customer satisfaction on a small engineering team, building everything from scheduling portals to printer integrations. Previously at United Airlines, I modernized frontend architecture and built real-time notification systems serving thousands of users. I also contribute to open source—recently extending a Homebridge plugin to add smart home controls for GE appliances. I bring strong technical judgment, a collaborative mindset, and a drive to ship polished, user-focused products.`

	/*
  /Load Portrait mode if its a mobileBrowser and is in portrait orientation
   OR--
  Load Portrait mode if its a browser and a small window
  */
	const mobileBrowserWithPortrait = marqueeMobileBrowserState && portraitState
	const notMobileBrowserAndSmallWindow =
		!marqueeMobileBrowserState && smallWindowState

	const portraitMode =
		smileImage.loaded &&
		(mobileBrowserWithPortrait || notMobileBrowserAndSmallWindow)

	return portraitMode ? (
		<MCPortrait
			smileImage={smileImage}
			paragraphOne={paragraphOne}
			paragraphTwo={paragraphTwo}
		/>
	) : smileImage.loaded ? (
		<MCLandscape
			smileImage={smileImage}
			paragraphOne={paragraphOne}
			paragraphTwo={paragraphTwo}
		/>
	) : (
		<Box>
			<Typography>Marquee Contents Loading...</Typography>
		</Box>
	)
}

export default MarqueeContainer
