import { styled, Tab, Tabs } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

enum HeaderTabValue {
	home = '0',
	contact = '1',
}

const StyledTab = styled(Tab)({
	minWidth: 'unset',
	maxWidth: 'unset',
	flex: 1,
	backgroundColor: 'ivory',
})

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

	const handleChange = (ev: React.SyntheticEvent, value: HeaderTabValue) => {
		ev.preventDefault()

		router.push(hrefMap[value])
	}

	return (
		<Tabs
			onChange={handleChange}
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
			}}
		>
			<StyledTab label="Home" />
			<StyledTab label="Contact" />
		</Tabs>
	)
}

export default Header
