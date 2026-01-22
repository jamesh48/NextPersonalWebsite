import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useRef } from 'react'
import { STATIC_CLOUDFRONT_LINK } from '../constants'
import Header from '../features/Header/Header'

const MyApp = ({ Component, pageProps }: AppProps) => {
	const router = useRouter()
	const currentRoute = useRef(router.pathname)

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			const prevRoute = currentRoute.current
			currentRoute.current = url
			if (prevRoute !== '/fullstack/minesweeper') {
				const script = document.createElement('script')

				script.src = `${STATIC_CLOUDFRONT_LINK}/mines/build/public/public-bundle.js`
				script.async = true
				document.body.appendChild(script)
			}
		}

		router.events.on('routeChangeStart', handleRouteChange)

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
		}
	}, [])

	// useEffect(() => {
	//   if (router.pathname !== '/fullstack/minesweeper') {

	//     return () => {
	//       document.body.removeChild(script);
	//     };
	//   }
	// }, [router.pathname]); // router prop or w/e

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="stylesheet"
					href={`${STATIC_CLOUDFRONT_LINK}/mines/build/public/index.css`}
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<title>James Hrivnak</title>
			</Head>
			<Header />

			<Component {...(pageProps as AppProps['pageProps'])} />
			<Script
				src={`${STATIC_CLOUDFRONT_LINK}/mines/build/public/public-bundle.js`}
			/>
		</>
	)
}

export default MyApp
