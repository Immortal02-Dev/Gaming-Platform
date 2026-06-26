"use client";

import Header from "@/components/shared/Header";
import MobileHeader from "@/components/shared/MobileHeader";
import MobileTabMenu from "./shared/MobileTabMenu";
import SideMenu from "@/components/shared/SideMenu";
import Footer from "@/components/shared/Footer";
import SideChat from "@/components/modules/notice-chat/SideChat";
import SideNotice from "@/components/modules/notice-chat/SideNotice";
import { SidePanelProvider, useSidePanel } from "@/contexts/SidePanelContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function LayoutContent({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  const { isChatOpen, isNoticeOpen, isSidebarCollapsed } = useSidePanel();
  const pathname = usePathname();
  const isChatPublic = pathname === "/chat-public";

  useEffect(() => {
    const isPanelOpen = isChatOpen || isNoticeOpen;

    // Update header padding
    const header = document.querySelector(".header") as HTMLElement;
    if (header) {
      header.style.paddingRight = isPanelOpen ? "380px" : "0";
    }

    // Update pc-wrapper margin
    const pcWrapper = document.querySelector(".pc-wrapper") as HTMLElement;
    if (pcWrapper) {
      pcWrapper.style.marginRight = isPanelOpen ? "380px" : "0";
    }
  }, [isChatOpen, isNoticeOpen]);

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="block md:hidden">{!isChatPublic && <MobileHeader />}</div>
      <div className="hidden md:block">
        <SideMenu />
      </div>

      <div className="block md:hidden">
        <MobileTabMenu />
      </div>

      {/* pc wrapper with sidebar margin */}
      <div className="pc pc-wrapper">
        {children}
        <Footer />
      </div>

      <SideNotice />
      <SideChat />
      {modal}
    </>
  );
}

export default function ClientLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidePanelProvider>
        <AuthProvider>
          <LayoutContent modal={modal}>{children}</LayoutContent>
        </AuthProvider>
      </SidePanelProvider>
    </ThemeProvider>
  );
}
