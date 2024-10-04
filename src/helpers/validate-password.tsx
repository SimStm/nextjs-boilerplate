export const validatePassword = (
  type: string,
  value: string,
  valueExtra = ''
) => {
  switch (type) {
    case 'size':
      return value.length >= 8
    case 'special':
      return new RegExp('^(?=.*?[#?!@$%^&*-]).{1,}$', 'g').test(value)
    case 'lower':
      return new RegExp('^(?=.*?[a-z]).{1,}$', 'g').test(value)
    case 'upper':
      return new RegExp('^(?=.*?[A-Z]).{1,}$', 'g').test(value)
    case 'number':
      return new RegExp('^(?=.*?[0-9]).{1,}$', 'g').test(value)
    case 'equal':
      return value === valueExtra
    case 'equalAndSize':
      return value.length >= 8 && value === valueExtra
    default:
      return false
  }
}

export const isValidPassword = (
  password: string,
  passwordConfirmation: string
) => {
  return (
    validatePassword('size', password) &&
    validatePassword('special', password) &&
    validatePassword('lower', password) &&
    validatePassword('upper', password) &&
    validatePassword('number', password) &&
    validatePassword('equalAndSize', password, passwordConfirmation)
  )
}
