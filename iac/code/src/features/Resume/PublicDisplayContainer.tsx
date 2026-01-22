import { Typography } from '@mui/material'

interface PublicDisplayContainerProps {
	displayItem: string
	depth: number
	breadth: string | number
}
const PublicDisplayContainer = (props: PublicDisplayContainerProps) => (
	<Typography
		variant="h6"
		data-depth={props.depth}
		data-breadth={props.breadth}
	>
		{props.displayItem}
	</Typography>
)

export default PublicDisplayContainer
