import type { Metadata } from 'next'
import Layout from '@/components/Layout'
import MiniGames from '@/components/MiniGames'

export const metadata: Metadata = {
  title: 'Mini Games | TB-14 Gaming Platform',
  description: 'Mini games including Powerball and other exciting games',
}

export default function MinigamePage() {
  return (
    <Layout>
      <main className="main-wrapper">
        <div className="main-container">
          <section className="game-section">
            <MiniGames />
          </section>
        </div>
      </main>
    </Layout>
  )
}