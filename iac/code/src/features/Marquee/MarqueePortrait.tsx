import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { StyledPortraitParagraph } from './components'
import { paragraphOne, paragraphTwo } from './MarqueeConstants'
import type { MarqueeInnerProps } from './MarqueeTypes'

const MCPortrait = ({ smileImage }: MarqueeInnerProps) => {
	const mobileBrowserState = useMobileBrowserCheck()
	const portraitOrientation = useMediaQuery('(orientation: portrait)')
	const landscapeOrientation = useMediaQuery('(orientation: landscape)')

	return (
		<Box
			className={`marquee-container--Portrait portfolioFader`}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'center',
				height: portraitOrientation ? '100%' : '90%',
				minHeight: landscapeOrientation ? '90vh' : undefined,
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
								{paragraphOne}
							</StyledPortraitParagraph>
							<Avatar
								src={smileImage.url}
								alt="James Hrivnak"
								variant="rounded"
								className="smile-container"
								sx={{
									margin: '2.5% auto',
									width: mobileBrowserState
										? 'min(90vw, 25rem)'
										: 'min(50vw, 25rem)',
									height: mobileBrowserState
										? 'min(90vw, 25rem)'
										: 'min(50vw, 25rem)',
									minWidth: '15rem',
									minHeight: '15rem',
									border: '1px solid ivory',
									'& img': {
										objectPosition: '75% 25%',
									},
								}}
							/>
							<StyledPortraitParagraph
								variant="body2"
								className="about-me-marquee-description"
							>
								{paragraphTwo}
							</StyledPortraitParagraph>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default MCPortrait
