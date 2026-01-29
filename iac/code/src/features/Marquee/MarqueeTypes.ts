export interface SmileImageProps {
	loaded: boolean
	url: string
	title: string
}

export interface MarqueeInnerProps {
	smileImage: { url: string; loaded: boolean }
}
