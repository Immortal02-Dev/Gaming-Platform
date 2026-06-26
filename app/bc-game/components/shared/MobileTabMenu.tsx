"use client";

import Link from "next/link";
import { useSidePanel } from "@/contexts/SidePanelContext";

export default function MobileTabMenu() {
  const { isNoticeOpen, isChatOpen } = useSidePanel();

  if (isNoticeOpen || isChatOpen) return null;

  return (
    <div className="tabbar center fixed bottom-0 left-0 w-full rounded-t-2xl bg-layer4">
      <Link
        href="/menu"
        className="flex h-full w-1/2 flex-1 flex-col items-center justify-center px-1 py-2"
      >
        <div
          className="color_icon_img menu_p_w"
          style={{
            transform: "scale(0.8)",
          }}
        />
        <p className="mt-0.5 text-xs font-extrabold text-secondary">Menu</p>
      </Link>
      <Link
        href="/explore"
        className="flex h-full w-1/2 flex-1 flex-col items-center justify-center px-1 py-2"
      >
        <div
          className="color_icon_img explore_p_w"
          style={{
            transform: "scale(0.8)",
          }}
        />
        <p className="mt-0.5 text-xs font-extrabold text-secondary">Explore</p>
      </Link>
      <Link
        href="/casino"
        className="flex h-full w-1/2 flex-1 flex-col items-center justify-center px-1 py-2"
      >
        <div
          className="color_icon_img casino_p_w"
          style={{
            transform: "scale(0.8)",
          }}
        />
        <p className="mt-0.5 text-xs font-extrabold text-secondary">Casino</p>
      </Link>
      <Link
        href="/sports"
        className="flex h-full w-1/2 flex-1 flex-col items-center justify-center px-1 py-2"
      >
        <div
          className="color_icon_img sports_p_w"
          style={{
            transform: "scale(0.8)",
          }}
        />
        <p className="mt-0.5 text-xs font-extrabold text-secondary">Sports</p>
      </Link>
      <Link
        href="/chat-public"
        className="flex h-full w-1/2 flex-1 flex-col items-center justify-center px-1 py-2"
      >
        <div
          className="color_icon_img chat_p_w"
          style={{
            transform: "scale(0.8)",
          }}
        />
        <p className="mt-0.5 text-xs font-extrabold text-secondary">Chat</p>
      </Link>
    </div>
  );
}
