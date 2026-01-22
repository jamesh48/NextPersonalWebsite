import { getSmallWindowState } from '@app/appSlice'
import { useDispatch, useSelector } from '@app/reduxHooks'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { memo, useEffect } from 'react'
import ApplicationImgContainer from './ApplicationImgContainer'
import { getOuterContainerData, getPortfolioImages } from './portfolioSlice'
import type { PortfolioJSONEntry } from './portfolioTypes'
import {
	handleImageData,
	handleOuterContainerData,
} from './publicViewPortfolioUtils'

interface PortfolioProps {
	portfolioJSON: PortfolioJSONEntry[]
	index: number
}

const preventRerenderOnCardChange = (
	prevProps: Readonly<PortfolioProps>,
	nextProps: Readonly<PortfolioProps>,
) => {
	if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
		return true
	}
	return false
}
const Portfolio = (props: PortfolioProps) => {
	const dispatch = useDispatch()
	const { allLoaded, imgArr } = useSelector(getPortfolioImages)
	const outerContainerData = useSelector(getOuterContainerData)
	const portraitState = useMediaQuery('(orientation: portrait)')
	const smallWindowState = useSelector(getSmallWindowState)
	console.info(props.index)
	useEffect(() => {
		if (props.portfolioJSON) {
			handleOuterContainerData(props.portfolioJSON, dispatch)
		}
	}, [props.portfolioJSON, dispatch])

	useEffect(() => {
		const asyncFn = async () => {
			if (outerContainerData[props.index]?.length) {
				// console.info(outerContainerData[props.index][1])
				// Landscape
				await handleImageData(outerContainerData[props.index][1], dispatch)
			}
		}

		asyncFn()
	}, [outerContainerData, props.index, dispatch])

	return allLoaded && imgArr.length ? (
		<Box
			id="portfolio-container"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minWidth: '100%',
				justifyContent: 'center',
			}}
		>
			<Typography
				id="portfolioTitle"
				sx={{
					height: portraitState ? 'initial' : '15vh',
					display: 'flex',
					fontSize: portraitState ? '2rem' : '3rem',
					alignItems: 'center',
					alignSelf: 'center',
					textAlign: 'center',
				}}
			>
				Software Engineering Applications
			</Typography>
			<Box
				id="portfolioApplicationContainer"
				sx={{ display: 'flex', flexDirection: 'column', height: '75vh' }}
			>
				{imgArr[props.index]?.map(
					(portfolioRow: PortfolioJSONEntry[], rowIndex: number) => {
						return (
							<Box
								key={rowIndex}
								id={'portfolio-application-row'}
								sx={{
									display: 'flex',
									flex: '.5',
									margin: '1.75% 0',
									width: '90%',
									alignSelf: 'center',
								}}
							>
								{portfolioRow.map(
									(appData: PortfolioJSONEntry, columnIndex: number) => {
										return (
											<Box
												key={appData.imgUrl}
												id={'portfolioApplication'}
												sx={{
													backgroundColor: 'midnightblue',
													flex: 1,
													display: 'flex',
													flexDirection: 'column',
													border: '1px solid darkgoldenrod',
													margin: '0 1.75%',
													minWidth: '50%',
													'&:hover': {
														backgroundColor: 'darkgoldenrod',
													},
												}}
											>
												<Typography
													sx={{
														wordWrap: 'break-word',
														textAlign: 'center',
													}}
												>
													{appData.title}
												</Typography>

												<ApplicationImgContainer
													appData={appData}
													rowIndex={rowIndex}
													columnIndex={columnIndex}
												/>
											</Box>
										)
									},
								)}
							</Box>
						)
					},
				)}
			</Box>
		</Box>
	) : (
		<Box>
			<Typography>Loading Portfolio...</Typography>
		</Box>
	)
}

export default memo(Portfolio, preventRerenderOnCardChange)
