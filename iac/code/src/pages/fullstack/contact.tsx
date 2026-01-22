import {
	Email as EmailIcon,
	LinkedIn as LinkedInIcon,
	LocationOn as LocationIcon,
	Phone as PhoneIcon,
} from '@mui/icons-material'
import { Box, Card, Container, Grid, Link, Typography } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'

const ContactItem = ({
	icon,
	title,
	value,
	href,
}: {
	icon: React.ReactNode
	title: string
	value: string
	href?: string
}) => {
	const content = (
		<Card
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				textAlign: 'center',
				p: 3,
				backgroundColor: '#2f4f4f',
				border: '1px solid rgba(240, 255, 240, 0.15)',
				transition: 'all 0.3s ease',
				cursor: href ? 'pointer' : 'default',
				'&:hover': href
					? {
							transform: 'translateY(-4px)',
							backgroundColor: '#3a5f5f',
							border: '1px solid rgba(240, 255, 240, 0.3)',
							boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
						}
					: {},
			}}
		>
			<Box
				sx={{
					mb: 2,
					color: 'ivory',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: 60,
					height: 60,
					borderRadius: '50%',
					backgroundColor: 'rgba(135, 206, 235, 0.3)',
					position: 'relative',
				}}
			>
				<Box sx={{ position: 'absolute', color: '#87CEEB' }}>{icon}</Box>
			</Box>
			<Typography
				variant="overline"
				sx={{
					color: 'rgba(240, 255, 240, 0.6)',
					mb: 1,
					letterSpacing: '0.1em',
				}}
			>
				{title}
			</Typography>
			<Typography variant="h6" sx={{ color: 'ivory', fontWeight: 400 }}>
				{value}
			</Typography>
		</Card>
	)

	if (href) {
		return (
			<Link href={href} underline="none" target="_blank" rel="noopener">
				{content}
			</Link>
		)
	}

	return content
}

const ContactForm = () => {
	const mobileBrowserState = useMobileBrowserCheck()

	return (
		<Container maxWidth="lg" sx={{ py: 8 }}>
			<Box sx={{ textAlign: 'center', mb: 6 }}>
				<Typography variant="h3" gutterBottom sx={{ color: 'ivory' }}>
					Get In Touch
				</Typography>
				<Typography
					variant="body1"
					sx={{
						maxWidth: 600,
						mx: 'auto',
						color: 'rgba(240, 255, 240, 0.8)',
						lineHeight: 1.6,
					}}
				>
					Feel free to reach out through any of the channels below. I'm always
					open to discussing new opportunities and collaborations.
				</Typography>
			</Box>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={3}>
					<ContactItem
						icon={<LocationIcon fontSize="large" />}
						title="Location"
						value="Boulder, CO"
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<ContactItem
						icon={<EmailIcon fontSize="large" />}
						title="Email"
						value="jameshrivnak4@gmail.com"
						href="mailto:jameshrivnak4@gmail.com"
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<ContactItem
						icon={<PhoneIcon fontSize="large" />}
						title="Phone"
						value="(303) 517-2085"
						href="tel:303-517-2085"
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<ContactItem
						icon={<LinkedInIcon fontSize="large" />}
						title="LinkedIn"
						value="Connect"
						href="https://linkedin.com/in/james-hrivnak"
					/>
				</Grid>
			</Grid>

			{mobileBrowserState && (
				<Box sx={{ mt: 6, textAlign: 'center' }}>
					<Typography
						variant="body2"
						sx={{ color: 'rgba(240, 255, 240, 0.5)' }}
					>
						Tap any card to get in touch
					</Typography>
				</Box>
			)}
		</Container>
	)
}

export default ContactForm
