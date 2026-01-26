import { Button, styled, Typography } from '@mui/material'

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
