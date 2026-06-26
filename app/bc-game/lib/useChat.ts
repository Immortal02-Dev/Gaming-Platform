import { useState, useEffect } from "react";
import { BASE_URL, getMediaUrl } from "./constants";

export interface ChatMessage {
  id: number;
  user_id: number;
  username: string;
  avatar_url: string;
  message: string;
  created_at: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${BASE_URL}/chat/messages`);
      if (res.ok) {
        const data = await res.json();
        const msgData = (data.data || []).map((m: any) => ({
          ...m,
          avatar_url: getMediaUrl(m.avatar_url),
        }));
        setMessages(msgData);
      }
    } catch (error) {
      console.error("Chat load failed", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    // Token is stored in localStorage (not cookie) for this app
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      console.warn("Not authenticated — cannot send message");
      return false;
    }
    try {
      const res = await fetch(`${BASE_URL}/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        fetchMessages();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Send message failed", error);
      return false;
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5s for now
    return () => clearInterval(interval);
  }, []);

  return { messages, loading, sendMessage, refresh: fetchMessages };
}
