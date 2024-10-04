import dayjs from 'dayjs'

export const validateBirthday = (birthday: string) => {
  const bYear = parseInt(birthday.split('/')[2], 10)
  const currentYear = dayjs().year()
  const minAge = 6
  const maxAge = 100

  const age = currentYear - bYear

  if (age < minAge || age > maxAge) {
    return false
  }

  return /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(birthday)
}
