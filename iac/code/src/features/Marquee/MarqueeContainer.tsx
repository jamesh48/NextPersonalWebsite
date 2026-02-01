import { StyledSectionCard } from 'StyledComponents'
import { getSmallWindowState } from '@app/appSlice'
import { useDispatch, useSelector } from '@app/reduxHooks'
import { Box, Skeleton, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { useMinimumFetchTimeElapsed } from '@shared/useMinimumFetchTimeElapsed'
import { Promise as BBPromise } from 'bluebird'
import { useCallback, useEffect, useMemo } from 'react'
import { Else, If, Then } from 'react-if'
import { STATIC_CLOUDFRONT_LINK } from '../../constants'
import MarqueeLandscape from './MarqueeLandscape'
import MCPortrait from './MarqueePortrait'
import type { SmileImageProps } from './MarqueeTypes'
import MCLandscapeSkeleton from './MCLandscapeSkeleton'
import MCPortraitSkeleton from './MCPortraitSkeleton'
import { getSmileImage, setSmileImage } from './marqueeSlice'

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
		minimumTime: 1000,
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
			url: `${STATIC_CLOUDFRONT_LINK}/linkedin.jpg`,
			title: 'Linkedin Photo',
			loaded: false,
		})
	}, [handleSmileImage])

	useEffect(() => {
		if (smileImage.loaded === true) {
			const timeout = setTimeout(() => {
				smileCallback()
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [smileImage.loaded, smileCallback])

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

	const mobileStyles = useMemo(() => {
		if (portraitState) {
			return {
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'center',
				height: portraitState ? '100%' : '90%',
				minHeight: portraitState ? '90vh' : 'initial',
			}
		}

		return {}
	}, [portraitState])

	return (
		<StyledSectionCard
			sx={{
				boxSizing: 'border-box',
				width: '100%',
				p: { xs: 3, sm: 4, md: 5 },
			}}
		>
			<Box
				id='marquee-container'
				className='portfolioFader'
				sx={{ display: 'flex', ...mobileStyles }}
			>
				<If condition={orientationDetermined}>
					<Then>
						<If condition={shouldUsePortraitMode}>
							<Then>
								<If condition={contentReady}>
									<Then>
										<MCPortrait smileImage={smileImage} />
									</Then>
									<Else>
										<MCPortraitSkeleton />
									</Else>
								</If>
							</Then>
							<Else>
								<If condition={contentReady}>
									<Then>
										<MarqueeLandscape smileImage={smileImage} />
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
						<Skeleton height='100vh' width='100%' />
					</Else>
				</If>
			</Box>
		</StyledSectionCard>
	)
}

export default MarqueeContainer
