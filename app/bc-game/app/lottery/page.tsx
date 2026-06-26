"use client";

import { useState, useEffect } from "react";
import { useLottery, Lottery } from "@/lib/useLottery";

export default function LotteryPage() {
  const { sections, loading } = useLottery();
  const [search, setSearch] = useState("");

  const upcoming = sections.find(s => s.section === "upcoming")?.data || [];
  const popular = sections.find(s => s.section === "popular")?.data || [];

  const filterLotteries = (list: Lottery[]) => {
    if (!search) return list;
    return list.filter(l => l.title.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="min-h-screen">
        <div className="flex-1 bg-layer2">
          <section className="relative min-h-32">
            <img
              alt="banner"
              className="min-h-32 w-full"
              loading="lazy"
              src="https://bc.game/substation/bc/lottery/lottery/banner_w.png"
            />
            <section className="absolute-center w-full pl-6 text-left sm:pl-12">
              <div className="flex w-full">
                <h1 className="text-[1.75rem] font-extrabold text-primary sm:text-4xl">
                  LOTTERY
                </h1>
              </div>
              <p className="my-1.5 w-[calc(100%-180px)] text-left text-sm font-semibold text-secondary sm:my-4 sm:text-lg">
                Play lotteries online and hit the jackpot!
              </p>
            </section>
          </section>

          <section className="relative my-4">
            <div className="icon absolute left-2 top-1/2 size-6! -translate-y-1/2 fill-secondary">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z" />
              </svg>
            </div>
            <div className="input bg-input_darken px-10 pl-10! text-base font-semibold placeholder:text-quarterary">
              <input 
                placeholder="Lottery Name" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </section>

          {loading ? (
             <div className="text-center py-20 text-secondary">Loading lotteries...</div>
          ) : (
            <div className="space-y-10 py-6">
              {/* Upcoming Draws */}
              {upcoming.length > 0 && (
                <section>
                  <div className="flex justify-between mb-4">
                    <h2 className="text-primary text-lg font-extrabold">Upcoming Draws</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterLotteries(upcoming).map((lottery) => (
                      <LotteryCard key={lottery.id} lottery={lottery} />
                    ))}
                  </div>
                </section>
              )}

              {/* Popular Lotteries */}
              {popular.length > 0 && (
                <section>
                  <div className="flex justify-between mb-4">
                    <h2 className="text-primary text-lg font-extrabold">Popular Lotteries</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filterLotteries(popular).map((lottery) => (
                      <LotteryListItem key={lottery.id} lottery={lottery} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LotteryCard({ lottery }: { lottery: Lottery }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const draw = new Date(lottery.draw_time).getTime();
      const diff = draw - now;

      if (diff <= 0) {
        setTimeLeft("Drawn");
        clearInterval(timer);
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lottery.draw_time]);

  return (
    <div className="bg-layer4 rounded-xl overflow-hidden border border-white/5 hover:border-brand/50 transition-all flex flex-col">
      <div 
        className="aspect-[2/1] relative p-4 flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(https://bc.game/modules/lottery2/assets/bg-1_w-XjNVjf3I.png)` }}
      >
        <div className="text-xl font-extrabold text-primary drop-shadow-md">{lottery.title}</div>
        <div className="mt-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-1 text-lg font-bold text-brand">
          ₩{lottery.prize_pool.toLocaleString()}
        </div>
      </div>
      <div className="p-4 space-y-3 bg-layer3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-secondary">Next Draw in</span>
          <span className="text-primary font-bold">{timeLeft}</span>
        </div>
        <button className="w-full py-2 bg-brand hover:bg-brand/90 text-white font-extrabold rounded-lg transition-colors">
          Bet Now
        </button>
      </div>
    </div>
  );
}

function LotteryListItem({ lottery }: { lottery: Lottery }) {
  return (
    <div className="bg-layer4 rounded-xl p-3 border border-white/5 hover:border-brand/30 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
         {lottery.is_exclusive && (
           <span className="bg-brand/20 text-brand text-[10px] px-2 py-0.5 rounded font-bold uppercase">Exclusive</span>
         )}
         <img src="https://bc.game/substation/bc/lottery/lottery/logo.png" className="w-5 h-5 opacity-50" alt="logo" />
      </div>
      <div className="text-sm font-extrabold text-primary line-clamp-1 group-hover:text-brand transition-colors">{lottery.title}</div>
      <div className="text-[10px] text-secondary mt-1">Top Prize</div>
      <div className="text-sm font-bold text-brand italic">₩{lottery.prize_pool.toLocaleString()}</div>
      <button className="w-full mt-3 py-1.5 bg-white/5 group-hover:bg-brand/10 text-xs font-bold text-primary rounded transition-all">
        Bet Now
      </button>
    </div>
  );
}

