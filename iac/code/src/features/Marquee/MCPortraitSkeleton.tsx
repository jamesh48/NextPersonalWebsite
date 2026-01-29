import { Box, Skeleton, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'

const MCPortraitSkeleton = () => {
	const mobileBrowserState = useMobileBrowserCheck()
	const portraitOrientation = useMediaQuery('(orientation: portrait)')

	return (
		<Box
			className="marquee-container--Portrait"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'center',
				height: portraitOrientation ? '100%' : '90%',
				width: '100%',
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
								<Skeleton
									variant="text"
									sx={{ width: '100%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '95%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '98%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '92%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '97%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '100%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '85%', mx: 'auto' }}
									height={35}
								/>
							</Box>

							{/* Profile image skeleton - square with fixed dimensions */}
							<Skeleton
								variant="rounded"
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
									border: '1px solid rgba(255, 255, 240, 0.3)',
								}}
							/>

							{/* Second paragraph skeleton */}
							<Box sx={{ px: 2 }}>
								<Skeleton
									variant="text"
									sx={{ width: '97%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '100%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '93%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '96%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '99%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '94%', mx: 'auto' }}
									height={35}
								/>
								<Skeleton
									variant="text"
									sx={{ width: '80%', mx: 'auto' }}
									height={35}
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
