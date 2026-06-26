"use client";

import { useState } from "react";
import { useVip } from "@/lib/useVip";

export default function VipPage() {
  const { benefits, faqs, levels, loading } = useVip();
  const [activeFaqCategory, setActiveFaqCategory] = useState("General");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  const filteredFaqs = faqs.filter((f) => f.category === activeFaqCategory);

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <section className="flex flex-col gap-y-4 bg-no-repeat px-4 pb-10 pt-sh text-primary sm:gap-y-6 sm:px-0 sm:pt-3">
        <div className="flex gap-x-4 gap-y-2 sm:overflow-hidden sm:flex-wrap overflow-visible">
          <div className="relative flex grow flex-col sm:basis-160">
            <div className="relative flex md:w-full flex-col overflow-hidden rounded-md p-9 sm:min-h-64 -ml-4 w-[calc(100%+32px)]">
              <img
                className="absolute h-[calc(100%+36px)] w-auto -top-9 max-w-none -translate-x-1/2 left-1/2"
                src="https://bc.game/modules/bonus2/assets/banner_bg_w-DtLaqGQJ.png"
              />
              <img
                className="absolute -top-3 left-1/2 h-auto w-full -translate-x-1/2 sm:-top-9 sm:h-64.5 sm:w-auto"
                src="https://bc.game/modules/bonus2/assets/banner-BSyCmwdA.png"
              />
              <img
                className="absolute -top-5 left-10 h-28.5"
                src="https://bc.game/modules/bonus2/assets/coin-left-DefK5Wvs.png"
              />
              <img
                className="absolute -top-5 right-10 h-25.5"
                src="https://bc.game/modules/bonus2/assets/coin-right-DLn1RdB2.png"
              />
              <div className="relative z-10 flex w-full flex-col sm:w-full text-center items-center mt-24">
                <div className="bg-linear-to-b bg-clip-text text-2xl font-extrabold uppercase text-transparent sm:text-3xl from-[#FFDEA4] to-[#E2B665]">
                  EXCLUSIVE REWARDS
                </div>
                <div className="mb-3 bg-linear-to-b bg-clip-text text-3xl font-extrabold uppercase text-transparent sm:text-4xl from-[#FFDEA4] to-[#E2B665]">
                  ELITE VIP EXPERIENCE
                </div>
                <div className="pr-4 text-secondary">
                  Instant withdrawal on all VIP rewards, reserved for our elite
                  members.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="sm:mt-6 -mt-4 flex w-full flex-col items-center justify-center">
          <div className="flex flex-col text-center text-4xl font-extrabold sm:flex-row sm:text-start">
            <span>Experience</span>
            <span className="ml-2 bg-linear-to-r from-[#EED8B3] to-[#E6C180] bg-clip-text text-transparent">
              Premium VIP Rewards
            </span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-secondary">Loading VIP benefits...</div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 sm:grid-cols-4 sm:gap-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="bg-from-special relative flex h-56 shrink-0 rounded-xl bg-linear-to-b from-white/5 to-white/10 mt-12 border border-white/5 hover:border-brand/50 transition-colors">
                <div className="-mt-12 flex w-full flex-col items-center">
                  <div className="relative shrink-0 mt-2 sm:mt-0 h-26 sm:h-34">
                    <img
                      alt={benefit.title}
                      className="h-full object-contain"
                      src={benefit.image_url}
                    />
                  </div>
                  <div className="relative text-center pb-5 px-3">
                    <div className="font-extrabold text-primary text-sm sm:text-base">
                      <div>{benefit.title}</div>
                    </div>
                    <div className="mt-2 px-1 text-secondary text-xs">
                      {benefit.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="sm:col-span-1 h-56 flex flex-col justify-center items-center mt-6">
              <img
                className="sm:h-24 h-20 mb-2"
                src="https://bc.game/modules/bonus2/assets/more-B95K-ran.png"
              />
              <div className="text-secondary font-semibold text-xs text-center">
                More perks coming soon...
              </div>
            </div>
          </div>
        )}

        {/* VIP Levels Table */}
        <div className="mt-12 flex flex-col gap-y-4">
          <div className="text-center text-3xl font-extrabold">VIP Levels & Requirements</div>
          <div className="overflow-x-auto rounded-xl bg-layer4 p-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-secondary border-b border-white/5">
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Requirement</th>
                  <th className="px-4 py-3">Bonus %</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((level) => (
                  <tr key={level.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-bold text-brand">Level {level.level}</td>
                    <td className="px-4 py-3">{level.name}</td>
                    <td className="px-4 py-3">${level.min_wager?.toLocaleString() || 0}</td>
                    <td className="px-4 py-3 text-green-500">+{level.bonus_percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 flex flex-col gap-y-6">
          <div className="text-center text-3xl font-extrabold">Frequently Asked Questions</div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex sm:w-48 w-full flex-row sm:flex-col gap-2 rounded-xl bg-layer4 p-2">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFaqCategory(cat)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                      activeFaqCategory === cat ? "bg-brand text-white" : "hover:bg-white/5 text-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))
              ) : (
                <div className="p-4 text-xs text-secondary italic">No categories</div>
              )}
            </div>
            
            <div className="flex-1 rounded-xl bg-layer4 p-4 space-y-2">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border-b border-white/5 last:border-0 pb-2 mb-2">
                    <button
                      onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                      className="w-full flex justify-between items-center py-2 text-left hover:text-brand transition-colors"
                    >
                      <span className="font-bold">{faq.question}</span>
                      <div className={`transition-transform duration-200 ${openFaqId === faq.id ? "rotate-90" : "rotate-0"}`}>
                        <svg className="size-5 fill-current" viewBox="0 0 32 32">
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </button>
                    {openFaqId === faq.id && (
                      <div className="py-2 text-sm text-secondary animate-in fade-in slide-in-from-top-1">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-secondary italic">Select a category to view FAQs</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
