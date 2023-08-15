import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Sadiq&apos;s portfolio</title>
        <meta name="description" content="Sadiq's Portfolio" />
        <meta name="keywords" content="Sadiq, Qasimzade, Web, Baku, Azerbaijan, Software Engineer, Front-End Developer, Back-End Developer, Full Stack Developer, React, TypeScript, Redux" />
        <meta name="author" content="Sadiq Qasimzade" />
        <meta name="theme-color" content="#0C343D" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="sadiqsoldportfolio.vercel.app" />
        <meta property="og:title" content="Sadiq's Portfolio" />
        <meta property="og:description" content="Sadiq's Portfolio" />
        <meta property="og:site_name" content="Sadiq's Portfolio" />
        <meta property="og:image" content="sadiqsoldportfolio.vercel.app/images/favicon/favicon.ico" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="sadiqsoldportfolio.vercel.app" />
        <meta name="twitter:creator" content="sadiq_qasimzade" />
        <meta name="twitter:description" content="Sadiq's Portfolio" />
        <meta name="twitter:image" content="sadiqsoldportfolio.vercel.app/images/favicon/favicon.ico" />

        <link rel="manifest" href="manifest.json" />
{/* 
        <meta name="google-site-verification" content="pcVqOWBcshqtczsXmc7uPJNVNQogS1wN4WJmaDeNPpM" />
        <meta name="yandex-verification" content="ce510b44cc39189b" /> */}

        <meta name="application-name" content="Sadiq's Portfolio" />

        <link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png" />
        <link rel="icon" href="images/favicon/favicon.ico" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}