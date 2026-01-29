import { useEffect, useState } from 'react'
import { STATIC_CLOUDFRONT_LINK } from '../constants'

export const useMobileBrowserCheck = () => {
	const [mobileBrowserState, setMobileBrowserState] = useState(false)

	useEffect(() => {
		const mobileBrowserCheck = () => {
			const toMatch = [
				/Android/i,
				/webOS/i,
				/iPhone/i,
				/iPad/i,
				/iPod/i,
				/BlackBerry/i,
				/Windows Phone/i,
			]
			return toMatch.some((toMatchItem) => {
				// Second condition works for iPads that display intel mac...
				return (
					navigator.userAgent.match(toMatchItem) ||
					(navigator.userAgent.indexOf('Macintosh') > -1 &&
						'ontouchend' in document)
				)
			})
		}

		setMobileBrowserState(mobileBrowserCheck())
	}, [])

	return mobileBrowserState
}
export const smallWindowCheck = () => {
	return window.innerWidth < 1150
}

export const portraitModeCheck = () => {}

export const handleMouseMove = (event: MouseEvent) => {
	if (!document.getElementById('cursor')) {
		const newCursor = document.createElement('div')
		newCursor.id = 'cursor'
		newCursor.style.backgroundImage = `url(${STATIC_CLOUDFRONT_LINK}/cursor.png)`
		document.querySelector('body')?.appendChild(newCursor)
	}

	const scrollYOffset = window.scrollY
	const x = event.clientX
	const y = event.clientY

	const cursor = document.getElementById('cursor')
	if (cursor) {
		cursor.style.left = `${x}px`
		cursor.style.top = `${scrollYOffset}${y}px`
	}
}
