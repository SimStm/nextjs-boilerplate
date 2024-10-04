import React from 'react'

import { NextPage } from 'next'
import Head from 'next/head'
import { Container, Loader, Stack } from '@mantine/core'
import withAuth from '@/helpers/WithAuth'

import classes from './index.module.css'
import { useViewportSize } from '@mantine/hooks'
import numeral from 'numeral'

const Index: NextPage = () => {
  const { height, width } = useViewportSize()
  return (
    <Container fluid h={height} className={classes.root}>
      <Head>
        <title>BoilerplatePortal</title>
      </Head>
      <Stack h={height} justify={'center'} align={'center'}>
        <Loader color={'white'} size={'xl'} speed={'0.75s'} />
      </Stack>
    </Container>
  )
}

export default withAuth(Index)
