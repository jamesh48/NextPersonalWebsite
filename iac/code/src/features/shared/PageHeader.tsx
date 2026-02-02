import { PrimaryTypography } from 'StyledComponents'
import { Box, type SxProps } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import type { ReactNode } from 'react'

interface PageHeaderProps {
	children: ReactNode
	containerSx?: SxProps
	typographySx?: SxProps
}

const PageHeader = ({
	children,
	containerSx = {},
	typographySx = {},
}: PageHeaderProps) => {
	const mobileBrowserState = useMobileBrowserCheck()
	return (
		<Box
			sx={{
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				mt: 2,
				mb: 1,
				flex: 0.2,
				...containerSx,
			}}
		>
			<PrimaryTypography
				variant='h3'
				gutterBottom
				width='100%'
				fontSize={mobileBrowserState ? '2.5rem' : '3rem'}
				sx={typographySx}
			>
				{children}
			</PrimaryTypography>
		</Box>
	)
}

export default PageHeader
