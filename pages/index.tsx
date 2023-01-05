import { GeneratePage } from '@pdg/components/pageComponents/GeneratePage';
import { ENV } from '@pdg/utils/getConfig';
import Head from 'next/head';
import Script from 'next/script';

export default function Generate() {
  return (
    <>
      {process.env.NODE_ENV === ENV.production && (
        <>
          <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XWTERQG7KB" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-XWTERQG7KB');
            `}
          </Script>
        </>
      )}

      <Head>
        <title>CreativPen - AI Content Creation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logos/logo.svg" />
      </Head>

      <GeneratePage />
    </>
  );
}
