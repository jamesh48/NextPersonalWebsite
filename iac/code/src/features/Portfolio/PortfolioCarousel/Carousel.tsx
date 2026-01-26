import { StyledSectionCard } from 'StyledComponents'
import { Box, Button, SvgIcon, styled } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { When } from 'react-if'
import Portfolio from '../Portfolio'

interface PortfolioCarouselProps {
	portfolioJSON: { [key: string]: any }[]
}

enum CarouselDirection {
	RIGHT = 'right',
	LEFT = 'left',
}

const StyledPortfolioCarouselArrowContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	position: 'absolute',
	top: 0,
	transition: 'all 0.2s ease-in-out',
	height: '100%',
	width: '5%',
	'&:hover': {
		borderLeft: '1px solid',
		borderColor: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
		cursor: 'pointer',
	},
}))

const StyledPortfolioCarouselArrowButton = styled(Button)(({ theme: _ }) => ({
	position: 'absolute',
	border: 'none',
	width: '5rem',
	height: '5rem',
	background: 'transparent',
	top: '50%',
	borderRadius: '50%',
	'&:disabled': {
		display: 'none',
	},
}))

const StyledPortfolioCarouselArrowButtonSVG = styled(SvgIcon)(
	({ theme: _ }) => ({
		pointerEvents: 'none',
		position: 'absolute',
		left: '20%',
		top: '20%',
		height: '60%',
		width: '60%',
		transform: 'scale(0.75)',
	}),
)

interface PortfolioCarouselArrowProps {
	portfolioCards: never[]
	position: number
	changeImage: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
	direction: CarouselDirection
	mobileView?: boolean
}

const PortfolioCarouselArrow = ({
	changeImage,
	position,
	portfolioCards,
	direction,
	mobileView,
}: PortfolioCarouselArrowProps) => {
	const disabledButton = useMemo(() => {
		if (direction === CarouselDirection.RIGHT) {
			return Number(position) + 1 > portfolioCards.length - 1
		} else {
			return Number(position) - 1 < 0
		}
	}, [direction, portfolioCards.length, position])

	return (
		<When
			condition={
				(position > 0 && direction === CarouselDirection.LEFT) ||
				(position < portfolioCards.length - 1 &&
					direction === CarouselDirection.RIGHT)
			}
		>
			<StyledPortfolioCarouselArrowContainer
				onClick={changeImage}
				id={
					direction === CarouselDirection.RIGHT ? 'next-button' : 'prev-button'
				}
				sx={{
					...(direction === CarouselDirection.RIGHT || mobileView
						? { right: 0 }
						: {}),
				}}
			>
				<StyledPortfolioCarouselArrowButton
					sx={{ transform: 'translateY(-50%) rotate(180deg)' }}
					className={`arrow-button prev-next-button`}
					disabled={disabledButton}
				>
					<StyledPortfolioCarouselArrowButtonSVG
						className="arrow-button-icon"
						viewBox="0 0 100 100"
					>
						<title>
							Arrow {direction === CarouselDirection.RIGHT ? 'Next' : 'Prev'}{' '}
							Button Icon
						</title>
						<path
							className="arrow"
							style={{
								fill: 'lightgray',
								pointerEvents: 'none',
								opacity: 0.8,
							}}
							d="M33.8352105,100 C31.4906934,99.997936 29.2429547,99.0649124 27.5861629,97.4060557 C24.1379457,93.9535448 24.1379457,88.3604714 27.5861629,84.9079605 L62.6044109,49.8897124 L27.5861629,14.8714644 C24.3395013,11.3872106 24.4353002,5.95761395 27.8028539,2.59006023 C31.1704076,-0.777493487 36.6000043,-0.873292384 40.0842581,2.37336919 L87.6006014,49.8897124 L40.0842581,97.4060557 C38.4274663,99.0649124 36.1797276,99.997936 33.8352105,100 L33.8352105,100 Z"
							{...(direction === CarouselDirection.RIGHT && {
								transform: 'translate(100, 100) rotate(180)',
							})}
						/>
					</StyledPortfolioCarouselArrowButtonSVG>
				</StyledPortfolioCarouselArrowButton>
			</StyledPortfolioCarouselArrowContainer>
		</When>
	)
}

const PortfolioCarousel = (props: PortfolioCarouselProps) => {
	const [portfolioCards, setPortfolioCards] = useState([])
	const [position, setPosition] = useState(0)
	const [direction, setDirection] = useState('neutral')
	const mobileView = useMobileBrowserCheck()

	const changeImage = (event: React.MouseEvent<HTMLElement>) => {
		const nextResult = /next-button/g.test(event.currentTarget.id)
		nextResult ? setDirection('forward') : setDirection('backward')
	}

	const compilePortfolioCards = useCallback((portfolioJSON: any[]) => {
		const compiledPortfolioCards = portfolioJSON.reduce(
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
		compilePortfolioCards(props.portfolioJSON)
	}, [props.portfolioJSON, compilePortfolioCards])

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
			<Box id="portfolio-slider" sx={{ height: '90vh' }}>
				<Box
					id="outer-slider"
					sx={{ overflow: 'hidden', position: 'relative', height: '100%' }}
				>
					<Box
						id="inner-slider"
						sx={{
							transform: `translateX(calc(${position * -101}% + ${position === 0 ? desktopAdjustment : mobileView ? '-3%' : '0%'}))`,
							display: 'flex',
							position: 'absolute',
							height: '100%',
							width: '100%',
						}}
					>
						{portfolioCards.map((_portfolioCard, index, arr) => (
							<Portfolio
								portfolioJSON={arr[arr.length - 1 - index]}
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
