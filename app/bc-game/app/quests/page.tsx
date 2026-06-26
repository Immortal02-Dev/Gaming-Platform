"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuests } from "@/lib/useQuests";
import { claimQuest } from "@/lib/api";

export default function QuestsPage() {
  const { token, isLoggedIn } = useAuth();
  const { quests, progress, meta, stats, loading, refresh } = useQuests(token);
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "special">(
    "daily",
  );

  const handleClaim = async (questId: number) => {
    if (!token) return;
    const res = await claimQuest(questId, token);
    if (res.message) {
      alert(res.message);
      refresh();
    }
  };

  const renderTab = (tab: "daily" | "weekly" | "special", label: string) => {
    const isActive = activeTab === tab;

    return (
      <div
        className={`flex flex-1 cursor-pointer items-center justify-center py-2 text-center sm:py-4 ${isActive ? "font-extrabold text-primary" : "font-semibold text-secondary"}`}
        onClick={() => setActiveTab(tab)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setActiveTab(tab);
        }}
        style={{
          backgroundClip: "padding-box, border-box",
          backgroundImage: isActive
            ? "linear-gradient(to left, rgb(var(--layer2)) 0%, rgb(var(--layer2)) 100%), linear-gradient(to left, rgb(var(--brand)) 0%, rgb(var(--brand_alt)) 100%)"
            : "linear-gradient(to left, rgb(var(--layer2)) 0%, rgb(var(--layer2)) 100%), linear-gradient(to left, rgb(var(--layer2)) 0%, rgb(var(--layer2)) 100%)",
          backgroundOrigin: "padding-box, border-box",
          borderBottom: "2px solid transparent",
        }}
      >
        {label}
      </div>
    );
  };

  const filteredQuests = quests.filter((q) => q.type === activeTab);
  
  // Merge progress into quests
  const displayQuests = filteredQuests.map((q) => {
    const p = progress.find((prog) => prog.quest_id === q.id);
    return {
      ...q,
      current_value: p?.current_value || 0,
      status: p?.status || "pending",
    };
  });

  const getExpiryText = () => {
    if (!meta) return "...";
    if (activeTab === "daily") {
      const ms = new Date(meta.daily_expires_at).getTime() - Date.now();
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${mins}m`;
    }
    if (activeTab === "weekly") {
      const ms = new Date(meta.weekly_expires_at).getTime() - Date.now();
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days}d ${hours}h`;
    }
    return "";
  };

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="flex flex-col gap-y-3 py-3">
        <div className="flex items-end justify-between">
          <span className="text-2xl font-extrabold">Quest Hub</span>
        </div>
        <div className="bg-from-special relative h-32 gap-y-4 overflow-hidden rounded-xl bg-linear-to-l from-[rgb(var(--brand)/.2)] to-transparent px-4 py-3 sm:h-28">
          <img
            className="absolute right-0 top-0 w-52"
            src="https://bc.game/substation/bc/bonus/bonus/quest-hub/quest-banner.png"
          />
          <div className="flex h-full flex-col justify-around">
            <span className="text-sm text-secondary">Quest Rewards</span>
            <span className="text-xs font-semibold text-primary">
              Accumulated rewards
            </span>
            <div className="flex items-center gap-x-2 text-xl font-extrabold">
              <span className="flex items-center gap-x-2">
                <img
                  src="https://bc.game/coin/BCD.black.png"
                  style={{
                    display: "inline-block",
                    height: "20px",
                    width: "20px",
                  }}
                />
                {stats?.accumulated_rewards || 0} {stats?.currency || "BCD"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Quests */}
        <div className="flex w-full">
          {renderTab("daily", "Daily Quests")}
          {renderTab("weekly", "Weekly Quests")}
          {renderTab("special", "Special")}
        </div>

        {loading ? (
          <div className="text-center py-20 text-secondary">Loading quests...</div>
        ) : (
          <>
            {(activeTab === "daily" || activeTab === "weekly") && (
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex gap-x-1 text-sm font-semibold text-secondary">
                    Expires in
                    <span className="text-primary">
                      {getExpiryText()}
                    </span>
                  </span>
                  <button
                    className="button button-s inline-flex gap-x-1 rounded-lg bg-layer5 text-secondary"
                    type="button"
                  >
                    <span className="text-sm font-extrabold text-primary">
                      Previous Quests
                    </span>
                  </button>
                </div>
                
                <div className="flex flex-col gap-y-3 sm:grid sm:flex-none sm:grid-cols-2 sm:gap-x-4">
                  {displayQuests.length === 0 ? (
                    <div className="col-span-2 py-10 text-center text-secondary">
                      No active quests for this period.
                    </div>
                  ) : (
                    displayQuests.map((quest) => (
                      <div key={quest.id} className="relative z-0 flex shrink-0 gap-x-3 overflow-hidden rounded-xl bg-layer4 p-2 leading-4">
                        <div className="flex shrink-0 items-center justify-center">
                          {quest.status === "pending" ? (
                            <div className="relative shrink-0 size-18">
                              <svg
                                style={{
                                  height: "100%",
                                  transform: "rotate(-90deg)",
                                  width: "100%",
                                }}
                                viewBox="0 0 100 100"
                              >
                                <circle
                                  cx="50"
                                  cy="50"
                                  fill="none"
                                  r="45"
                                  stroke="rgb(var(--input))"
                                  strokeWidth="10"
                                />
                                <circle
                                  cx="50"
                                  cy="50"
                                  fill="none"
                                  r="45"
                                  stroke="rgb(var(--brand))"
                                  strokeDasharray="282.7"
                                  strokeDashoffset={282.7 * (1 - Math.min(quest.current_value / quest.goal_value, 1))}
                                  strokeLinecap="round"
                                  strokeWidth="10"
                                  style={{ transition: "all 0.5s linear" }}
                                />
                              </svg>
                              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-input text-sm font-semibold text-primary">
                                <img
                                  className="w-[4.5em]"
                                  src="https://bc.game/substation/bc/bonus/bonus/quest-hub/quest-reward.png"
                                />
                              </div>
                            </div>
                          ) : (
                            <img
                              className="w-[4.5em]"
                              src="https://bc.game/substation/bc/bonus/bonus/quest-hub/quest-reward.png"
                            />
                          )}
                        </div>
                        <div className="flex grow flex-col gap-y-1 overflow-hidden">
                          <div className="flex grow items-center">
                            <h2 className="min-w-0 text-lg font-extrabold leading-snug text-primary sm:overflow-hidden">
                              {quest.title}
                            </h2>
                          </div>
                          <div className="grow">
                            <span className="text-xs font-semibold text-secondary">
                              {quest.description}
                            </span>
                          </div>
                          <div className="mt-2 flex h-4 items-center gap-x-2">
                            <span className="inline-flex items-center gap-x-1">
                              <img
                                src="https://bc.game/coin/BCD.black.png"
                                style={{ display: "inline-block", height: "16px", width: "16px" }}
                              />
                              <span className="text-sm font-semibold text-brand">
                                Earn {quest.reward_amount} {quest.reward_currency}
                              </span>
                            </span>
                            {isLoggedIn && (
                              <span className="text-[10px] text-tertiary">
                                ({quest.current_value} / {quest.goal_value})
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex shrink-0 basis-20 items-center justify-center">
                          {quest.status === "claimed" ? (
                            <button className="button button-second button-m w-min-16 shrink-0" disabled>
                              Claimed
                            </button>
                          ) : quest.status === "completed" ? (
                            <button 
                              className="button button-brand button-m w-min-16 shrink-0"
                              onClick={() => handleClaim(quest.id)}
                            >
                              Claim
                            </button>
                          ) : (
                            <button className="button button-brand button-m w-min-16 shrink-0">
                              Go
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "special" && (
              <section className="py-10 text-center center flex-col">
                <img
                  className="w-48 h-48"
                  src="https://bc.game/substation/bc/common/empty_w.png"
                />
                <div className="leading-5 mt-4">Stay tuned—something's coming!</div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

