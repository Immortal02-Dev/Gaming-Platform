"use client";

import React, { useMemo } from "react";
import SportCard from "@/components/modules/sports/MatchCard";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFavorites } from "@/lib/useFavorites";
import { useSports } from "@/lib/useSports";
import { SPORTS_ICON_MAP } from "@/constants/sports";

export default function SportsFavorites() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { favorites } = useFavorites();

  const initialTab = searchParams.get("top")?.replace("/", "") || "all";
  const [activeTab, setActiveTab] = useState(initialTab);

  const { matches, loading } = useSports({
    ids: favorites,
  });

  // Extract available sports from favorites to create dynamic tabs
  const dynamicTabs = useMemo(() => {
    if (!matches.length) return [];

    const sports = new Set<string>();
    matches.forEach((m) => sports.add(m.sport));

    const tabs = Array.from(sports).map((sport) => ({
      id: sport,
      label: sport.charAt(0).toUpperCase() + sport.slice(1).replace("-", " "),
      slug: sport,
    }));

    return [{ id: "all", label: "All", slug: "all" }, ...tabs];
  }, [matches]);

  // Extract sport type from tab id
  const getActiveSport = (tab: string) => {
    return tab;
  };

  const filteredMatches = matches.filter((match) => {
    if (!activeTab || activeTab === "all") return true;
    return match.sport === activeTab;
  });

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/sports/favorites?top=%2F${tabId}`, { scroll: false });
  };

  return (
    <>
      <div
        className="sport-content__title mb-4 font-bold flex items-center"
        data-editor-id="blockTitle"
      >
        <svg
          data-cy="ic-favourites-title"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block mr-2"
          style={{
            fill: "currentcolor",
            color: "rgb(255, 190, 3)",
            width: "auto",
            height: "32px",
          }}
        >
          <path d="M15.0554 4.71739C15.3667 3.82183 16.6333 3.82183 16.9446 4.71739L19.2982 11.4886C19.4356 11.8837 19.8043 12.1516 20.2224 12.1601L27.3896 12.3061C28.3375 12.3254 28.7289 13.53 27.9733 14.1028L22.2609 18.4337C21.9276 18.6864 21.7867 19.1198 21.9078 19.5201L23.9837 26.3816C24.2583 27.2891 23.2336 28.0336 22.4554 27.492L16.5712 23.3975C16.2279 23.1586 15.7721 23.1586 15.4288 23.3975L9.54463 27.492C8.76639 28.0336 7.74174 27.2891 8.01629 26.3816L10.0922 19.5201C10.2133 19.1198 10.0724 18.6864 9.73915 18.4337L4.02666 14.1028C3.27112 13.53 3.6625 12.3254 4.61043 12.3061L11.7776 12.1601C12.1957 12.1516 12.5644 11.8837 12.7018 11.4886L15.0554 4.71739Z"></path>
        </svg>
        <div>Favourites</div>
      </div>

      <div className="h-auto overflow-visible mb-6">
        <div className="overflow-visible">
          <div className="relative h-8.25">
            <div className="w-full h-8.25 overflow-hidden relative">
              <div className="w-full pb-12.5 overflow-x-auto overflow-y-hidden">
                <div className="relative w-full overflow-hidden h-8.5">
                  <div className="inline-block whitespace-nowrap align-top h-8.25">
                    <div className="flex flex-nowrap">
                      {dynamicTabs.map((tab) => (
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
                                  (tab.id === "all"
                                    ? `<svg width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M4 11h24v2H4zm0 4h24v2H4zm0 4h24v2H4z"/></svg>`
                                    : `<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="currentColor"/></svg>`),
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
      </div>

      {loading ? (
        <div className="py-20 text-center opacity-50">Loading favorites...</div>
      ) : favorites.length === 0 ? (
        <div className="py-20 text-center opacity-50 bg-layer3 rounded-xl border border-dashed border-primary/20">
          <div className="text-4xl mb-4">⭐</div>
          <div className="text-xl font-semibold mb-2" id="no-favorites-state">
            No Favorites Yet
          </div>
          <div className="text-sm">
            Click the star icon on any match to add it to your favorites.
          </div>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="py-20 text-center opacity-50 bg-layer3 rounded-xl border border-dashed border-primary/20">
          <div className="text-xl font-semibold mb-2">
            No favorites found for {activeTab}
          </div>
          <div className="text-sm">
            You have favorites in other sports, but none in this category.
          </div>
          <button
            onClick={() => handleTabClick("all")}
            className="mt-4 text-primary hover:underline text-sm font-medium"
          >
            Show all favorites
          </button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMatches.map((match) => (
            <SportCard key={match.id} {...match} />
          ))}
        </div>
      )}
    </>
  );
}
