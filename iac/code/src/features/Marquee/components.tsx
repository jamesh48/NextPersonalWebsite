import { PrimaryTypography } from 'StyledComponents'
import { styled } from '@mui/material'

const StyledMarqueeParagraph = styled(PrimaryTypography)(({ theme: _ }) => ({
	textRendering: 'geometricPrecision',
	width: '97.5%',
	lineHeight: 1.95,
	fontWeight: 200,
	letterSpacing: '.25px',
}))

export const StyledPortraitParagraph = styled(StyledMarqueeParagraph)(() => ({
	fontSize: '1rem',
	margin: '.5rem',
}))

export const StyledLandscapeParagraph = styled(StyledMarqueeParagraph)(() => ({
	fontSize: '1.5rem',
}))
