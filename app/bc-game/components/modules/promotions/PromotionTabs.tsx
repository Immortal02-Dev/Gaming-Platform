"use client";

import { useState } from "react";
import { usePromotions, Promotion } from "@/lib/usePromotions";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  TabPanel,
} from "@/components/ui/tabs/TabsFlat";

export default function PromotionTabs() {
  const { promotions, loading } = usePromotions();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "casino", "sports", "bc-exclusive"];

  const filterPromotions = (status: string) => {
    return promotions.filter(p => {
      const statusMatch = p.status === status;
      const categoryMatch = activeCategory === "all" || p.category === activeCategory;
      return statusMatch && categoryMatch;
    });
  };

  const activePromos = filterPromotions("active");
  const archivedPromos = filterPromotions("archived");

  return (
    <>
      <Tabs defaultValue="latest">
        <TabList className="mt-3 h-10 w-full rounded-lg sm:w-64">
          <TabTrigger
            id="latest"
            label="Latest Promotion"
            className="hover:text-white"
          />
          <TabTrigger id="archived" label="Archived" />
        </TabList>

        <TabContent className="bg-transparent!">
          <TabPanel id="latest">
            <div className="flex flex-row gap-2 mt-3 w-full overflow-auto snap-mandatory snap-x">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn-like min-w-16 cursor-pointer rounded-lg p-2 text-center text-sm font-extrabold transition-all capitalize ${
                    activeCategory === cat ? "bg-brand text-white" : "bg-layer4 text-secondary hover:text-primary"
                  }`}
                >
                  {cat === "bc-exclusive" ? "BC Exclusive" : cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-20 text-secondary">Loading promotions...</div>
            ) : activePromos.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePromos.map((promo) => (
                  <div key={promo.id} className="relative group cursor-pointer">
                    {promo.is_exclusive && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <img
                          className="w-12 drop-shadow-lg"
                          src="https://bc.game/modules/bonus2/assets/exclusive-CjS9abN6.png"
                          alt="Exclusive"
                        />
                      </div>
                    )}
                    <div className="bg-layer3 rounded-xl overflow-hidden border border-white/5 hover:border-brand/50 transition-all duration-300">
                      <div className="aspect-[398/170] relative overflow-hidden">
                        <img
                          alt={promo.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={promo.image_url}
                        />
                      </div>
                      <div className="p-4 flex justify-between items-center bg-layer3">
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="text-base font-extrabold text-primary truncate group-hover:text-brand transition-colors">
                            {promo.title}
                          </div>
                          <div className="text-xs font-semibold text-secondary mt-1">
                            <span>Ends</span>
                            <span className="ml-1">
                              {promo.end_date ? new Date(promo.end_date).toLocaleDateString() : "Ongoing"}
                            </span>
                          </div>
                        </div>
                        <button
                          className="shrink-0 h-9 px-4 rounded-lg bg-white/5 text-xs font-bold text-brand hover:bg-brand/10 transition-colors"
                          type="button"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <img
                  className="w-32 h-32 mx-auto opacity-50"
                  src="https://bc.game/substation/bc/common/empty_w.png"
                  alt="Empty"
                />
                <div className="text-secondary mt-4">No active promotions found in this category.</div>
              </div>
            )}
          </TabPanel>

          <TabPanel id="archived">
            <div className="mt-3 flex flex-row gap-2 w-full overflow-auto">
               <button className="bg-brand text-white btn-like min-w-16 rounded-lg p-2 text-sm font-extrabold">All</button>
            </div>

            {loading ? (
              <div className="text-center py-20 text-secondary">Loading...</div>
            ) : archivedPromos.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60 grayscale-[0.5]">
                {archivedPromos.map((promo) => (
                  <div key={promo.id} className="bg-layer3 rounded-xl overflow-hidden border border-white/5">
                    <div className="aspect-[398/170] relative">
                      <img alt={promo.title} className="absolute inset-0 w-full h-full object-cover" src={promo.image_url} />
                    </div>
                    <div className="p-4">
                      <div className="text-base font-extrabold text-secondary">{promo.title}</div>
                      <div className="text-xs font-semibold text-third mt-1">Archived</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <img
                  className="w-32 h-32 mx-auto opacity-50"
                  src="https://bc.game/substation/bc/common/empty_w.png"
                  alt="Empty"
                />
                <div className="text-secondary mt-4">No archived promotions found.</div>
              </div>
            )}
          </TabPanel>
        </TabContent>
      </Tabs>
    </>
  );
}

