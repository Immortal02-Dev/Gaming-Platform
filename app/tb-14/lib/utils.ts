import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number, currency: string = '원'): string {
  return `${amount.toLocaleString()}${currency}`
}

export function generateRandomId(): string {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

export function getRandomModalQuery(param: string): string {
  const randomId = generateRandomId()
  return `?${param}&modalId=${randomId}`
}
