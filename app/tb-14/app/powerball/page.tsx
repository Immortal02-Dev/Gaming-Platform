import type { Metadata } from 'next'
import Layout from '@/components/Layout'
import PowerballModal from '@/components/PowerballModal'

export const metadata: Metadata = {
  title: 'Powerball | TB-14 Gaming Platform',
  description: 'Powerball lottery game - play and win with live draws',
}

export default function PowerballPage() {
  return (
    <Layout>
      <main className="main-wrapper">
        <div className="main-container">
          <section className="powerball-section">
            <div className="powerball-header">
              <div className="powerball-headerTitle">
                <span className="powerball-headerText">동행복권 파워볼</span>
              </div>
            </div>

            <div className="powerball-content">
              <div className="powerball-game">
                <iframe
                  src="https://dhpowerball.net/rpowerball/live.php"
                  width="100%"
                  height="640"
                  style={{ border: 'none', borderRadius: '8px' }}
                  title="Powerball Live Game"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <PowerballModal />
    </Layout>
  )
}