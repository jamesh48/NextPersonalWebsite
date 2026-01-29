import { StyledSectionCard } from 'StyledComponents'
import { Box } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import type { PortfolioJSONEntry } from 'features/Portfolio/portfolioTypes'
import { useCallback, useEffect, useState } from 'react'
import { When } from 'react-if'
import type { TPortfolioJSON } from '../../../Data/PortfolioDataJSON'
import Portfolio from '../Portfolio'
import PortfolioCarouselArrow from './PortfolioCarouselArrow'

interface PortfolioCarouselProps {
	portfolioJSON: TPortfolioJSON
}

export enum CarouselDirection {
	RIGHT = 'right',
	LEFT = 'left',
}

const PortfolioCarousel = ({ portfolioJSON }: PortfolioCarouselProps) => {
	const [portfolioCards, setPortfolioCards] = useState<PortfolioJSONEntry[][]>(
		[],
	)
	const [position, setPosition] = useState(0)
	const [direction, setDirection] = useState('neutral')
	const mobileView = useMobileBrowserCheck()

	const changeImage = (event: React.MouseEvent<HTMLElement>) => {
		const nextResult = /next-button/g.test(event.currentTarget.id)
		nextResult ? setDirection('forward') : setDirection('backward')
	}

	const compilePortfolioCards = useCallback((portfolioJSON: TPortfolioJSON) => {
		const compiledPortfolioCards = portfolioJSON.reduce<PortfolioJSONEntry[][]>(
			(allCards, card, index: number) => {
				if (index % 4 === 0) {
					allCards.push([card])
				} else {
					allCards[allCards.length - 1].push(card)
				}
				return allCards
			},
			[],
		)

		setPortfolioCards(compiledPortfolioCards)
	}, [])

	useEffect(() => {
		compilePortfolioCards(portfolioJSON)
	}, [portfolioJSON, compilePortfolioCards])

	useEffect(() => {
		if (direction !== 'neutral') {
			let counter = Number(position)
			const wholeNumber = setInterval(() => {
				counter += direction === 'forward' ? 0.1 : -0.1
				const newPosition = Number(counter.toFixed(1))

				setPosition(newPosition)

				if (newPosition % 1 === 0) {
					clearInterval(wholeNumber)
					setDirection('neutral')
				}
			}, 35)

			return () => {
				clearInterval(wholeNumber)
			}
		}
	}, [direction, position])

	const commonProps = {
		position,
		portfolioCards,
		changeImage,
	}

	const desktopAdjustment = mobileView ? '-3%' : '-6%'

	return (
		<StyledSectionCard
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box
				id='portfolio-slider'
				sx={{
					height: '90vh',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					id='outer-slider'
					sx={{
						overflow: 'hidden',
						position: 'relative',
						height: '100%',
						flex: 1,
					}}
				>
					<Box
						id='inner-slider'
						sx={{
							transform: `translateX(calc(${position * -101}% + ${position === 0 ? desktopAdjustment : mobileView ? '-3%' : '0%'}))`,
							display: 'flex',
							position: 'absolute',
							height: '100%',
							width: '100%',
						}}
					>
						{portfolioCards.map((portfolioCard, index) => (
							<Portfolio
								portfolioCard={portfolioCard}
								key={index}
								index={Math.abs(1 - index)}
							/>
						))}
					</Box>

					<When condition={!mobileView}>
						{/* Previous Button Box - Left Side */}
						<PortfolioCarouselArrow
							{...commonProps}
							direction={CarouselDirection.LEFT}
						/>

						{/* Next Button Box - Right Side */}
						<PortfolioCarouselArrow
							{...commonProps}
							direction={CarouselDirection.RIGHT}
						/>
					</When>
				</Box>
				<When condition={mobileView}>
					<Box
						sx={{
							position: 'relative',
							width: '50%',
							display: 'flex',
							alignItems: 'center',
							flex: 0.1,
						}}
					>
						{/* Prev Button Box - Left Side */}
						<PortfolioCarouselArrow
							{...commonProps}
							direction={CarouselDirection.LEFT}
							mobileView
						/>
						{/* Next Button Box - Right Side */}
						<PortfolioCarouselArrow
							{...commonProps}
							direction={CarouselDirection.RIGHT}
							mobileView
						/>
					</Box>
				</When>
			</Box>
		</StyledSectionCard>
	)
}

export default PortfolioCarousel
