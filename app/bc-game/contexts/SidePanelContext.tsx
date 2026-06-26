"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidePanelContextType {
  isChatOpen: boolean;
  isNoticeOpen: boolean;
  isMenuOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleChat: () => void;
  toggleNotice: () => void;
  toggleMenu: () => void;
  toggleSidebar: () => void;
  closeChat: () => void;
  closeNotice: () => void;
  closeMenu: () => void;
}

const SidePanelContext = createContext<SidePanelContextType | undefined>(
  undefined,
);

export function SidePanelProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) {
      setIsNoticeOpen(false);
      setIsMenuOpen(false);
    }
  };

  const toggleNotice = () => {
    setIsNoticeOpen((prev) => !prev);
    if (!isNoticeOpen) {
      setIsChatOpen(false);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      setIsChatOpen(false);
      setIsNoticeOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const closeChat = () => setIsChatOpen(false);
  const closeNotice = () => setIsNoticeOpen(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <SidePanelContext.Provider
      value={{
        isChatOpen,
        isNoticeOpen,
        isMenuOpen,
        isSidebarCollapsed,
        toggleChat,
        toggleNotice,
        toggleMenu,
        toggleSidebar,
        closeChat,
        closeNotice,
        closeMenu,
      }}
    >
      {children}
    </SidePanelContext.Provider>
  );
}

export function useSidePanel() {
  const context = useContext(SidePanelContext);
  if (context === undefined) {
    throw new Error("useSidePanel must be used within a SidePanelProvider");
  }
  return context;
}
