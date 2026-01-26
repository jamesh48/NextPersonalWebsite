import { appInitialState } from '@app/appSlice'
import GlobalStore from '@app/store'
import { useIsSsr } from '@shared/customHooks'
import { smallWindowCheck } from '@shared/globalUtils'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import Layout from '../layouts/Layout'
import '../styles/globals.scss'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
	const isSsr = useIsSsr()

	let appInitialProps = {}
	if (!isSsr) {
		appInitialProps = {
			smallWindowState: smallWindowCheck(),
		}
	}

	GlobalStore.prototype.configureGlobalStore({
		app: {
			...appInitialState,
			...appInitialProps,
		},
	})

	return (
		<>
			<Head>
				<title>FullStack Hrivnak | Portfolio & Projects</title>
				<meta
					name="description"
					content="Full-stack web developer specializing in modern web applications. View my portfolio, projects, and technical expertise."
				/>
				<meta name="author" content="James Hrivnak" />

				<meta property="og:title" content="FullStack Hrivnak" />
				<meta
					property="og:description"
					content="Full-stack web developer specializing in modern web applications. View my portfolio, projects, and technical expertise."
				/>
				<meta property="og:type" content="website" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="FullStack Hrivnak" />
				<meta
					name="twitter:description"
					content="Full-stack web developer specializing in modern web applications."
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<Provider store={GlobalStore.prototype.getStore()}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</ThemeProvider>
		</>
	)
}

export default MyApp
