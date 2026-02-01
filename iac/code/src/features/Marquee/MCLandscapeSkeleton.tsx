import { Box, Skeleton } from '@mui/material'
import PageHeader from '../shared/PageHeader'

const MCLandscapeSkeleton = () => (
	<Box sx={{ height: '100%', width: '100%' }} id='about-me-marquee-details'>
		{/* Title skeleton */}
		<PageHeader>
			<Skeleton variant='text' width='100%' height={80} />
		</PageHeader>

		<Box>
			<Box
				id='marquee-contents'
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 2,
					overflow: 'hidden',
					width: '100%',
				}}
			>
				{/* Paragraph skeletons */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
						// Important: allows flex item to shrink below content size
						minWidth: 0,
						overflow: 'hidden',
					}}
					id='marquee-paragraphs'
				>
					{/* First paragraph */}
					<Box>
						<Skeleton variant='text' sx={{ width: '95%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '98%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '92%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '97%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '100%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '85%' }} height={40} />
					</Box>

					{/* Divider space */}
					<Box sx={{ marginY: '1rem' }} />

					{/* Second paragraph */}
					<Box>
						<Skeleton variant='text' sx={{ width: '97%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '100%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '93%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '96%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '99%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '94%' }} height={40} />
						<Skeleton variant='text' sx={{ width: '80%' }} height={40} />
					</Box>
				</Box>

				{/* Profile image skeleton - circular with fixed dimensions */}
				<Skeleton
					variant='circular'
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
)

export default MCLandscapeSkeleton
