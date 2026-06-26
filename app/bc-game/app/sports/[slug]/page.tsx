"use client";

import { use } from "react";
import SportsHeader from "@/components/shared/navigation/sports-header";
import SportLeagueTabs from "@/components/modules/sports/SportLeagueTabs";

import ViewModeToggle from "@/components/modules/sports/ViewModeToggle";

import OutrightListView from "@/components/modules/sports/OutrightListView";
import FeaturedLiveCarousel from "@/components/modules/sports/FeaturedLiveCarousel";
import SportsPopular from "@/components/modules/sports/SportsPopular";
import SportsLive from "@/components/modules/sports/SportsLive";
import SportsUpcoming from "@/components/modules/sports/SportUpcoming";

interface SportDynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function SportDynamicPage({ params }: SportDynamicPageProps) {
  // Unwrap the params Promise
  const { slug } = use(params);

  const sportKey = slug.match(/^(.+?)-\d+$/)?.[1] ?? slug;

  return (
    <div className="page-content relative z-10 w-full px-4 sm:px-0">
      <div className="my-0! -mx-4 min-h-[70vh] sm:mx-0">
        <div
          style={{
            fontFamily: "inherit",
            backgroundColor: "var(--sports-bg_main)",
          }}
        >
          <div
            className="sports-main"
            style={{ minHeight: `calc(-56px + 100vh)` }}
          >
            <SportsHeader />

            <div className="sport-page__games">
              <SportLeagueTabs sportSlug={slug} />

              <div className="flex-1">
                {/* Matches and Outrights tab button */}
                <ViewModeToggle />

                {/* <OutrightListView /> Outrights Tab will show data related to sports like soccer etc.... */}

                {/* Matches Tab default */}
                <FeaturedLiveCarousel sport={sportKey} />
                <SportsPopular sport={sportKey} />
                <SportsLive sport={sportKey} />
                <SportsUpcoming sport={sportKey} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
