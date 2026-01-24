import { Box } from '@mui/material'

interface FooterItemContainerProps {
	iconData: {
		url: string
		iconLink: string
		loaded: boolean
	}
}

export const FooterItemContainer = ({ iconData }: FooterItemContainerProps) => {
	return (
		<Box
			className="footerItemContainer"
			onClick={() => window.open(iconData.iconLink, '_blank', 'noopener')}
			sx={{
				flex: 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				height: '100%',
				transition: 'background-color 0.2s ease',

				'&:hover .footerIcon': {
					opacity: 1,
					transform: 'scale(1.1)',
				},

				'&:hover': {
					backgroundColor: 'rgba(0, 0, 0, 0.05)',
				},
			}}
		>
			<Box
				className="footerIcon"
				sx={{
					width: 28,
					height: 28,
					backgroundImage: `url(${iconData.url})`,
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundColor: '#ffffff',
					padding: '4px',
					borderRadius: '4px',
					opacity: 0.45,
					transition: 'opacity 0.2s ease, transform 0.2s ease',
					pointerEvents: 'none',
				}}
			/>
		</Box>
	)
}
