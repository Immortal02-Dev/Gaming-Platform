"use client";

import { useSponsorship } from "@/lib/useSponsorship";
import { useParams } from "next/navigation";

export default function SponsorshipDetailPage() {
  const { slug } = useParams();
  const { sponsorship, loading } = useSponsorship(slug as string);

  if (loading) {
    return (
      <div className="page-content center py-40">
        <div className="text-secondary animate-pulse font-black text-2xl tracking-widest uppercase">Loading Partner...</div>
      </div>
    );
  }

  if (!sponsorship) {
    return (
      <div className="page-content center py-40 flex flex-col gap-6">
        <h1 className="text-4xl font-black text-primary">Partner Not Found</h1>
        <a href="/sponsorship" className="text-brand font-bold underline">Back to Sponsorships</a>
      </div>
    );
  }

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="py-6 sm:py-12 space-y-12">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-layer4 border border-white/5">
          <div className="aspect-[21/9] w-full relative">
            <img 
              src={sponsorship.banner_url || "https://bc.game/modules/static2/assets/bg-light-CDLFKXt8.png"} 
              alt="banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 space-y-4">
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
                   <img src={sponsorship.logo_url} alt="logo" className="w-full h-full object-contain" />
                </div>
                <div>
                   <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">{sponsorship.partner_name}</h1>
                   <p className="text-brand font-black uppercase tracking-widest text-sm sm:text-lg">{sponsorship.title}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-invert max-w-none">
                 <h2 className="text-3xl font-black text-primary mb-6">About the Partnership</h2>
                 <p className="text-secondary text-lg leading-relaxed font-medium">
                    {sponsorship.description}
                 </p>
                 <div className="mt-8 text-secondary/80 leading-relaxed font-medium space-y-6"
                      dangerouslySetInnerHTML={{ __html: sponsorship.content || "" }} 
                 />
              </div>

              {/* Videos Placeholder - In a real app these would be in the DB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                 {[1, 2].map(i => (
                    <div key={i} className="aspect-video bg-layer5 rounded-2xl border border-white/5 flex items-center justify-center group cursor-pointer hover:border-brand/50 transition-all">
                       <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 fill-brand ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-layer4 rounded-2xl p-8 border border-white/5 sticky top-24">
                 <h3 className="text-xl font-black text-primary mb-6 uppercase tracking-wider">Social Media</h3>
                 <div className="flex flex-wrap gap-4">
                    {["share_3", "share_8", "share_7", "share_11"].map((icon, i) => (
                      <button key={i} className="w-12 h-12 rounded-xl bg-layer5 flex items-center justify-center hover:bg-brand/10 hover:scale-110 transition-all group">
                         <img className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all" src={`https://bc.game/assets/shareicon/${icon}.png`} alt="social" />
                      </button>
                    ))}
                 </div>
                 
                 <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
                    <p className="text-sm font-bold text-secondary uppercase tracking-widest">Official Website</p>
                    <a href="#" className="inline-flex items-center gap-2 text-brand font-black group">
                       VISIT WEBSITE
                       <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round"/>
                       </svg>
                    </a>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
