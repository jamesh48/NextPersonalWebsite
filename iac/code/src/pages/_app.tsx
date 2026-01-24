import { appInitialState } from '@app/appSlice'
import GlobalStore from '@app/store'
import { useIsSsr } from '@shared/customHooks'
import { smallWindowCheck } from '@shared/globalUtils'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../layouts/Layout'
import '../styles/globals.scss' // your global styles

function MyApp({ Component, pageProps }: AppProps) {
	const isSsr = useIsSsr()

	let appInitialProps = {}
	if (!isSsr) {
		appInitialProps = {
			smallWindowState: smallWindowCheck(),
		}
	}

	GlobalStore.prototype.configureGlobalStore({
		app: {
			...appInitialState,
			...appInitialProps,
		},
	})

	return (
		<Provider store={GlobalStore.prototype.getStore()}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp
