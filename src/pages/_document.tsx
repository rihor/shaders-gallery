import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name='description' content='My shaders gallery' />
        <meta property='og:title' content='Shaders Gallery' />
        <meta
          property='og:description'
          content='My shaders gallery'
        />
        <meta property='og:url' content='https://rihor-shaders.vercel.app/' />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
