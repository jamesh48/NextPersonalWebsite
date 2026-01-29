import { Button, Card, styled, Typography } from '@mui/material'

export const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: 'ivory',
	border: '1px solid rgba(240, 255, 240, 0.15)',
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
		border: '1px solid rgba(240, 255, 240, 0.3)',
		transform: 'translateY(-2px)',
		boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
	},
	transition: 'all 0.3s ease',
}))

export const PrimaryTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.primary,
}))

export const SecondaryTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
}))

export const DisabledTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.disabled,
}))

export const StyledSectionCard = styled(Card)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	backdropFilter: 'blur(10px)',
	borderRadius: '1rem',
	boxShadow: '0 .5rem 2rem rgba(0, 0, 0, 0.1)',
}))
