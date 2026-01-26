import { Box, Skeleton, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'

const MCPortraitSkeleton = () => {
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
			className="marquee-container--Portrait"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'center',
				height: portraitOrientation ? '100%' : '90%',
				width: '100%',
				...(() => {
					if (landscapeOrientation) {
						return { minHeight: '90vh' }
					}
				})(),
			}}
		>
			<Box
				className="about-me-marquee-details"
				sx={{ height: '100%', width: '100%' }}
			>
				{/* Title skeleton */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						height: '25%',
						alignItems: 'center',
						paddingY: '6%',
					}}
				>
					<Skeleton
						variant="text"
						width="70%"
						height={60}
						sx={{ fontSize: '2rem' }}
					/>
				</Box>

				<Box className="marquee-content-container">
					<Box
						className="marquee-contents"
						sx={{ display: 'flex', flexDirection: 'column' }}
					>
						<Box className="marquee-paragraphs" sx={{ textAlign: 'center' }}>
							{/* First paragraph skeleton */}
							<Box sx={{ px: 2 }}>
								<Skeleton variant="text" width="100%" height={35} />
								<Skeleton variant="text" width="95%" height={35} />
								<Skeleton variant="text" width="98%" height={35} />
								<Skeleton variant="text" width="92%" height={35} />
								<Skeleton variant="text" width="97%" height={35} />
								<Skeleton variant="text" width="100%" height={35} />
								<Skeleton
									variant="text"
									width="85%"
									height={35}
									sx={{ mx: 'auto' }}
								/>
							</Box>

							{/* Profile image skeleton */}
							<Skeleton
								variant="rectangular"
								sx={{
									margin: '2.5% auto',
									minHeight: '25rem',
									width: mobileBrowserState ? '90%' : '50%',
									border: '1px solid rgba(255, 255, 240, 0.3)',
									flex: smileFlex,
								}}
							/>

							{/* Second paragraph skeleton */}
							<Box sx={{ px: 2 }}>
								<Skeleton variant="text" width="97%" height={35} />
								<Skeleton variant="text" width="100%" height={35} />
								<Skeleton variant="text" width="93%" height={35} />
								<Skeleton variant="text" width="96%" height={35} />
								<Skeleton variant="text" width="99%" height={35} />
								<Skeleton variant="text" width="94%" height={35} />
								<Skeleton
									variant="text"
									width="80%"
									height={35}
									sx={{ mx: 'auto' }}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default MCPortraitSkeleton
