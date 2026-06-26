import type { Metadata } from 'next'
import Layout from '@/components/Layout'
import SlotGames from '@/components/SlotGames'

export const metadata: Metadata = {
  title: 'Slots | TB-14 Gaming Platform',
  description: 'Slot games by provider - discover exciting slot machines from top providers',
}

export default function SlotPage() {
  return (
    <Layout>
      <main className="main-wrapper">
        <div className="main-container">
          <section className="game-section">
            <SlotGames />
          </section>
        </div>
      </main>
    </Layout>
  )
}