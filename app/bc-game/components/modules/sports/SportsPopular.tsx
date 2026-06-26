"use client";

import React from "react";
import SportCard from "@/components/modules/sports/MatchCard";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSports } from "@/lib/useSports";
import { SPORTS_ICON_MAP } from "@/constants/sports";

interface SportsPopularProps {
  sport?: string;
}

const TABS = [
  { id: "soccer", label: "Soccer", icon: "ic-soccer", slug: "soccer" },
  {
    id: "basketball",
    label: "Basketball",
    icon: "ic-basketball",
    slug: "basketball",
  },
  {
    id: "counter-strike",
    label: "Counter-Strike",
    icon: "ic-counter-strike",
    slug: "counter-strike",
  },
  { id: "dota-2", label: "Dota 2", icon: "ic-dota-2", slug: "dota-2" },
  { id: "tennis", label: "Tennis", icon: "ic-tennis", slug: "tennis" },
  { id: "baseball", label: "Baseball", icon: "ic-baseball", slug: "baseball" },
  {
    id: "league-of-legends",
    label: "League of Legends",
    icon: "ic-league-of-legends",
    slug: "league-of-legends",
  },
  {
    id: "ice-hockey",
    label: "Ice Hockey",
    icon: "ic-ice-hockey",
    slug: "ice-hockey",
  },
  {
    id: "volleyball",
    label: "Volleyball",
    icon: "ic-volleyball",
    slug: "volleyball",
  },
];

export default function SportsPopular({
  sport: sportProp,
}: SportsPopularProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("top")?.replace("/", "") || "soccer";
  const [activeTab, setActiveTab] = useState(initialTab);

  const currentSportSlug = sportProp || activeTab;

  const { matches, loading } = useSports({
    type: "popular",
    sportSlug: currentSportSlug,
  });

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/sports?top=%2F${tabId}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <div className="block">
        <div className="mt-6">
          <div className="sport-content__title sports-custom__title">
            <svg
              data-cy="ic-top"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 inline-block"
              style={{
                fill: "rgb(204, 122, 26)",
                color: "inherit",
                width: "auto",
                height: "32px",
              }}
            >
              <path d="M18.8 9.73684C18.8 10.7537 18.2326 11.641 17.3904 12.1129L20.1822 15.8272C20.5377 16.3001 21.2239 16.3627 21.6591 15.9619L26.2786 11.707C25.9151 11.3301 25.6923 10.8221 25.6923 10.2632C25.6923 9.10052 26.6566 8.15796 27.8461 8.15796C29.0356 8.15796 30 9.10052 30 10.2632C30 11.4259 29.0356 12.3685 27.8461 12.3685C27.7679 12.3685 27.6907 12.3644 27.6147 12.3565L26.8677 19.1099C26.8117 19.6166 26.3835 20 25.8738 20H6.12146C5.61379 20 5.18667 19.6196 5.12813 19.1153L4.34403 12.3604C4.28136 12.3657 4.21793 12.3685 4.15385 12.3685C2.96431 12.3685 2 11.4259 2 10.2632C2 9.10052 2.96431 8.15796 4.15385 8.15796C5.34338 8.15796 6.30769 9.10052 6.30769 10.2632C6.30769 10.832 6.07693 11.3481 5.70192 11.7269L10.3413 15.9678C10.7769 16.3659 11.4608 16.3023 11.8154 15.8305L14.6096 12.113C13.7674 11.6411 13.2 10.7538 13.2 9.73684C13.2 8.22533 14.4536 7 16 7C17.5463 7 18.8 8.22533 18.8 9.73684Z"></path>
              <path d="M6.5 23C5.67157 23 5 23.6716 5 24.5C5 25.3284 5.67157 26 6.5 26H25.5C26.3284 26 27 25.3284 27 24.5C27 23.6716 26.3284 23 25.5 23H6.5Z"></path>
            </svg>
            <div>Popular</div>
          </div>

          <div className="h-auto overflow-visible">
            <div className="overflow-visible">
              {!sportProp && (
                <div className="mb-4">
                  <div className="relative h-8.25">
                    <div className="w-full h-8.25 overflow-hidden relative">
                      <div className="w-full pb-12.5 overflow-x-auto overflow-y-hidden">
                        <div className="relative w-full overflow-hidden h-8.5">
                          <div className="inline-block whitespace-nowrap align-top h-8.25">
                            <div className="flex flex-nowrap">
                              {TABS.map((tab) => (
                                <button
                                  key={tab.id}
                                  onClick={() => handleTabClick(tab.id)}
                                  className={cn(
                                    "sport-item__tab",
                                    tab.id === activeTab ? "active" : "",
                                  )}
                                >
                                  <div className="sport-tab__icon">
                                    <div
                                      className="flex items-center justify-center w-6 h-6 bt2126"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          SPORTS_ICON_MAP[tab.id] ||
                                          `<svg width="24" height="24" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="currentColor"/></svg>`,
                                      }}
                                    />
                                  </div>
                                  <div className="bt2127 whitespace-nowrap">
                                    {tab.label}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="text-center py-10 opacity-50">Loading...</div>
              ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {matches.map((match) => (
                    <SportCard key={match.id} {...match} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
