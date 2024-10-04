/* eslint-disable react-hooks/exhaustive-deps */
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/nprogress/styles.css'

import type { AppProps } from 'next/app'
import { Affix, AppShell, Burger, MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { storeWrapper } from '@/store'
import { useRouter } from 'next/router'
import { rest } from '@feathersjs/client'
import { Notifications } from '@mantine/notifications'
import Navbar from '@/components/navbar'
import { useDisclosure } from '@mantine/hooks'
import { NavigationProgress } from '@mantine/nprogress'

import theme from '@/helpers/theme'
import PortalMiddleware from './_portalMiddleware'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import { GoogleAnalytics } from '@next/third-parties/google'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [opened, { toggle }] = useDisclosure()
  const { store } = storeWrapper.useWrappedStore(rest)

  const googleAnalyticsKey =
    process.env.NEXT_PUBLIC_NEXT_GOOGLE_ANALYTICS_KEY || ''

  const loginPage =
    router.pathname === '/' ||
    router.pathname.startsWith('/login') ||
    router.pathname.startsWith('/?')

  const pageTest = router.pathname.startsWith('/page-test')

  const [hasFeathersJwt] = useState(
    !isEmpty(typeof window !== 'undefined' && localStorage['feathers-jwt'])
  )

  useEffect(() => {
    if (!hasFeathersJwt && !(loginPage || pageTest)) router.push('login')
  }, [])

  if (loginPage || pageTest) {
    return (
      <Provider store={store}>
        <Head>
          <title>Portal Boilerplate</title>
        </Head>
        <MantineProvider theme={theme}>
          <PortalMiddleware>
            <GoogleAnalytics gaId={googleAnalyticsKey} />
            <NavigationProgress />
            <Notifications />
            <Component {...pageProps} />
          </PortalMiddleware>
        </MantineProvider>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <Head>
        <title>Portal Boilerplate</title>
      </Head>
      <MantineProvider theme={theme}>
        <PortalMiddleware>
          <NavigationProgress />
          <Notifications />
          <Affix position={{ top: 20, right: 20 }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Affix>
          <AppShell
            navbar={{
              width: 300,
              breakpoint: 'md',
              collapsed: { mobile: !opened }
            }}
            padding="md"
          >
            <AppShell.Navbar style={{ backgroundColor: 'transparent' }}>
              <Navbar
                onClick={() => {
                  if (opened) toggle()
                }}
              />
            </AppShell.Navbar>
            <AppShell.Main bg="gray.0">
              <Component {...pageProps} />
            </AppShell.Main>
          </AppShell>
        </PortalMiddleware>
      </MantineProvider>
    </Provider>
  )
}

export default App
