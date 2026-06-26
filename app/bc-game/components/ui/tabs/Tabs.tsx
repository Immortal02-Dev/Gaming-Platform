"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (id: string) => void;
  registerTab: (id: string, el: HTMLButtonElement | null) => void;
} | null>(null);

export function Tabs({
  children,
  defaultValue,
}: {
  children: ReactNode;
  defaultValue: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const registerTab = (id: string, el: HTMLButtonElement | null) => {
    tabRefs.current[id] = el;
  };

  // Logic for indicator position (CSS Variables)
  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    const parent = activeEl?.parentElement;
    if (activeEl && parent) {
      // Set the CSS variables needed by the original CSS
      parent.style.setProperty(
        "--tabs-indicator-position",
        `${activeEl.offsetLeft}px`,
      );
      parent.style.setProperty("--tabs-width", `${activeEl.offsetWidth}px`);
    }
  }, [activeTab]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, registerTab }}>
      <div className="flex flex-col w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        // Default classes (including default background)
        "scroll-x tabs-title hide-scroll w-full bg-transparent!",
        // The className from the page goes here (e.g., bg-layer2!)
        className,
      )}
    >
      {children}
      {/* The indicator with static class but dynamic variables */}
      <div className="tabs-indicator" />
    </div>
  );
}

export function TabTrigger({ id, label }: { id: string; label: string }) {
  const context = useContext(TabsContext);
  const isActive = context?.activeTab === id;

  return (
    <button
      ref={(el) => context?.registerTab(id, el)}
      onClick={() => context?.setActiveTab(id)}
      // This is important for your CSS:
      aria-selected={isActive ? "true" : undefined}
      className={twMerge("tabs-btn btn-like", isActive && "active")}
    >
      {label}
    </button>
  );
}

export function TabContentWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge("tabs-content", className)} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}

export function TabPanel({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (context?.activeTab !== id) return null;

  if (!className) return <>{children}</>;
  return <div className={className}>{children}</div>;
}
