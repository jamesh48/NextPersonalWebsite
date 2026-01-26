import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import { StyledLandscapeParagraph } from 'features/Marquee/components'
import { useMemo } from 'react'
import type { MarqueeInnerProps } from './marqueeTypes'

const MCLandscape = (props: MarqueeInnerProps) => {
	const bigSmile = useMediaQuery('(min-width: 1600px)')
	const smallSmile = useMediaQuery('(min-width: 1000px)')

	const smileFlex = useMemo(() => {
		if (bigSmile) {
			return { flex: 0.4, minHeight: '40rem' }
		}
		if (smallSmile) {
			return { flex: 0.5, minHeight: '25rem' }
		}

		return { flex: 0.5, minHeight: '12.5rem' }
	}, [bigSmile, smallSmile])

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
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						<Box
							sx={{ display: 'flex', flexDirection: 'column', flex: 0.9 }}
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
						<Box
							id="smile-container"
							sx={{
								backgroundImage: `url(${props.smileImage.url})`,
								maxWidth: '50%',
								minWidth: '27.5%',
								backgroundSize: 'cover',
								border: '1px solid ivory',
								backgroundPositionY: '25%',
								backgroundPositionX: '75%',
								backgroundRepeat: 'no-repeat',
								borderRadius: '50%',
								...smileFlex,
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default MCLandscape
