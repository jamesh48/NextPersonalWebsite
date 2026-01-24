import { useDispatch } from '@app/reduxHooks'
import { Box, Typography } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'
import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getNestedHovered, setNestedHovered } from './nestedSlice'

interface NestedGithubLinkProps {
	nestedColumnIndex: number
	nestedRowIndex: number
	outerData: { cssStyles: React.CSSProperties }
	nestedGithub: { link: string; title: string }
}

const NestedGithubLink = ({
	nestedGithub,
	nestedColumnIndex,
	nestedRowIndex,
	outerData,
}: NestedGithubLinkProps) => {
	const nestedMobileBrowserState = useMobileBrowserCheck()

	const dispatch = useDispatch()
	const nestedHovered = useSelector(getNestedHovered)
	const [doubleClicked, setDoubleClicked] = useState<boolean | null>(null)

	useEffect(() => {
		if (nestedMobileBrowserState && doubleClicked) {
			window.open(nestedGithub.link)
		} else if (doubleClicked === true) {
			window.open(nestedGithub.link)
		}
	}, [doubleClicked, nestedMobileBrowserState, nestedGithub.link])

	useEffect(() => {
		setDoubleClicked(null)
	}, [nestedHovered])

	const handleDoubleClick = useCallback(() => {
		setDoubleClicked((prev) => {
			if (nestedMobileBrowserState) {
				if (prev === null) {
					return false
				} else if (prev === false) {
					return true
				} else {
					return false
				}
				// Regular Browser
			} else {
				return true
			}
		})
	}, [nestedMobileBrowserState])

	return (
		<Box
			key={nestedColumnIndex}
			className="nestedGithubLinks"
			onMouseOver={() => {
				dispatch(setNestedHovered(nestedRowIndex * 2 + nestedColumnIndex))
			}}
			style={outerData.cssStyles}
			onClick={handleDoubleClick}
		>
			<Typography>{nestedGithub.title}</Typography>
		</Box>
	)
}

export default memo(NestedGithubLink)
