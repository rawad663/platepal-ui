import { GeneratePage } from '@pdg/components/pageComponents/GeneratePage';
import Head from 'next/head';

export default function Generate() {
  return (
    <>
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
