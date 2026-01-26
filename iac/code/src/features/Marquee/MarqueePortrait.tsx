import { Box, Typography, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { StyledPortraitParagraph } from './components'
import type { MarqueeInnerProps } from './marqueeTypes'

const MCPortrait = (props: MarqueeInnerProps) => {
	const mobileBrowserState = useMobileBrowserCheck()
	const portraitOrientation = useMediaQuery('(orientation: portrait)')
	const landscapeOrientation = useMediaQuery('(orientation: landscape)')
	const bigSmile = useMediaQuery('(min-width:1600px) and (max-width: 1750px)')
	const mediumSmile = useMediaQuery(
		'(min-width:1300px) and (max-width: 1500px)',
	)
	const smallSmile = useMediaQuery('(min-width:1150px) and (max-width: 1300px)')

	const smileFlex = (() => {
		if (bigSmile) {
			return 0.4
		}
		if (mediumSmile) {
			return 0.5
		}

		if (smallSmile) {
			return 0.6
		}
		return 0.5
	})()

	return (
		<Box
			className={`marquee-container--Portrait portfolioFader`}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'center',
				height: portraitOrientation ? '100%' : '90%',
				...(() => {
					if (landscapeOrientation) {
						return { minHeight: '90vh' }
					}
				})(),
			}}
		>
			<Box className="about-me-marquee-details" sx={{ height: '100%' }}>
				<Typography
					variant="h4"
					className="about-me-marquee-title"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						height: '25%',
						alignItems: 'center',
						paddingY: '6%',
					}}
				>
					James Hrivnak
				</Typography>
				<Box className="marquee-content-container">
					<Box
						className="marquee-contents"
						sx={{ display: 'flex', flexDirection: 'column' }}
					>
						<Box className="marquee-paragraphs" sx={{ textAlign: 'center' }}>
							<StyledPortraitParagraph
								variant="body2"
								className="about-me-marquee-description"
							>
								{props.paragraphOne}
							</StyledPortraitParagraph>
							<Box
								className="smile-container"
								sx={{
									margin: '2.5% auto',
									minHeight: '25rem',
									width: mobileBrowserState ? '90%' : '50%',
									padding: 0,
									backgroundImage: `url(${props.smileImage.url})`,
									backgroundPositionY: '25%',
									backgroundPositionX: '75%',
									backgroundSize: 'cover',
									border: '1px solid ivory',
									backgroundRepeat: 'no-repeat',
									flex: smileFlex,
								}}
							></Box>
							<StyledPortraitParagraph
								variant="body2"
								className="about-me-marquee-description"
							>
								{props.paragraphTwo}
							</StyledPortraitParagraph>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default MCPortrait
