import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://static.fullstackhrivnak.com/mines/build/public/index.css"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <title>James Hrivnak</title>
    </Head>

    <Component {...(pageProps as AppProps['pageProps'])} />
  </>
);

export default MyApp;
