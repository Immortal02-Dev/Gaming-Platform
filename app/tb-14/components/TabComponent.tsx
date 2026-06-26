'use client'

import { useTabs } from '@/lib/hooks/useTabs'

interface TabComponentProps {
  tabs: string[]
  contents: React.ReactNode[]
}

const TabComponent = ({ tabs, contents }: TabComponentProps) => {
  const { activeTab, switchTab, isActive } = useTabs({ 
    defaultTab: 0, 
    totalTabs: tabs.length 
  })

  return (
    <div className="tab-container">
      <div className="customer-tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`customer-tab-item ${isActive(index) ? 'active' : ''}`}
            onClick={() => switchTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {contents.map((content, index) => (
          <div
            key={index}
            className="customer-table"
            style={{ display: isActive(index) ? 'block' : 'none' }}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TabComponent
