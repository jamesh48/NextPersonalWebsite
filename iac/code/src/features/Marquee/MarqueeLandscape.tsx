import { Avatar, Box, Divider, Typography } from '@mui/material'
import { StyledLandscapeParagraph } from 'features/Marquee/components'
import type { MarqueeInnerProps } from './marqueeTypes'

const MCLandscape = (props: MarqueeInnerProps) => {
	return (
		<Box
			id="marquee-container"
			className={`portfolioFader`}
			sx={{ display: 'flex' }}
		>
			<Box sx={{ height: '100%' }} id="about-me-marquee-details">
				<Typography
					id="about-me-marquee-title"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						fontSize: '4rem',
						height: '25%',
						alignItems: 'center',
						padding: '3rem',
					}}
				>
					James Hrivnak
				</Typography>
				<Box>
					<Box
						id="marquee-contents"
						sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
					>
						<Box
							sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
							id="marquee-paragraphs"
						>
							<StyledLandscapeParagraph id="about-me-marquee-description-1">
								{props.paragraphOne}
							</StyledLandscapeParagraph>
							<Divider
								sx={{
									color: 'ivory',
									marginY: '1rem',
									visibility: 'hidden',
								}}
							/>
							<StyledLandscapeParagraph id="about-me-marquee-description-2">
								{props.paragraphTwo}
							</StyledLandscapeParagraph>
						</Box>
						<Avatar
							id="smile-container"
							src={props.smileImage.url}
							alt="James Hrivnak"
							sx={{
								width: {
									xs: '12.5rem',
									md: '25rem',
									xl: '40rem',
								},
								height: {
									xs: '12.5rem',
									md: '25rem',
									xl: '40rem',
								},
								border: '1px solid ivory',
								flexShrink: 0,
								'& img': {
									objectPosition: '75% 25%',
								},
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default MCLandscape
