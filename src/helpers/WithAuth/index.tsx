import { isEmpty } from 'lodash'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IState } from '@/store'

const withAuth = (Component: NextComponentType) => {
  const Auth = (props: any) => {
    const router = useRouter()
    const { isSignedIn } = useSelector((state: IState) => state.auth)

    const [isRouterReady, setIsRouterReady] = useState<boolean>(router.isReady)

    const [hasFeathersJwt] = useState(
      !isEmpty(typeof window !== 'undefined' && localStorage['feathers-jwt'])
    )

    useEffect(() => {
      setIsRouterReady(router.isReady)

      if (isRouterReady) {
        if (
          (!hasFeathersJwt || (hasFeathersJwt && !isSignedIn)) &&
          !router.asPath.includes('login')
        ) {
          router.push({
            pathname: '/login',
            query: {
              returnUrl: router.asPath !== '/' ? router.asPath : '/dashboard'
            }
          })
        }
        if (router.asPath.includes('join')) {
          router.push({
            pathname: router.asPath.split('?')[0],
            query: router.query
          })
        } else {
          router.push('/dashboard')
        }
      }
    }, [isRouterReady, hasFeathersJwt, router, isSignedIn])

    return <Component {...props} />
  }

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}

export default withAuth
