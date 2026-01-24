import { setPortraitState, setSmallWindowState } from '@app/appSlice'
import { useDispatch } from '@app/reduxHooks'
import { Box, useMediaQuery } from '@mui/material'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import PortfolioJSON from './Data/PortfolioDataJSON'
import MarqueeContainer from './features/Marquee/MarqueeContainer'
import PortfolioCarousel from './features/Portfolio/PortfolioCarousel/Carousel'
import Resume from './features/Resume/Resume'

const Home = () => {
	const [_smileLoaded, setSmileLoaded] = useState(false)
	const dispatch = useDispatch()

	const initPortraitState = useMediaQuery('(orientation: portrait)')

	useEffect(() => {
		dispatch(setPortraitState(initPortraitState))
	}, [initPortraitState, dispatch])

	const smileCallback = useCallback(() => {
		setSmileLoaded(true)
	}, [])

	useEffect(() => {
		dispatch(setSmallWindowState(window.innerWidth < 1150))
	}, [dispatch])

	return (
		<>
			<Head>
				<title>James Hrivnak</title>
				<meta name="description" content="James Hrivnak's Portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box
				id="homeContainer"
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					id="about-me-root"
					sx={{
						paddingBottom: '5%',
						minHeight: '90vh',
						display: 'flex',
						alignItems: 'center',
					}}
					data-name="About Me"
				>
					<MarqueeContainer smileCallback={smileCallback} />
				</Box>

				<Box
					data-name="Resume"
					id="resume-root"
					className="container"
					sx={{ display: 'flex', flexDirection: 'column' }}
				>
					<Resume />
				</Box>

				<Box
					data-name="Portfolio"
					id="portfolio-root"
					sx={{
						minHeight: '90vh',
						display: 'flex',
						flexDirection: 'column',
						paddingBottom: 0,
						marginBottom: 0,
						width: '100%',
						margin: '0 auto',
						'p, h3, h4, h5, h6': { margin: '1%' },
					}}
				>
					<PortfolioCarousel portfolioJSON={PortfolioJSON} />
				</Box>
			</Box>
		</>
	)
}

export default Home
