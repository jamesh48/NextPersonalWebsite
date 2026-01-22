import { useDispatch } from '@app/reduxHooks'
import {
	Download as DownloadIcon,
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
import { useCallback, useState } from 'react'
import resumeDetails from '../../Data/Resume.json'
import IterateContainers from './IterateContainers'
import { exitHoverParams } from './resumeSlice'

const Resume = () => {
	const resumeMobileBrowserState = useMobileBrowserCheck()
	const dispatch = useDispatch()
	const landscapeOrientation = useMediaQuery('(orientation: landscape)')
	const portraitOrientation = useMediaQuery('(orientation: portrait)')
	const [showPdfDesktop, setShowPdfDesktop] = useState(false)

	const isPdfVisible = resumeMobileBrowserState || showPdfDesktop

	const handlePrint = useCallback(() => {
		window.open(
			'https://static.fullstackhrivnak.com/main/main-images/resume.pdf',
			'_blank',
		)
	}, [])

	const handleResumeDownload = useCallback(() => {
		fetch('https://static.fullstackhrivnak.com/main/main-images/resume.pdf')
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = 'resume.pdf'
				document.body.appendChild(a)
				a.click()
				window.URL.revokeObjectURL(url)
				document.body.removeChild(a)
			})
	}, [])

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
			<Box
				sx={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography variant="h3" align="center">
					Resume
				</Typography>

				<Box
					sx={{
						position: 'absolute',
						right: 16,
						border: '1px solid',
						borderColor: 'primary.main',
						borderRadius: '2rem',
						padding: '.25rem',
						backgroundColor: 'background.paper',
						backdropFilter: 'blur(8px)',
						boxShadow: 1,
						transition: 'all 0.2s ease-in-out',
						'&:hover': {
							boxShadow: 3,
							borderColor: 'primary.dark',
							transform: 'translateY(-2px)',
						},
					}}
				>
					{isPdfVisible && !resumeMobileBrowserState && (
						<Tooltip title="Print Resume">
							<IconButton
								onClick={handlePrint}
								sx={{
									color: 'primary.main',
									transition: 'all 0.2s ease-in-out',
									'&:hover': {
										backgroundColor: 'primary.main',
										color: 'primary.contrastText',
										transform: 'scale(1.1)',
									},
								}}
							>
								<PrintIcon />
							</IconButton>
						</Tooltip>
					)}

					{isPdfVisible && (
						<Tooltip title="Download Resume">
							<IconButton
								sx={{
									color: 'primary.main',
									transition: 'all 0.2s ease-in-out',
									'&:hover': {
										backgroundColor: 'primary.main',
										color: 'primary.contrastText',
										transform: 'scale(1.1)',
									},
								}}
								aria-label="download"
								onClick={handleResumeDownload}
							>
								<DownloadIcon />
							</IconButton>
						</Tooltip>
					)}

					{!resumeMobileBrowserState && (
						<Tooltip
							title={
								isPdfVisible ? 'View Interactive Resume' : 'View PDF Resume'
							}
						>
							<IconButton
								onClick={() => setShowPdfDesktop((prev) => !prev)}
								sx={{
									color: 'primary.main',
									transition: 'all 0.2s ease-in-out',
									'&:hover': {
										backgroundColor: 'primary.main',
										color: 'primary.contrastText',
										transform: 'scale(1.1)',
									},
								}}
							>
								{isPdfVisible ? <ViewModuleIcon /> : <PictureAsPdfIcon />}
							</IconButton>
						</Tooltip>
					)}
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
						display: isPdfVisible ? 'flex' : 'none',
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
						display: isPdfVisible ? 'none' : 'block',
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
