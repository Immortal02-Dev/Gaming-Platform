"use client";

import { useState } from "react";
import { useSidePanel } from "@/contexts/SidePanelContext";
import { useNotifications, AppNotification } from "@/lib/useNotifications";

export default function SideNotice() {
  const { isNoticeOpen, closeNotice } = useSidePanel();
  const { notifications, loading, markAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState<"all" | "promo" | "system">("all");

  if (!isNoticeOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "promo") return n.type === "promo" || n.type === "info";
    if (activeTab === "system") return n.type === "system" || n.type === "transaction";
    return true;
  });

  return (
    <div className="chat-notice">
      <div className="right-slide-content relative h-full w-full">
        <button
          className="button button-m absolute size-8! rounded-lg bg-layer5 p-0 right-2 top-3.5 z-101"
          type="button"
          onClick={closeNotice}
        >
          <div className="icon fill-secondary size-4.5!">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.15445 7.40846C6.3734 8.18951 6.3734 9.45584 7.15445 10.2369L12.9175 15.9999L7.15445 21.7629C6.3734 22.544 6.3734 23.8103 7.15445 24.5914L7.40846 24.8454C8.18951 25.6264 9.45584 25.6264 10.2369 24.8454L15.9998 19.0825L21.7631 24.8458C22.5441 25.6269 23.8104 25.6269 24.5915 24.8458L24.8455 24.5918C25.6265 23.8108 25.6265 22.5444 24.8455 21.7634L19.0825 16.0003L24.8455 10.2373C25.6265 9.45627 25.6265 8.18994 24.8455 7.40889L24.5915 7.15488C23.8104 6.37383 22.5441 6.37383 21.7631 7.15488L16.0002 12.9177L10.2369 7.15445C9.45584 6.3734 8.18951 6.3734 7.40846 7.15445L7.15445 7.40846Z" />
            </svg>
          </div>
        </button>
        <div
          className="w-full"
          style={{
            height: "calc(100% - 3.75rem)",
            opacity: "1",
            transform: "translate(0px, 0px)",
          }}
        >
          <div className="flex items-center justify-center bg-layer4 text-base font-extrabold pl-4 h-15">
            Notification
          </div>
          <div className="scroll-y h-full">
            <div className="scroll-container">
              <div className="min-h-screen px-4">
                <div className="sticky top-0 z-10 h-18 w-full flex items-center justify-center bg-layer2 sm:bg-layer1 dark:bg-layer2 sm:dark:bg-layer3">
                  <div className="scroll-x tabs-title hide-scroll rounded-xl" style={{ ["--tabs-width" as any]: "118px" } as any}>
                    <button 
                      aria-selected={activeTab === "all"} 
                      className="tabs-btn btn-like"
                      onClick={() => setActiveTab("all")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>All</span>
                      </div>
                    </button>
                    <button 
                      aria-selected={activeTab === "promo"} 
                      className="tabs-btn btn-like"
                      onClick={() => setActiveTab("promo")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Promotions</span>
                      </div>
                    </button>
                    <button 
                      aria-selected={activeTab === "system"} 
                      className="tabs-btn btn-like"
                      onClick={() => setActiveTab("system")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>System</span>
                      </div>
                    </button>
                    <div className="tabs-indicator" style={{ left: activeTab === "all" ? "0%" : activeTab === "promo" ? "33.3%" : "66.6%", width: "33.3%" }} />
                  </div>
                </div>
                
                <div className="tabs-content mt-4 bg-transparent space-y-3">
                  {loading ? (
                    <div className="text-center py-20 text-secondary">Loading notifications...</div>
                  ) : filteredNotifications.length === 0 ? (
                    <div className="text-center py-20 text-secondary italic">No notifications found</div>
                  ) : (
                    filteredNotifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`relative rounded-lg bg-layer4 px-3 py-3 border border-transparent hover:border-brand/30 transition-all ${!notif.is_read ? 'shadow-sm shadow-brand/10' : 'opacity-70'}`}
                        onClick={() => !notif.is_read && markAsRead(notif.id)}
                      >
                        <div className="flex items-center justify-between text-[10px] text-secondary">
                          <div>{new Date(notif.created_at).toLocaleString()}</div>
                          {!notif.is_read && <div className="size-2 rounded-full bg-brand" />}
                        </div>
                        <div className="mt-2 text-sm font-extrabold text-primary">
                          {notif.title}
                        </div>
                        <div className="mt-1 text-xs text-secondary leading-relaxed line-clamp-3">
                          {notif.message}
                        </div>
                        
                        {notif.image_url && (
                          <div className="mt-2 rounded overflow-hidden">
                            <img src={notif.image_url} alt="notif" className="w-full h-auto" />
                          </div>
                        )}

                        {notif.link_url && (
                          <div className="mt-3">
                            <a 
                              href={notif.link_url} 
                              className="text-xs font-bold text-brand hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Learn More →
                            </a>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
