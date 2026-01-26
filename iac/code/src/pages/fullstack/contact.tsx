import {
	DisabledTypography,
	PrimaryTypography,
	SecondaryTypography,
	StyledSectionCard,
} from 'StyledComponents'
import {
	Description as DescriptionIcon,
	Email as EmailIcon,
	LinkedIn as LinkedInIcon,
	LocationOn as LocationIcon,
	Phone as PhoneIcon,
} from '@mui/icons-material'
import { Box, Card, Container, Link, styled, Typography } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import Head from 'next/head'
import { useCallback } from 'react'
import { STATIC_CLOUDFRONT_LINK } from '../../constants'

interface ContactItemProps {
	icon: React.ReactNode
	title: string
	value: string
	href?: string
	onClick?: () => void
}

const StyledContactCard = styled(Card)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	border: '1px solid',
	borderColor: theme.palette.border.light,
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	textAlign: 'center',
	borderRadius: '1rem', // More rounded corners for a softer look
}))

const StyledContactCardIconContainer = styled(Box)(({ theme }) => ({
	color: theme.palette.primary.main,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 60,
	height: 60,
	borderRadius: '50%',
	backgroundColor: theme.palette.primary.main,
	position: 'relative',
	marginBottom: 2,
}))

const StyledContactCardIcon = styled(Typography)(({ theme }) => ({
	color: theme.palette.secondary.main,
	position: 'absolute',
}))

const ContactItem = ({
	icon,
	title,
	value,
	href,
	onClick,
}: ContactItemProps) => {
	const content = (
		<StyledContactCard
			sx={{
				p: 3,
				height: '75%',
				transition: 'all 0.3s ease',
				willChange: 'transform',
				cursor: href || onClick ? 'pointer' : 'default',
				'&:hover': (href || onClick) && {
					transform: 'translateY(-4px)',
					backgroundColor: '#3a5f5f',
					border: '1px solid rgba(240, 255, 240, 0.3)',
					boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
				},
			}}
			onClick={onClick}
		>
			<StyledContactCardIconContainer>
				<StyledContactCardIcon>{icon}</StyledContactCardIcon>
			</StyledContactCardIconContainer>
			<DisabledTypography
				variant="overline"
				sx={{ mb: 1, letterSpacing: '0.1em' }}
			>
				{title}
			</DisabledTypography>
			<Typography variant="h6" sx={{ color: 'ivory', fontWeight: 400 }}>
				{value}
			</Typography>
		</StyledContactCard>
	)

	if (href && !onClick) {
		return (
			<Link href={href} underline="none" target="_blank" rel="noopener">
				{content}
			</Link>
		)
	}

	return content
}

const ContactMe = () => {
	const mobileBrowserState = useMobileBrowserCheck()

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
		<Container maxWidth="xl" sx={{ py: 8 }}>
			<StyledSectionCard
				sx={{
					// Add internal padding for breathing room
					p: { xs: 3, sm: 4, md: 5 },
				}}
			>
				<Box sx={{ textAlign: 'center', mb: 6 }}>
					<PrimaryTypography variant="h3" gutterBottom>
						Get In Touch
					</PrimaryTypography>
					<SecondaryTypography
						variant="body1"
						sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
					>
						Feel free to reach out through any of the channels below.
					</SecondaryTypography>
					<SecondaryTypography
						variant="body1"
						sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
					>
						I'm always open to discussing new opportunities and collaborations.
					</SecondaryTypography>
				</Box>

				<Box
					sx={{
						mx: 'auto',
						display: 'grid',
						gap: 2, // Increased gap between cards
						justifyContent: 'center',
						gridTemplateColumns: {
							xs: '1fr',
							sm: 'repeat(2, 1fr)',
							md: 'repeat(3, 1fr)',
							lg: 'repeat(5, 1fr)',
						},
					}}
				>
					<ContactItem
						icon={<LocationIcon fontSize="large" />}
						title="Location"
						value="Boulder, CO"
					/>

					<ContactItem
						icon={<EmailIcon fontSize="large" />}
						title="Email"
						value="jameshrivnak4@gmail.com"
						href="mailto:jameshrivnak4@gmail.com"
					/>

					<ContactItem
						icon={<PhoneIcon fontSize="large" />}
						title="Phone"
						value="(303) 517-2085"
						href="tel:303-517-2085"
					/>

					<ContactItem
						icon={<LinkedInIcon fontSize="large" />}
						title="LinkedIn"
						value="Connect"
						href="https://linkedin.com/in/james-hrivnak"
					/>

					<ContactItem
						icon={<DescriptionIcon fontSize="large" />}
						title="Resume"
						value="Download PDF"
						onClick={handleResumeDownload}
					/>
				</Box>

				{mobileBrowserState && (
					<Box sx={{ mt: 6, textAlign: 'center', pb: 2 }}>
						<SecondaryTypography variant="body2">
							Tap any card to get in touch
						</SecondaryTypography>
					</Box>
				)}
			</StyledSectionCard>
		</Container>
	)
}

const Contact = () => {
	return (
		<>
			<Head>
				<title>Contact - James Hrivnak</title>
				<meta name="description" content="Get in touch with James Hrivnak" />
			</Head>
			<ContactMe />
		</>
	)
}

export default Contact
