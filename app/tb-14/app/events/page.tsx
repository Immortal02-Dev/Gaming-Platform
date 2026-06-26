import type { Metadata } from 'next'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Events | TB-14 Gaming Platform',
  description: 'Latest events and promotions - stay updated with special offers',
}

export default function EventsPage() {
  return (
    <Layout>
      <main className="main-wrapper">
        <div className="main-container">
          <section className="events-section">
            {/* Events Header */}
            <div className="events-header">
              <div className="events-headerTitle">
                <span className="events-headerText">이벤트</span>
              </div>
            </div>

            {/* Events List */}
            <div className="events-list">
              <div className="events-container">
                <div className="empty-card">
                  <div className="empty-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M19.59 15.86L12.007 1.924C11.515 1.011 10.779.5 9.989.5c-.79 0-1.515.521-2.016 1.434L.409 15.861c-.49.901-.544 1.825-.138 2.53c.405.707 1.216 1.109 2.219 1.109h15.02c1.003 0 1.814-.402 2.22-1.108c.405-.706.351-1.619-.14-2.531ZM10 4.857c.395 0 .715.326.715.728v6.583c0 .402-.32.728-.715.728a.721.721 0 0 1-.715-.728V5.584c0-.391.32-.728.715-.728Zm0 11.624c-.619 0-1.11-.51-1.11-1.14c0-.63.502-1.141 1.11-1.141c.619 0 1.11.51 1.11 1.14c0 .63-.502 1.141-1.11 1.141Z"
                      />
                    </svg>
                  </div>
                  <p className="empty-description">
                    현재 등록된 이벤트가 없습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}