"use client";

import { useSponsorships } from "@/lib/useSponsorship";
import Link from "next/link";

export default function SponsorshipPage() {
  const { sponsorships, loading } = useSponsorships();

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="min-h-screen py-10">
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-black text-primary mb-4 tracking-tight">SPONSORSHIPS</h1>
          <p className="text-lg text-secondary font-medium max-w-2xl mx-auto">
            BC.GAME is proud to partner with world-class athletes and organizations 
            who share our commitment to innovation and excellence.
          </p>
        </section>

        {loading ? (
          <div className="text-center py-20 text-secondary">Loading partnerships...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorships.map((sponsor) => (
              <Link 
                key={sponsor.id} 
                href={`/sponsorship/${sponsor.slug}`}
                className="group relative bg-layer4 rounded-3xl overflow-hidden border border-white/5 hover:border-brand/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand/10 flex flex-col"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src={sponsor.banner_url || "https://bc.game/modules/static2/assets/bg-light-CDLFKXt8.png"} 
                    alt={sponsor.partner_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-layer4 via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 p-2 backdrop-blur-sm border border-white/10 group-hover:bg-brand/10 group-hover:border-brand/30 transition-colors">
                       <img src={sponsor.logo_url} alt="logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-primary group-hover:text-brand transition-colors">{sponsor.partner_name}</h2>
                      <p className="text-xs font-bold text-secondary uppercase tracking-widest">{sponsor.title}</p>
                    </div>
                  </div>
                  
                  <p className="text-secondary text-sm leading-relaxed line-clamp-3 font-medium">
                    {sponsor.description}
                  </p>
                  
                  <div className="pt-4 mt-auto">
                    <span className="inline-flex items-center gap-2 text-brand font-black text-sm uppercase tracking-wider">
                      Read More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
