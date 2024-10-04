import { Head, Html, Main, NextScript } from 'next/document'
import { ColorSchemeScript } from '@mantine/core'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="This is a portal boilerplate!"
          key="desc"
        />
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
