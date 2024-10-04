// 'use client';
import { Title, Container, Button, Card, TextInput } from '@mantine/core'
import classes from './page.module.css'
import { NextPage } from 'next'

export const Dashboard: NextPage = () => {
  return (
    <Container fluid size={420} my={40}>
      <Title ta="center" className={classes.title}>
        <Button>default</Button>
        <Button variant={'secondary'}>secondary</Button>
        <Button variant={'outline'}>outline</Button>
        <Button
          variant={'outline'}
          color={'gray'}
          style={{ borderColor: 'gray' }}
        >
          gray outline
        </Button>
        <Card>
          <Title order={1}>This is h1 title</Title>
          <Title order={2}>This is h2 title</Title>
          <Title order={3}>This is h3 title</Title>
          <Title order={4}>This is h4 title</Title>
          <Title order={5}>This is h5 title</Title>
          <Title order={6}>This is h6 title</Title>
        </Card>
        <TextInput label="Input label" description="Input description" />
      </Title>
    </Container>
  )
}

export default Dashboard
