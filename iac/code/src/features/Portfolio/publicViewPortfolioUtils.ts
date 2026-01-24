import type { Dispatch } from '@reduxjs/toolkit'
import { Promise as BBPromise } from 'bluebird'
import { formatOuterContainerData, setPortfolioImages } from './portfolioSlice'
import type { GithubEntry, PortfolioJSONEntry } from './portfolioTypes'

type InputArr = (PortfolioJSONEntry | GithubEntry)[]

const handlePortraitContainerData = (inputArr: InputArr) =>
	inputArr.reduce(
		(
			total: (PortfolioJSONEntry | GithubEntry)[][],
			item: PortfolioJSONEntry | GithubEntry,
		) => {
			total.push([item])
			return total
		},
		[],
	)

const handleLandscapeContainerData = (inputArr: InputArr) =>
	inputArr.reduce(
		(
			total: (PortfolioJSONEntry | GithubEntry)[][],
			item: PortfolioJSONEntry | GithubEntry,
			index: number,
		) => {
			if (index % 2 === 0) {
				total.push([item])
			} else {
				total[total.length - 1].push(item)
			}
			return total
		},
		[],
	)

export const handleOuterContainerData = (
	inputArr: PortfolioJSONEntry[],
	dispatch: Dispatch,
) => {
	dispatch(
		formatOuterContainerData([
			handlePortraitContainerData(inputArr),
			handleLandscapeContainerData(inputArr),
		]),
	)
}

export const handleNestedContainerData = (inputArr: GithubEntry[]) => {
	return [
		handlePortraitContainerData(inputArr),
		handleLandscapeContainerData(inputArr),
	]
}

export const handleImageData = async (
	inputArr: PortfolioJSONEntry[][],
	dispatch: Dispatch,
) => {
	const processedImages = await BBPromise.reduce(
		inputArr,
		async (total: PortfolioJSONEntry[][], row: PortfolioJSONEntry[]) => {
			return [
				...total,
				await BBPromise.mapSeries(row, async (imgData: PortfolioJSONEntry) => {
					return new Promise<PortfolioJSONEntry>((resolve, reject) => {
						const img = new Image()
						img.onload = () => resolve({ ...imgData })
						img.onerror = () => {
							reject(new Error(`The ${imgData.title} image failed to load`))
						}
						img.src = imgData.imgUrl
					})
				}),
			]
		},
		[],
	)
	dispatch(setPortfolioImages({ imgArr: processedImages }))
}
