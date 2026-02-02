import { useDispatch, useSelector } from '@app/reduxHooks'
import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import PageHeader from 'features/shared/PageHeader'
import { memo, useEffect } from 'react'
import ApplicationImgContainer from './ApplicationImgContainer'
import { getOuterContainerData, getPortfolioImages } from './portfolioSlice'
import type { PortfolioJSONEntry } from './portfolioTypes'
import {
	handleImageData,
	handleOuterContainerData,
} from './publicViewPortfolioUtils'

interface PortfolioProps {
	portfolioCard: PortfolioJSONEntry[]
	index: number
}

const preventRerenderOnCardChange = (
	prevProps: Readonly<PortfolioProps>,
	nextProps: Readonly<PortfolioProps>,
) => {
	// Deep equality check - consider using a proper deep equality library for production
	return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

const Portfolio = ({ portfolioCard, index }: PortfolioProps) => {
	const dispatch = useDispatch()
	const mobileView = useMobileBrowserCheck()
	const { allLoaded, imgArr } = useSelector(getPortfolioImages)
	const outerContainerData = useSelector(getOuterContainerData)

	// Handle outer container data
	useEffect(() => {
		if (portfolioCard) {
			handleOuterContainerData(portfolioCard, dispatch)
		}
	}, [portfolioCard, dispatch])

	// Handle image data loading
	useEffect(() => {
		const loadImageData = async () => {
			const containerData = outerContainerData[index]
			if (containerData?.length) {
				await handleImageData(containerData[1], dispatch)
			}
		}

		loadImageData()
	}, [outerContainerData, index, dispatch])

	// Loading state
	if (!allLoaded || !imgArr.length) {
		return (
			<Box
				sx={{
					minWidth: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '75vh',
				}}
			>
				<Typography variant='h6' color='text.secondary'>
					Loading Portfolio...
				</Typography>
			</Box>
		)
	}

	const headerText = mobileView
		? 'Selected Applications'
		: 'Software Engineering Applications'

	return (
		<Box
			id='portfolio-container'
			sx={{
				minWidth: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<PageHeader
				typographySx={{
					...(mobileView && { fontSize: '2rem' }),
				}}
			>
				{headerText}
			</PageHeader>

			<Box
				id='portfolioApplicationContainer'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
				}}
			>
				{imgArr[index]?.map((portfolioRow: PortfolioJSONEntry[]) => {
					// Generate a stable key from both images in the row
					const rowKey = portfolioRow.map((item) => item.imgUrl).join('-')

					return (
						<Box
							key={rowKey}
							id='portfolio-application-row'
							sx={{
								display: 'flex',
								flex: 0.5,
								boxSizing: 'border-box',
								gap: 2,
								width: '85%',
								alignSelf: 'center',
								justifyContent: 'center',
							}}
						>
							{portfolioRow.map(
								(appData: PortfolioJSONEntry, columnIndex: number) => (
									<Stack
										key={appData.imgUrl}
										id='portfolioApplication'
										sx={{
											backgroundColor: 'primary.main',
											flex: 1,
											marginY: 1.5,
											border: '2px solid',
											borderColor: 'secondary.main',
											minWidth: '50%',
											boxSizing: 'border-box',
											transition: 'all 0.3s ease-in-out',
											'&:hover': {
												backgroundColor: 'action.hover',
												borderColor: 'text.primary',
												transform: 'scale(1.02)',
												boxShadow: '0 4px 20px rgba(135, 206, 235, 0.3)',
											},
										}}
									>
										<Typography
											sx={{
												wordWrap: 'break-word',
												textAlign: 'center',
												padding: 1,
												color: 'text.primary',
												fontWeight: 500,
											}}
										>
											{appData.title}
										</Typography>

										<ApplicationImgContainer
											appData={appData}
											rowIndex={imgArr[index]?.indexOf(portfolioRow) ?? 0}
											columnIndex={columnIndex}
										/>
									</Stack>
								),
							)}
						</Box>
					)
				})}
			</Box>
		</Box>
	)
}

export default memo(Portfolio, preventRerenderOnCardChange)
