import { IState, ReducerStateType } from '@/store'
import {
  hideLoadingScreen,
  showLoadingScreen
} from '@/store/reducers/loading.reducer'
import { LoadingOverlay } from '@mantine/core'
import { nprogress } from '@mantine/nprogress'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral'

// load a locale
if (!numeral.locales.br) {
  numeral.register('locale', 'br', {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    ordinal: () => '',
    currency: {
      symbol: 'R$'
    }
  })
}

const PortalMiddleware = ({ children }: any) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { isShowing: isShowingLoading } = useSelector(
    (state: IState) => state.loading
  )

  const { isSignedIn } = useSelector((state: IState) => state.auth)

  const [hasFeathersJwt] = useState(
    !isEmpty(typeof window !== 'undefined' && localStorage['feathers-jwt'])
  )

  const { returnUrl } = router.query
  const redirectPathName = returnUrl as string

  const loginPage =
    router.pathname === '/' ||
    router.pathname.startsWith('/login') ||
    router.pathname.startsWith('/?')

  const redirectIfAuthenticated = useCallback(() => {
    if (hasFeathersJwt) {
      if (isSignedIn && !redirectPathName && loginPage) {
        router.push('/dashboard')
      }
    }
  }, [hasFeathersJwt, loginPage, redirectPathName, router])

  useEffect(() => {
    redirectIfAuthenticated()
  }, [redirectIfAuthenticated])

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      dispatch(showLoadingScreen('ROUTE_CHANGING'))
      nprogress.start()
    })

    router.events.on('routeChangeComplete', () => {
      dispatch(hideLoadingScreen('ROUTE_CHANGING'))
      nprogress.complete()
    })

    router.events.on('routeChangeError', () => {
      dispatch(hideLoadingScreen('ROUTE_CHANGING'))
      nprogress.complete()
    })

    return () => {
      router.events.off('routeChangeStart', () => {
        dispatch(hideLoadingScreen('ROUTE_CHANGING'))
        nprogress.complete()
      })
    }
  }, [dispatch, router.events])

  // TODO: Should implement auth between apps?
  // useEffect(() => {
  //   if (router.pathname === '/') {
  //     const { code } = router.query;
  //     if (code) {
  //       window.localStorage.setItem('feathers-jwt', code as string);
  //       validateJwt();
  //     }
  //   }
  // }, [router.query]);

  const ScreenOverlay = () => (
    <LoadingOverlay
      visible={isShowingLoading}
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
      loaderProps={{ color: 'pink', type: 'bars' }}
    />
  )

  return (
    <>
      <ScreenOverlay />
      {children}
    </>
  )
}

export default PortalMiddleware
