import {
	Download as DownloadIcon,
	PictureAsPdf as PictureAsPdfIcon,
	Print as PrintIcon,
	ViewModule as ViewModuleIcon,
} from '@mui/icons-material'
import { Box, IconButton, styled, Tooltip } from '@mui/material'

import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { STATIC_CLOUDFRONT_LINK } from '../../constants'

interface ResumeActionBarProps {
	isPdfVisible: boolean
	setShowPdfDesktop: Dispatch<SetStateAction<boolean>>
	scrollParentRef: React.RefObject<HTMLDivElement>
}

const StyledResumeActionIcon = styled(IconButton)(({ theme }) => ({
	color: theme.palette.secondary.main,
	transition: 'all 0.2s ease-in-out',
	'&:hover': {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.action.hover,
		transform: 'scale(1.1)',
	},
}))

const ResumeActionBar = ({
	isPdfVisible,
	setShowPdfDesktop,
	scrollParentRef,
}: ResumeActionBarProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [positionState, setPositionState] = useState<
		'initial' | 'fixed' | 'bottom'
	>('initial')
	const [fixedRightOffset, setFixedRightOffset] = useState(16)
	const [initialTopOffset, setInitialTopOffset] = useState(0)

	// Increase this value to make it become fixed sooner (more head start)
	const stickyPoint = 500
	// Adjust this to move left (positive) or right (negative)
	const rightPadding = isPdfVisible ? 0 : -50

	const handlePrint = useCallback(() => {
		window.open(`${STATIC_CLOUDFRONT_LINK}/resume.pdf`, '_blank')
	}, [])

	const handleResumeDownload = useCallback(() => {
		fetch(`${STATIC_CLOUDFRONT_LINK}/resume.pdf`)
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

	const handleScroll = useCallback(() => {
		if (!containerRef.current) return

		const parent = scrollParentRef.current
		if (!parent) return

		const parentRect = parent.getBoundingClientRect()
		const containerHeight = containerRef.current.offsetHeight

		// Calculate where the action bar would naturally be (its initial offset from parent top)
		if (initialTopOffset === 0 && positionState === 'initial') {
			setInitialTopOffset(containerRef.current.offsetTop)
		}

		// Calculate the right offset for fixed positioning
		const rightOffset = window.innerWidth - parentRect.right + rightPadding
		setFixedRightOffset(rightOffset)

		// Calculate where action bar naturally sits relative to viewport
		const naturalTop = parentRect.top + initialTopOffset

		// Action bar hasn't reached the sticky point yet (still scrolling naturally)
		if (naturalTop >= stickyPoint) {
			setPositionState('initial')
		}
		// Parent is ending - action bar should stick to bottom of parent
		else if (parentRect.bottom <= containerHeight + stickyPoint + 16) {
			setPositionState('bottom')
		}
		// In between - should be fixed at the sticky point
		else {
			setPositionState('fixed')
		}
	}, [initialTopOffset, positionState, rightPadding, scrollParentRef.current])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true })
		window.addEventListener('resize', handleScroll, { passive: true })
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleScroll)
		}
	}, [handleScroll])

	const getSxStyles = () => {
		const baseStyles = {
			border: '1px solid',
			borderColor: 'secondary.main',
			borderRadius: '2rem',
			padding: '.25rem',
			backgroundColor: '#3a5f5f',
			backdropFilter: 'blur(8px)',
			boxShadow: 1,
			transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
			zIndex: 10,
			'&:hover': {
				boxShadow: 3,
				borderColor: 'rgb(135, 206, 235)',
				transform: 'translateY(-2px)',
			},
		}

		if (positionState === 'fixed') {
			return {
				...baseStyles,
				position: 'fixed',
				top: stickyPoint,
				right: fixedRightOffset,
			}
		}

		if (positionState === 'bottom') {
			return {
				...baseStyles,
				position: 'absolute',
				bottom: 16,
				right: rightPadding,
				top: 'auto',
			}
		}

		// initial - scrolls with content
		return {
			...baseStyles,
			position: 'absolute',
			top: initialTopOffset || 0,
			right: rightPadding,
		}
	}

	return (
		<Box ref={containerRef} sx={getSxStyles()}>
			{isPdfVisible && (
				<Tooltip title='Print Resume'>
					<StyledResumeActionIcon onClick={handlePrint}>
						<PrintIcon />
					</StyledResumeActionIcon>
				</Tooltip>
			)}

			{isPdfVisible && (
				<Tooltip title='Download Resume'>
					<StyledResumeActionIcon
						aria-label='download'
						onClick={handleResumeDownload}
					>
						<DownloadIcon />
					</StyledResumeActionIcon>
				</Tooltip>
			)}

			<Tooltip
				title={isPdfVisible ? 'View Interactive Resume' : 'View PDF Resume'}
			>
				<StyledResumeActionIcon
					aria-label='switch-view'
					onClick={() => setShowPdfDesktop((prev) => !prev)}
				>
					{isPdfVisible ? <ViewModuleIcon /> : <PictureAsPdfIcon />}
				</StyledResumeActionIcon>
			</Tooltip>
		</Box>
	)
}

export default ResumeActionBar
