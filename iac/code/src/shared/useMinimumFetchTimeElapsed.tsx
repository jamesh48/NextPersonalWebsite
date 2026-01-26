import { useEffect, useState } from 'react'

interface UseMinimumFetchTimeElapsedProps {
	/** Whether the actual data/content has loaded */
	isLoaded: boolean
	/** Minimum time in milliseconds to show loading state (default: 1000ms) */
	minimumTime?: number
}

/**
 * Custom hook to ensure a minimum amount of time has elapsed before showing loaded content.
 * Useful for emphasizing loading skeletons and preventing flashing content.
 *
 * @param isLoaded - Whether the actual content has finished loading
 * @param minimumTime - Minimum time in milliseconds to show loading (default: 1000ms)
 * @returns Whether both the content is loaded AND minimum time has elapsed
 *
 * @example
 * const smileImage = useSelector(getSmileImage)
 * const canShowContent = useMinimumFetchTimeElapsed({
 *   isLoaded: smileImage.loaded,
 *   minimumTime: 1500
 * })
 */
export const useMinimumFetchTimeElapsed = ({
	isLoaded,
	minimumTime = 1000,
}: UseMinimumFetchTimeElapsedProps): boolean => {
	const [timeElapsed, setTimeElapsed] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeElapsed(true)
		}, minimumTime)

		return () => clearTimeout(timer)
	}, [minimumTime])

	return isLoaded && timeElapsed
}
