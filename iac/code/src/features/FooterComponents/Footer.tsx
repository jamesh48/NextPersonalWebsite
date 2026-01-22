import { Box, Tooltip } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import React, { useCallback } from 'react'
import { FooterItemContainer } from './FooterItemContainer'

interface FooterProps {
	footerJSON: { iconLink: string; imageUrl: string; label: string }[]
}
function Footer(props: FooterProps) {
	const [images, setImages] = React.useState([
		{ url: '', loaded: false, iconLink: '' },
	])
	const footerMobileBrowserState = useMobileBrowserCheck()
	const [isLoaded, setIsLoaded] = React.useState(false)

	const incrementImageLoad = useCallback((idx: number) => {
		setImages((image) => {
			image[idx].loaded = true
			return [...image]
		})
	}, [])

	React.useEffect(() => {
		if (images.every((image) => image.loaded)) {
			setIsLoaded(true)
		}
	}, [images])

	React.useEffect(() => {
		setImages(
			props.footerJSON.map(({ imageUrl, iconLink }, loadedIndex) => {
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
	}, [incrementImageLoad])

	return isLoaded ? (
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
					border: '3px solid darkslategray',
					borderBottom: 'none',
					backgroundColor: 'rgb(255, 255, 240)',
					borderRadius: '0.7% / 25%',
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
				}}
			>
				{images.map((iconData, index) => {
					const label = props.footerJSON[index]?.label

					return (
						<Tooltip
							key={iconData.iconLink}
							title={label}
							arrow
							placement="top"
						>
							<Box sx={{ flex: 1 }}>
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
	) : null
}

export default Footer
