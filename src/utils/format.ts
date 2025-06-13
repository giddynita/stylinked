export const parseStringToArray = (
  input: string,
  separator: string = ','
): string[] => {
  return input
    .split(separator)
    .map((item) => item.trim())
    .filter((item) => item.length)
}

export const currencyFormatter = (price: number) => {
  const amount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(price)
  return amount
}

export const padNumber = (n: number) => {
  return String(n).padStart(2, '0')
}
