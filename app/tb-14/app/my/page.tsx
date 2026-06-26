import type { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'
import MyPageContent from '@/components/MyPageContent'

export const metadata: Metadata = {
  title: 'My Account | TB-14 Gaming Platform', 
  description: 'Personal account information, balance, and account management',
}

export default function MyPage() {
  return (
    <MyLayout>
      <MyPageContent />
    </MyLayout>
  )
}