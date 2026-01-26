import { Box, Skeleton, useMediaQuery } from '@mui/material'
import { useMemo } from 'react'

const MCLandscapeSkeleton = () => {
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
		<Box id="marquee-container" sx={{ display: 'flex', width: '100%' }}>
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
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						{/* Paragraph skeletons */}
						<Box
							sx={{ display: 'flex', flexDirection: 'column', flex: 0.9 }}
							id="marquee-paragraphs"
						>
							{/* First paragraph */}
							<Box>
								<Skeleton variant="text" width="100%" height={40} />
								<Skeleton variant="text" width="95%" height={40} />
								<Skeleton variant="text" width="98%" height={40} />
								<Skeleton variant="text" width="92%" height={40} />
								<Skeleton variant="text" width="97%" height={40} />
								<Skeleton variant="text" width="100%" height={40} />
								<Skeleton variant="text" width="85%" height={40} />
							</Box>

							{/* Divider space */}
							<Box sx={{ marginY: '1rem' }} />

							{/* Second paragraph */}
							<Box>
								<Skeleton variant="text" width="97%" height={40} />
								<Skeleton variant="text" width="100%" height={40} />
								<Skeleton variant="text" width="93%" height={40} />
								<Skeleton variant="text" width="96%" height={40} />
								<Skeleton variant="text" width="99%" height={40} />
								<Skeleton variant="text" width="94%" height={40} />
								<Skeleton variant="text" width="80%" height={40} />
							</Box>
						</Box>

						{/* Profile image skeleton */}
						<Skeleton
							variant="circular"
							sx={{
								maxWidth: '50%',
								minWidth: '27.5%',
								border: '1px solid rgba(255, 255, 240, 0.3)',
								...smileFlex,
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default MCLandscapeSkeleton
