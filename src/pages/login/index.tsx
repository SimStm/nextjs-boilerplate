import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Image,
  Container,
  Group,
  Button,
  Stack,
  Center,
  Title,
  Flex
} from '@mantine/core'
import { notifications } from '@mantine/notifications'

import NextImage from 'next/image'
import ImageLogo from '@/assets/images/ReactLogo.png'
import classes from './page.module.css'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { useDisclosure, useViewportSize } from '@mantine/hooks'
import {
  hideLoadingScreen,
  showLoadingScreen
} from '@/store/reducers/loading.reducer'
import { get } from 'lodash'
import Head from 'next/head'
import { setSignedIn } from '@/store/reducers/auth.reducer'

const Login: NextPage = () => {
  const { push } = useRouter()
  const dispatch = useDispatch()

  const { height } = useViewportSize()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useDisclosure()

  const doLogin = async () => {
    setLoading.open()
    dispatch(showLoadingScreen('APP_LOGIN'))

    return new Promise((resolve, reject) => {
      dispatch(setSignedIn(true))
      window.localStorage.setItem('feathers-jwt', 'xxxxxx')
      return resolve({ result: 'ok' })
    })
      .then((data: any) => {
        notifications.show({
          color: 'green',
          title: 'Login success!',
          message: "You'll be redirected..."
        })

        push('/dashboard')
      })
      .catch((err: any) => {
        let title = 'An error occurred during login'
        let message = 'Check your login details and try again'

        if (err.message.toLowerCase().includes('invalid login')) {
          title = 'User or password invalid'
        }
        if (err.message.toLowerCase().includes('not yet verified')) {
          title = 'Your email still pending verification'
          message =
            'Please check your e-mail and verify your account before proceed'
        }

        notifications.show({
          color: 'red',
          title,
          message
        })
      })
      .finally(() => {
        setLoading.close()
        dispatch(hideLoadingScreen('APP_LOGIN'))
      })
  }

  return (
    <Container fluid h={height} bg="gray.0">
      <Head>
        <title>Login | BoilerplatePortal</title>
      </Head>
      <Stack h={height} justify={'center'} align={'center'}>
        <Paper shadow="md" p={30} radius="md" className={classes.loginBox}>
          <Flex direction="column" gap={'xl'} my={30}>
            <Center>
              <Image
                component={NextImage}
                src={ImageLogo}
                alt="Logo"
                fit="contain"
                h={'auto'}
                radius={'md'}
                bg={'white'}
              />
            </Center>
            <Title ta="center" className={classes.title}>
              Portal Login
            </Title>
            <Flex direction="column" gap={0}>
              <TextInput
                // label="Email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <PasswordInput
                // label="Password"
                placeholder="Password"
                required
                mt="md"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <Group justify="flex-end">
                <Anchor
                  component="button"
                  onClick={() => push('/auth/recover-password')}
                  size="sm"
                  c="black"
                  mt={4}
                >
                  Forgot your password?
                </Anchor>
              </Group>
            </Flex>
            <Center>
              <Button
                w={'150'}
                color={'white'}
                onClick={doLogin}
                loading={loading}
                radius={12}
              >
                Login
              </Button>
            </Center>
            <Anchor
              component="button"
              size="sm"
              c="black"
              onClick={() => push('/signup')}
            >
              Don't have an account? Register now!
            </Anchor>
          </Flex>
        </Paper>
      </Stack>
    </Container>
  )
}

export default Login
