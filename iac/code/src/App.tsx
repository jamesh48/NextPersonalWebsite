import { setPortraitState, setSmallWindowState } from '@app/appSlice'
import { useDispatch } from '@app/reduxHooks'
import { Container, useMediaQuery } from '@mui/material'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import PortfolioJSON from './Data/PortfolioDataJSON'
import MarqueeContainer from './features/Marquee/MarqueeContainer'
import PortfolioCarousel from './features/Portfolio/PortfolioCarousel/Carousel'
import Resume from './features/Resume/Resume'
import Section from './Section'

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
				<meta name='description' content="James Hrivnak's Portfolio" />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Container
				maxWidth='xl'
				id='homeContainer'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 4,
					py: 4,
					px: 'unset !important',
					maxWidth: 'unset !important',
				}}
			>
				<Section
					id='about-me-root'
					dataName='About Me'
					sx={{
						alignItems: 'center',
						justifyContent: 'center',
						display: 'flex',
						width: '100%',
					}}
					minHeight='unset'
				>
					<MarqueeContainer smileCallback={smileCallback} />
				</Section>

				<Section id='resume-root' dataName='Resume' minHeight='unset'>
					<Resume />
				</Section>

				<Section
					id='portfolio-root'
					dataName='Portfolio'
					sx={{
						width: '100%',
						'p, h3, h4, h5, h6': { margin: '1%' },
					}}
				>
					<PortfolioCarousel portfolioJSON={PortfolioJSON} />
				</Section>
			</Container>
		</>
	)
}

export default Home
