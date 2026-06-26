"use client";

import { useState } from "react";
import { useSidePanel } from "@/contexts/SidePanelContext";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/lib/useChat";

export default function SideChat() {
  const { isChatOpen, closeChat } = useSidePanel();
  const { isLoggedIn } = useAuth();
  const { messages, loading, sendMessage } = useChat();
  const [inputText, setInputText] = useState("");

  if (!isChatOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const success = await sendMessage(inputText);
    if (success) setInputText("");
  };

  return (
    <div className="chat-notice">
      <div className="right-slide-content relative h-full w-full">
        <button
          className="button button-m absolute right-2 top-3.5 z-101 size-8! rounded-lg bg-layer5 p-0"
          type="button"
          onClick={closeChat}
        >
          <div className="icon size-4.5! fill-secondary">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.15445 7.40846C6.3734 8.18951 6.3734 9.45584 7.15445 10.2369L12.9175 15.9999L7.15445 21.7629C6.3734 22.544 6.3734 23.8103 7.15445 24.5914L7.40846 24.8454C8.18951 25.6264 9.45584 25.6264 10.2369 24.8454L15.9998 19.0825L21.7631 24.8458C22.5441 25.6269 23.8104 25.6269 24.5915 24.8458L24.8455 24.5918C25.6265 23.8108 25.6265 22.5444 24.8455 21.7634L19.0825 16.0003L24.8455 10.2373C25.6265 9.45627 25.6265 8.18994 24.8455 7.40889L24.5915 7.15488C23.8104 6.37383 22.5441 6.37383 21.7631 7.15488L16.0002 12.9177L10.2369 7.15445C9.45584 6.3734 8.18951 6.3734 7.40846 7.15445L7.15445 7.40846Z" />
            </svg>
          </div>
        </button>
        
        <div className="relative size-full left-0 top-0">
          <div className="header-layer w-full flex-none bg-layer4 fixed sm:absolute! top-0 left-0 pt-st">
            <div className="px-4 flex items-center justify-between h-14 sm:h-15">
              <div className="font-extrabold text-primary">Global Chat</div>
            </div>
          </div>

          <div className="scroll-y scroll-layer chat-scroll-layer h-full pb-20">
            <div className="scroll-container pt-15">
              {loading && messages.length === 0 ? (
                <div className="text-center p-10 text-secondary">Loading chat...</div>
              ) : messages.length === 0 ? (
                <div className="text-center p-10 text-secondary">No messages yet. Start the conversation!</div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="flex flex-row px-3 font-semibold relative pt-4">
                    <div className="w-10 h-full flex-none mr-2">
                      <div className="size-10 border-2 border-layer4 rounded-full overflow-hidden bg-layer5">
                        <img 
                          className="size-full object-cover" 
                          src={m.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.username}`} 
                          alt="avatar" 
                        />
                      </div>
                    </div>
                    <div className="flex-auto max-w-[80%]">
                      <div className="flex justify-between items-center mb-1 gap-2">
                        <span className="text-secondary text-xs truncate">{m.username}</span>
                        <span className="text-[10px] text-quarterary whitespace-nowrap">
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg text-sm bg-layer4 inline-flex w-fit break-all text-primary">
                        {m.message}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="w-full absolute bottom-0 left-0 bg-layer3 border-t border-white/5 px-3 py-3">
            {isLoggedIn ? (
              <form className="flex gap-2 items-center" onSubmit={handleSend}>
                <div className="flex-1 bg-layer5 rounded-lg border border-transparent focus-within:border-brand/50 transition-all overflow-hidden">
                  <textarea
                    className="bg-transparent block w-full resize-none outline-none placeholder-quarterary text-primary p-2 text-sm h-10"
                    placeholder="Your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                      }
                    }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="size-10 flex center bg-brand rounded-lg text-alw_dark hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  disabled={!inputText.trim()}
                >
                  <i className="fa fa-paper-plane"></i>
                </button>
              </form>
            ) : (
              <a
                href="/login"
                className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-brand/10 border border-brand/30 text-brand text-sm font-semibold hover:bg-brand/20 transition-all"
              >
                <i className="fa fa-sign-in-alt"></i>
                Login to chat
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
