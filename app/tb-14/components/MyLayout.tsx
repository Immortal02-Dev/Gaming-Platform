import Header from './Header'
import Footer from './Footer'
import MySidebar from './MySidebar'

interface MyLayoutProps {
  children: React.ReactNode
}

const MyLayout = ({ children }: MyLayoutProps) => {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <div className="main-wrap">
          <MySidebar />
          <div className="main-content">
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}

export default MyLayout