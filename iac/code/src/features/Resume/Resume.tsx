import { useDispatch } from '@app/reduxHooks'
import {
	PictureAsPdf as PictureAsPdfIcon,
	Print as PrintIcon,
	ViewModule as ViewModuleIcon,
} from '@mui/icons-material'
import {
	Box,
	IconButton,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { useState } from 'react'
import resumeDetails from '../../Data/Resume.json'
import IterateContainers from './IterateContainers'
import { exitHoverParams } from './resumeSlice'

const Resume = () => {
	const resumeMobileBrowserState = useMobileBrowserCheck()
	const dispatch = useDispatch()
	const landscapeOrientation = useMediaQuery('(orientation: landscape)')
	const portraitOrientation = useMediaQuery('(orientation: portrait)')
	const [showPdf, setShowPdf] = useState(false)

	const handlePrint = () => {
		window.open(
			'https://static.fullstackhrivnak.com/main/main-images/resume.pdf',
			'_blank',
		)
	}

	return (
		<Box
			sx={{
				width: '100%',
				...(() => {
					if (landscapeOrientation) {
						return { marginBottom: '5%' }
					}
					if (portraitOrientation) {
						return { paddingBottom: 0 }
					}
					return {}
				})(),
			}}
		>
			<Box sx={{ position: 'relative' }}>
				<Typography variant="h3" align="center">
					Resume
				</Typography>

				<Box
					sx={{
						position: 'absolute',
						top: 0,
						right: resumeMobileBrowserState ? 8 : 16,
						display: 'flex',
						gap: 0.5,
					}}
				>
					{showPdf && (
						<Tooltip title="Print Resume">
							<IconButton
								onClick={handlePrint}
								sx={{
									color: 'primary.main',
									cursor: 'pointer',
								}}
							>
								<PrintIcon />
							</IconButton>
						</Tooltip>
					)}

					<Tooltip
						title={showPdf ? 'View Interactive Resume' : 'View PDF Resume'}
					>
						<IconButton
							onClick={() => setShowPdf(!showPdf)}
							sx={{
								color: 'primary.main',
								cursor: 'pointer',
							}}
						>
							{showPdf ? <ViewModuleIcon /> : <PictureAsPdfIcon />}
						</IconButton>
					</Tooltip>
				</Box>
			</Box>

			<Box
				onMouseLeave={() => {
					dispatch(exitHoverParams())
				}}
				sx={{
					margin: resumeMobileBrowserState ? '5% 0' : '1% 0',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* PDF View */}
				<Box
					sx={{
						width: '100%',
						display: showPdf ? 'flex' : 'none',
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}
				>
					<embed
						src="https://static.fullstackhrivnak.com/main/main-images/resume.pdf#toolbar=0&navpanes=0&view=FitH"
						type="application/pdf"
						style={{
							width: '100%',
							maxWidth: '900px',
							height: '100vh',
							border: 'none',
						}}
					/>
				</Box>

				{/* Interactive View */}
				<Box
					sx={{
						display: showPdf ? 'none' : 'block',
					}}
				>
					{IterateContainers({
						mobileBrowser: resumeMobileBrowserState,
						resumeDetails: resumeDetails,
					})}
				</Box>
			</Box>
		</Box>
	)
}

export default Resume
