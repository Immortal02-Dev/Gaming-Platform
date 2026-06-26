import Header from './Header'
import Footer from './Footer'
import CustomerSidebar from './CustomerSidebar'

interface CustomerLayoutProps {
  children: React.ReactNode
}

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <div className="main-wrap">
          <CustomerSidebar />
          <div className="main-content">
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}

export default CustomerLayout