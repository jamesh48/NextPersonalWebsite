import { styled, Tab, Tabs } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

enum HeaderTabValue {
	home = '0',
	contact = '1',
}

const StyledTab = styled(Tab)(({ theme }) => ({
	minWidth: 'unset',
	maxWidth: 'unset',
	flex: 1,
	backgroundColor: theme.palette.primary.main,
	color: 'rgba(240, 255, 240, 0.8)',
	fontWeight: 500,
	fontSize: '1rem',
	transition: 'all 0.3s ease',
	border: '1px solid rgba(240, 255, 240, 0.15)',
	'&.Mui-selected': {
		backgroundColor: theme.palette.primary.main,
		fontWeight: 700,
		color: 'ivory',
		border: '1px solid rgba(240, 255, 240, 0.3)',
	},
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
		color: 'ivory',
		border: '1px solid',
		borderColor: theme.palette.border.light,
	},
}))

const Header = () => {
	const router = useRouter()
	const mobileBrowserState = useMobileBrowserCheck()

	const hrefMap = useMemo(
		() => ({
			[HeaderTabValue.home]: '/',
			[HeaderTabValue.contact]: '/fullstack/contact',
		}),
		[],
	)

	const activeTab = useMemo(() => {
		const currentPath = router.pathname
		if (currentPath === '/') return HeaderTabValue.home
		if (currentPath.startsWith('/fullstack/contact'))
			return HeaderTabValue.contact
		return HeaderTabValue.home
	}, [router.pathname])

	const handleChange = (ev: React.SyntheticEvent, value: HeaderTabValue) => {
		ev.preventDefault()
		router.push(hrefMap[value])
	}

	return (
		<Tabs
			value={activeTab}
			onChange={handleChange}
			TabIndicatorProps={{
				style: {
					backgroundColor: '#87CEEB',
					height: '3px',
				},
			}}
			sx={{
				position: 'sticky',
				top: 0,
				width: mobileBrowserState ? '100%' : '75%',
				display: 'flex',
				zIndex: 1,
				justifyContent: 'center',
				height: '3rem',
				margin: '0 auto',
				alignSelf: 'center',
				backgroundColor: '#2f4f4f',
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
			}}
		>
			<StyledTab label="Home" value={HeaderTabValue.home} />
			<StyledTab label="Contact" value={HeaderTabValue.contact} />
		</Tabs>
	)
}

export default Header
