'use client'

import { useState } from 'react'

interface UseTabsProps {
  defaultTab?: number
  totalTabs: number
}

export const useTabs = ({ defaultTab = 0, totalTabs }: UseTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const switchTab = (tabIndex: number) => {
    if (tabIndex >= 0 && tabIndex < totalTabs) {
      setActiveTab(tabIndex)
    }
  }

  const isActive = (tabIndex: number) => activeTab === tabIndex

  return {
    activeTab,
    switchTab,
    isActive
  }
}
