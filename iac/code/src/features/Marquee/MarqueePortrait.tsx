import { Avatar, Box, Stack } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import PageHeader from '../shared/PageHeader'
import { StyledPortraitParagraph } from './components'
import { paragraphOne, paragraphTwo } from './MarqueeConstants'
import type { MarqueeInnerProps } from './MarqueeTypes'

const MCPortrait = ({ smileImage }: MarqueeInnerProps) => {
	const mobileBrowserState = useMobileBrowserCheck()

	return (
		<Box className='about-me-marquee-details' sx={{ height: '100%' }}>
			<PageHeader>James Hrivnak</PageHeader>

			<Box className='marquee-content-container'>
				<Stack className='marquee-contents'>
					<Box className='marquee-paragraphs' sx={{ textAlign: 'center' }}>
						<StyledPortraitParagraph
							variant='body2'
							className='about-me-marquee-description'
						>
							{paragraphOne}
						</StyledPortraitParagraph>
						<Avatar
							src={smileImage.url}
							alt='James Hrivnak'
							variant='rounded'
							className='smile-container'
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
							variant='body2'
							className='about-me-marquee-description'
						>
							{paragraphTwo}
						</StyledPortraitParagraph>
					</Box>
				</Stack>
			</Box>
		</Box>
	)
}

export default MCPortrait
