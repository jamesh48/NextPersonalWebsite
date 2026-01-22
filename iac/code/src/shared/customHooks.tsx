import { useEffect, useRef, useState } from 'react'

export const useIsSsr = () => {
	const [isSsr, setIsSsr] = useState(true)

	useEffect(() => {
		setIsSsr(false)
	}, [])
	return isSsr
}

// https://www.robinwieruch.de/react-useeffect-only-on-update
export const useEffectOnlyOnUpdate = (
	callback: (args: any) => void,
	dependencies: any[],
	args: any,
) => {
	const didMount = useRef(false)

	useEffect(() => {
		if (didMount.current) {
			callback(args)
		} else {
			didMount.current = true
		}
	}, [...dependencies])
}
