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

export const currencyFormatter = (price: number | undefined) => {
  if (price || price == 0) {
    const amount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price)
    return amount
  }
}

export const padNumber = (n: number | undefined) => {
  if (n) {
    return String(n).padStart(2, '0')
  }
}

export const slugify = (name: string | undefined) => {
  if (!name) {
    return ''
  }
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export const averageRating = (reviews: Reviews[] | undefined) => {
  if (reviews) {
    const ratingsSum = reviews.reduce((acc, current) => acc + current.rating, 0)

    const averageRating = ratingsSum / reviews.length

    return parseInt(averageRating.toFixed(1))
  }
}

export const formatCreatedAt = (timestamp: string | undefined) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })

    return formattedDate
  }
}

export const addSpace = (str: string) => {
  const result = str.replace(/([A-Z])/g, ' $1').trim()
  return result
}

export const getStatusColor: Record<string, { text: string; border: string }> =
  {
    pending: {
      text: 'text-muted-foreground',
      border: 'border-muted-foreground',
    },
    processing: { text: 'text-warning', border: 'border-warning' },
    shipped: { text: 'text-primary', border: 'border-primary' },
    delivered: { text: 'text-green-600', border: 'border-green-600' },
  }

export const getUrgencyLevel = (current: number) => {
  if (current == 0)
    return {
      level: 'out of stock',
      className: 'bg-destructive text-white',
      label: 'Out of Stock',
    }
  if (current <= 3)
    return {
      level: 'critical',
      className: 'bg-destructive text-white',
      label: 'Critical',
    }
  if (current <= 10)
    return {
      level: 'low',
      className: 'bg-warning text-white ',
      label: 'Low',
    }
  return {
    level: 'active',
    className: 'bg-success text-white',
    label: 'Active',
  }
}
