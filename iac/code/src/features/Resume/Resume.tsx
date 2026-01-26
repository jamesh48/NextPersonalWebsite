import { StyledButton } from 'StyledComponents'
import { useDispatch } from '@app/reduxHooks'
import { Download as DownloadIcon } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import ResumeActionBar from 'features/Resume/ResumeActionBar'
import { useCallback, useState } from 'react'
import { When } from 'react-if'
import { STATIC_CLOUDFRONT_LINK } from '../../constants'
import resumeDetails from '../../Data/Resume.json'
import IterateContainers from './IterateContainers'
import { exitHoverParams } from './resumeSlice'

const Resume = () => {
	const mobileBrowserState = useMobileBrowserCheck()
	const dispatch = useDispatch()
	const landscapeOrientation = useMediaQuery('(orientation: landscape)')
	const portraitOrientation = useMediaQuery('(orientation: portrait)')
	const [showPdfDesktop, setShowPdfDesktop] = useState(false)

	const isPdfVisible = mobileBrowserState || showPdfDesktop

	const handleResumeDownload = useCallback(() => {
		fetch(`${STATIC_CLOUDFRONT_LINK}/main/main-images/resume.pdf`)
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = 'James_Hrivnak_Resume.pdf'
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
			</Box>

			<Box
				onMouseLeave={() => {
					dispatch(exitHoverParams())
				}}
				sx={{
					margin: mobileBrowserState ? '5% 0' : '1% 0',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
				}}
			>
				<When condition={!mobileBrowserState}>
					<ResumeActionBar
						isPdfVisible={isPdfVisible}
						setShowPdfDesktop={setShowPdfDesktop}
					/>
				</When>
				{/* PDF View */}
				<Box
					sx={{
						width: '100%',
						display: isPdfVisible ? 'flex' : 'none',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 2,
					}}
				>
					<embed
						src={`${STATIC_CLOUDFRONT_LINK}/main/main-images/resume.pdf#toolbar=0&navpanes=0&view=FitH`}
						type="application/pdf"
						style={{
							width: '100%',
							maxWidth: '900px',
							height: mobileBrowserState ? '60vh' : '100vh',
							border: 'none',
						}}
					/>
					<When condition={mobileBrowserState}>
						<StyledButton
							fullWidth
							variant="contained"
							size="large"
							startIcon={<DownloadIcon />}
							onClick={handleResumeDownload}
							sx={{ py: 1.5 }}
						>
							Download Resume
						</StyledButton>
					</When>
				</Box>

				{/* Interactive View */}
				<Box
					sx={{
						display: isPdfVisible ? 'none' : 'block',
					}}
				>
					{IterateContainers({
						mobileBrowser: mobileBrowserState,
						resumeDetails: resumeDetails,
					})}
				</Box>
			</Box>
		</Box>
	)
}

export default Resume
