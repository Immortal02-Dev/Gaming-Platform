import type { Metadata } from 'next'
import Layout from '@/components/Layout'
import CasinoGames from '@/components/CasinoGames'

export const metadata: Metadata = {
  title: 'Casino | TB-14 Gaming Platform',
  description: 'Experience premium casino games with live dealers and exciting slots',
}

export default function CasinoPage() {
  return (
    <Layout>
      <main className="main-wrapper">
        <div className="main-container">
          <section className="game-section">
            <CasinoGames />
          </section>
        </div>
      </main>
    </Layout>
  )
}