import { Box, Skeleton } from '@mui/material'

const MCLandscapeSkeleton = () => {
	return (
		<Box id="marquee-container" sx={{ display: 'flex', padding: '2rem' }}>
			<Box sx={{ height: '100%', width: '100%' }} id="about-me-marquee-details">
				{/* Title skeleton */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						height: '25%',
						alignItems: 'center',
						padding: '3rem',
					}}
				>
					<Skeleton
						variant="text"
						width="60%"
						height={80}
						sx={{ fontSize: '4rem' }}
					/>
				</Box>

				<Box>
					<Box
						id="marquee-contents"
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							overflow: 'hidden', // Prevent overflow
							width: '100%', // Ensure container respects bounds
						}}
					>
						{/* Paragraph skeletons */}
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								flex: 1,
								minWidth: 0, // Important: allows flex item to shrink below content size
								overflow: 'hidden', // Prevent text overflow
							}}
							id="marquee-paragraphs"
						>
							{/* First paragraph */}
							<Box>
								<Skeleton variant="text" sx={{ width: '95%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '98%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '92%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '97%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '100%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '85%' }} height={40} />
							</Box>

							{/* Divider space */}
							<Box sx={{ marginY: '1rem' }} />

							{/* Second paragraph */}
							<Box>
								<Skeleton variant="text" sx={{ width: '97%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '100%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '93%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '96%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '99%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '94%' }} height={40} />
								<Skeleton variant="text" sx={{ width: '80%' }} height={40} />
							</Box>
						</Box>

						{/* Profile image skeleton - circular with fixed dimensions */}
						<Skeleton
							variant="circular"
							sx={{
								width: {
									xs: '12.5rem',
									md: '20rem',
									lg: '25rem',
									xl: '30rem',
									'@media (min-width: 1800px)': '40rem',
								},
								height: {
									xs: '12.5rem',
									md: '20rem',
									lg: '25rem',
									xl: '30rem',
									'@media (min-width: 1800px)': '40rem',
								},
								border: '1px solid rgba(255, 255, 240, 0.3)',
								flexShrink: 0,
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default MCLandscapeSkeleton
