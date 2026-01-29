import { STATIC_CLOUDFRONT_LINK } from '../constants'

const portfolioDataJson = [
	{
		title: 'Strava Report Generator',
		cssStyles: {
			backgroundColor: 'ivory',
			color: 'black',
		},
		imgUrl: `${STATIC_CLOUDFRONT_LINK}/main/main-images/Strava_Results_Generator.jpg`,
		github: [
			// {
			// 	title: 'Deployed Website',
			// 	link: 'https://www.stravareportgenerator.com',
			// },
			{
				title: 'Github',
				link: 'https://github.com/jamesh48/next-strava-report-generator',
			},
			{
				title: 'Python Backend Github',
				link: 'https://github.com/jamesh48/SRG-Python',
			},
		],
	},
	{
		title: 'fullstackhrivnak.com',
		cssStyles: {
			backgroundColor: 'ivory',
			color: 'black',
		},
		imgUrl: `${STATIC_CLOUDFRONT_LINK}/main/main-images/GES.jpg`,
		github: [
			{
				title: 'Github',
				link: 'https://github.com/jamesh48/NextPersonalWebsite',
			},
		],
	},
	{
		title: 'Homebridge GE Opal Ice Machine Integration (Open Source)',
		cssStyles: {
			backgroundColor: 'ivory',
			color: 'black',
		},
		imgUrl: `${STATIC_CLOUDFRONT_LINK}/main/main-images/opal.png`,
		github: [
			{
				title: 'Github',
				link: 'https://github.com/homebridge-plugins/homebridge-smarthq',
			},
		],
	},
	{
		title: 'steammop.app',
		cssStyles: {
			backgroundColor: 'black',
			color: 'ivory',
		},
		imgUrl: `${STATIC_CLOUDFRONT_LINK}/main/main-images/backendArchitecture.jpeg`,
		github: [
			{
				title: 'Steammop.app Proxy Server',
				link: 'https://github.com/rpt26-sdc-prototype/tim-proxy',
			},
			{
				title: 'Steammop.app Reviews Service',
				link: 'https://github.com/rpt26-sdc-prototype/tim-review-service',
			},
			{
				title: 'Steammop.app Reviews Database',
				link: 'https://github.com/rpt26-sdc-prototype/sdc-reviews-db',
			},
			{
				title: 'Steammop.app App Server',
				link: 'https://github.com/rpt26-sdc-prototype/app-server-1',
			},
		],
	},
	{
		title: 'Beatminesweeper.app',
		imgUrl: `${STATIC_CLOUDFRONT_LINK}/main/main-images/beatminesweeperss.png`,
		cssStyles: {
			backgroundColor: 'black',
			color: 'ivory',
		},
		github: [
			// {
			//   title: 'Deployed Website',
			//   link: 'https://www.beatminesweeper.app',
			// },
			{
				title: 'Github',
				link: 'https://github.com/jamesh48/Mini-Games/tree/master/beatminesweeper',
			},
		],
	},
	{
		title: 'Fjakeraven.com',
		imgUrl: `${STATIC_CLOUDFRONT_LINK}/main/main-images/fec.jpg`,
		cssStyles: {
			backgroundColor: 'ivory',
			color: 'black',
		},
		github: [
			{
				title: 'Fjakeraven Proxy Server',
				link: 'https://github.com/rpt26-fec-tianwen/james-proxy-server',
			},
			{
				title: 'Product Details Service',
				link: 'https://github.com/rpt26-fec-tianwen/james-service-1',
			},
		],
	},
]

export type TPortfolioJSON = typeof portfolioDataJson

export default portfolioDataJson
