import Head from 'next/head';

import '../styles/globals.css';

import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events near you"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
