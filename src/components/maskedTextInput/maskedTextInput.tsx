import { Input } from '@mantine/core'
import { IMaskInput } from 'react-imask'

export const MaskedTextInput = ({...props}) => <Input.Wrapper {...props}>
  <Input component={IMaskInput} {...props} />
</Input.Wrapper>