"use client";
import React, { createContext, useContext, useState } from "react";

const TabContext = createContext<{
  activeTab: string;
  setActiveTab: (id: string) => void;
} | null>(null);

export function Tabs({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

// Hook para magamit ng sub-components
const useTab = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("Tabs components must be used within <Tabs />");
  return context;
};

// --- Sub Components ---

export function TabList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`scroll-x tabs-title hide-scroll ${className}`}>
      {children}
      <div className="tabs-indicator" />
    </div>
  );
}

export function TabTrigger({
  id,
  label,
  className,
}: {
  id: string;
  label: string;
  className?: string;
}) {
  const { activeTab, setActiveTab } = useTab();
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      aria-selected={isActive ? "true" : undefined}
      className={`tabs-btn btn-like ${isActive ? "active" : ""} ${className}`}
    >
      {label}
    </button>
  );
}

export function TabContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`tabs-content ${className}`}>{children}</div>;
}

export function TabPanel({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { activeTab } = useTab();
  if (activeTab !== id) return null; // Tago ang content kung hindi active
  return <div className="tab-panel-fade-in">{children}</div>;
}
