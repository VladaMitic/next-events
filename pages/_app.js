import Head from 'next/head';

import '../styles/globals.css';

import Layout from '../components/layout/layout';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
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
    </NotificationContextProvider>
  );
}

export default MyApp;
