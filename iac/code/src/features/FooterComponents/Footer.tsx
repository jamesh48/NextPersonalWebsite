import { Box, Tooltip } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { useCallback, useEffect, useState } from 'react'
import { When } from 'react-if'
import { FooterItemContainer } from './FooterItemContainer'

interface FooterProps {
	footerJSON: { iconLink: string; imageUrl: string; label: string }[]
}

const Footer = ({ footerJSON }: FooterProps) => {
	const footerMobileBrowserState = useMobileBrowserCheck()

	const [images, setImages] = useState([
		{ url: '', loaded: false, iconLink: '' },
	])
	const [isLoaded, setIsLoaded] = useState(false)

	const incrementImageLoad = useCallback((imageIdx: number) => {
		setImages((image) => {
			image[imageIdx].loaded = true
			return [...image]
		})
	}, [])

	useEffect(() => {
		if (images.every((image) => image.loaded)) {
			setIsLoaded(true)
		}
	}, [images])

	useEffect(() => {
		setImages(
			footerJSON.map(({ imageUrl, iconLink }, loadedIndex) => {
				const img = new Image()
				img.onload = () => incrementImageLoad(loadedIndex)
				img.src = imageUrl

				return {
					iconLink: iconLink,
					url: imageUrl,
					loaded: false,
				}
			}),
		)
	}, [incrementImageLoad, footerJSON])

	return (
		<When condition={isLoaded}>
			<Box
				id="footerContainer"
				className={
					footerMobileBrowserState
						? `footer-container footer-container--Mobile`
						: `footer-container`
				}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					height: '5vh',
					width: footerMobileBrowserState ? '100%' : '75%',
					margin: '0 auto',
				}}
			>
				<Box
					id="footer-items-container"
					sx={{
						display: 'flex',
						width: '100%',
						border: '3px solid rgba(240, 255, 240, 0.15)',
						borderBottom: 'none',
						backgroundColor: '#2f4f4f',
						borderRadius: '0.7% / 25%',
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
					}}
				>
					{images.map((iconData, index) => {
						const label = footerJSON[index]?.label

						return (
							<Tooltip
								key={iconData.iconLink}
								title={label}
								arrow
								placement="top"
							>
								<Box
									sx={{
										flex: 1,
										transition: 'all 0.3s ease',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										'&:hover': {
											backgroundColor: '#3a5f5f',
										},
										// Apply to all images
										'& img': {
											backgroundColor: '#2f4f4f',
											padding: '6px',
											borderRadius: '6px',
										},
									}}
								>
									<FooterItemContainer
										key={iconData.iconLink}
										iconData={iconData}
									/>
								</Box>
							</Tooltip>
						)
					})}
				</Box>
			</Box>
		</When>
	)
}

export default Footer
