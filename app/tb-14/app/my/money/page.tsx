import type { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'
import MoneyHistory from '@/components/MoneyHistory'

export const metadata: Metadata = {
  title: 'TB-14 - 머니내역 | My Account',
  description: 'TB-14 gaming platform money history page',
}

export default function MoneyPage() {
  return (
    <MyLayout>
      <MoneyHistory />
    </MyLayout>
  )
}
