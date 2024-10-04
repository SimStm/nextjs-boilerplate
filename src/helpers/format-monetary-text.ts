import numeral from 'numeral'

numeral.locale('br')

export const formatMonetaryText = ({
  value = 0,
  currency = 'BRL',
  format = '0,0.00',
  showSign = false,
  showCurrencySpace = true,
  showCurrencySymbol = true
}) => {
  const isNegative = value < 0
  const absoluteValue = Math.abs(value)
  const sign = showSign ? (isNegative ? '- ' : '+ ') : ''
  const currencySpace = showCurrencySpace ? ' ' : ''
  const currencySymbol = showCurrencySymbol
    ? `${formatCurrency(currency)}${currencySpace}`
    : ''

  return `${sign}${currencySymbol}${numeral(absoluteValue).format(format)}`
}

const formatCurrency = (currency = 'USD') => {
  switch (currency) {
    case 'BRL':
      return 'R$'
    case 'USD':
    default:
      return 'US$'
  }
}
