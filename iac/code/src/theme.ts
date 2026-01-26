import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#2f4f4f',
		},
		secondary: {
			main: '#87CEEB',
		},
		text: {
			primary: '#FFFFF0',
			secondary: 'rgba(240, 255, 240, 0.8)',
			disabled: 'rgba(240, 255, 240, 0.6)',
		},
		background: {
			default: '#1f2124',
			paper: 'rgba(255, 255, 255, 0.1)',
		},
		action: {
			hover: '#3a5f5f',
		},
		border: {
			main: 'rgba(240, 255, 240, 0.30)',
			light: 'rgba(240, 255, 240, 0.15)',
		},
	},
})

declare module '@mui/material/styles' {
	interface Palette {
		border: Palette['primary']
	}
	interface PaletteOptions {
		border?: PaletteOptions['primary']
	}
}

export default theme
