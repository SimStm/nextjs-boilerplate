import { Box, Flex, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import React from 'react'

interface ISecurityValidationItem {
  name: string
  valid: boolean
}

const SecurityValidationItem = ({ name, valid }: ISecurityValidationItem) => {
  return (
    <Flex align="center" direction={'row'} m={0}>
      <Box mr={8}>
        {valid ? (
          <IconCheck size={12} color={valid ? 'green' : 'red'} />
        ) : (
          <IconX size={12} color={valid ? 'green' : 'red'} />
        )}
      </Box>
      <Text color={valid ? 'green' : 'red'} size="sm">
        {name}
      </Text>
    </Flex>
  )
}

export default SecurityValidationItem
