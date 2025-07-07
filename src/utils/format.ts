import type { Reviews } from './types'

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

export const slugify = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export const averageRating = (
  reviews: Reviews[] | undefined,
  newRating?: number
) => {
  if (reviews) {
    let ratingsSum = reviews.reduce((acc, current) => acc + current.rating, 0)
    if (newRating) {
      ratingsSum += newRating
    }

    const averageRating = ratingsSum / (reviews.length + 1)

    return parseInt(averageRating.toFixed(1))
  }
}
