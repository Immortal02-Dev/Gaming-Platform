"use client";

import React from "react";
import SportCard from "@/components/modules/sports/MatchCard";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSports } from "@/lib/useSports";
import { SPORTS_ICON_MAP } from "@/constants/sports";

interface SportsUpcomingProps {
  sport?: string;
}

const TABS = [
  { id: "soccer", label: "Soccer", slug: "soccer" },
  { id: "basketball", label: "Basketball", slug: "basketball" },
  { id: "counter-strike", label: "Counter-Strike", slug: "counter-strike" },
  { id: "dota-2", label: "Dota 2", slug: "dota-2" },
  { id: "tennis", label: "Tennis", slug: "tennis" },
  { id: "baseball", label: "Baseball", slug: "baseball" },
  {
    id: "league-of-legends",
    label: "League of Legends",
    slug: "league-of-legends",
  },
  { id: "ice-hockey", label: "Ice Hockey", slug: "ice-hockey" },
  { id: "volleyball", label: "Volleyball", slug: "volleyball" },
];

export default function SportUpcoming({
  sport: sportProp,
}: SportsUpcomingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("upcoming")?.replace("/", "") || "soccer";
  const [activeTab, setActiveTab] = useState(initialTab);

  const currentSportSlug = sportProp || activeTab;

  const { matches, loading } = useSports({
    type: "upcoming",
    sportSlug: currentSportSlug,
  });

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/sports?upcoming=%2F${tabId}`, { scroll: false });
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
                fill: "rgb(29, 148, 218)",
                color: "inherit",
                width: "auto",
                height: "32px",
              }}
            >
              <g id="Property 1=upcoming">
                <g id="Union">
                  <path d="M21.9177 16.9959C21.4434 19.8356 18.9745 22 16 22C12.6863 22 10 19.3137 10 16C10 13.0256 12.1644 10.5566 15.0042 10.0823C15.5489 9.9913 16 10.4478 16 11V16H21C21.5523 16 22.0087 16.4511 21.9177 16.9959Z"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16ZM24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16Z"
                  ></path>
                </g>
              </g>
            </svg>
            <div>Upcoming</div>
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
                                          `<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="currentColor"/></svg>`,
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
