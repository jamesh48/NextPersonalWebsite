import { Box } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import type { ReactNode } from 'react'
import footerJSON from '../Data/footerJSON'
import Footer from '../features/FooterComponents/Footer'
import Header from '../features/Header/Header' // assuming you have a header

interface LayoutProps {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	const mobileBrowserState = useMobileBrowserCheck()

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Header />

			<Box
				component="main"
				sx={{
					flex: 1,
					width: mobileBrowserState ? '100%' : '75%',
					margin: '0 auto',
					paddingBottom: '5vh', // Add space for the footer
				}}
			>
				{children}
			</Box>

			<Box
				component="footer"
				sx={{
					position: 'sticky',
					bottom: 0,
					width: '100%',
					zIndex: 100,
				}}
			>
				<Footer footerJSON={footerJSON} />
			</Box>
		</Box>
	)
}

export default Layout
