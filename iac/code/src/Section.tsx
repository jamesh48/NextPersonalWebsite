import { Box, type SxProps, type Theme } from '@mui/material'
import type { ReactNode } from 'react'

interface SectionProps {
	id: string
	dataName: string
	children: ReactNode
	sx?: SxProps<Theme>
	minHeight?: string
}

const Section = ({
	id,
	dataName,
	children,
	sx,
	minHeight = '90vh',
}: SectionProps) => (
	<Box
		id={id}
		data-name={dataName}
		sx={{
			minHeight,
			display: 'flex',
			flexDirection: 'column',
			...sx,
		}}
	>
		{children}
	</Box>
)

export default Section
