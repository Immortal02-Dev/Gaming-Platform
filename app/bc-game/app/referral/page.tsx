"use client";

import { useState } from "react";
import { useReferral } from "@/lib/useReferral";

export default function ReferralPage() {
  const { stats, activities, loading } = useReferral();
  const [activeTab, setActiveTab] = useState("activities");

  const referralLink = stats?.referral_link || "https://bc.game/i-guest-n/";
  const referralCode = stats?.referral_code || "GUEST";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="flex flex-col gap-4 bg-layer2 p-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex flex-col gap-6 rounded-xl bg-layer4 px-6 py-8 md:w-2/3 border border-white/5">
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-primary">Invite a Friend to Get</h1>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-brand">₩1,429,608</span>
                <span className="text-sm text-secondary font-semibold">Referral Rewards</span>
              </div>
              <div className="hidden sm:block h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-brand">25%</span>
                <span className="text-sm text-secondary font-semibold">Commission Rewards</span>
              </div>
            </div>
          </div>

          <p className="text-secondary leading-relaxed max-w-2xl">
            Get ₩1,429,608 for each friend you invite, plus up to 25% commission
            on their wagers. Enjoy consistent commission, whether they win or
            lose, in our Casino and Sportsbook. Start earning now!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-bold text-secondary">Referral Link</p>
              <div className="flex items-center justify-between rounded-xl bg-layer3 border border-white/5 p-1 pl-4">
                <p className="truncate text-sm text-primary font-medium">{referralLink}</p>
                <button
                  onClick={() => copyToClipboard(referralLink)}
                  className="px-4 py-2 rounded-lg bg-layer5 hover:bg-layer6 text-xs font-bold text-primary transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-secondary">Referral Code</p>
              <div className="flex items-center justify-between rounded-xl bg-layer3 border border-white/5 p-1 pl-4">
                <p className="text-sm text-primary font-medium uppercase tracking-wider">{referralCode}</p>
                <button
                  onClick={() => copyToClipboard(referralCode)}
                  className="px-4 py-2 rounded-lg bg-layer5 hover:bg-layer6 text-xs font-bold text-primary transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <span className="text-sm font-bold text-secondary">Share via socials</span>
            <div className="flex flex-wrap gap-3">
              {["share_3", "share_8", "share_7", "share_11", "share_12", "share_13", "share_14", "share_16", "share_17"].map((icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg overflow-hidden hover:scale-110 transition-transform">
                   <img className="w-full h-full object-contain" src={`https://bc.game/assets/shareicon/${icon}.png`} alt="social" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-1/3">
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-layer4 p-6 border border-white/5">
            <div className="flex flex-col items-center gap-2 border-r border-white/10 pr-4">
              <img className="w-10 h-10 mb-1" src="https://bc.game/substation/bc/bonus/affiliate/trophy.png" alt="trophy" />
              <p className="text-xs font-bold text-secondary text-center uppercase tracking-tight">Total Reward</p>
              <p className="text-xl font-black text-primary">₩{(stats?.total_reward || 0).toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-center gap-2 pl-4">
              <img className="w-10 h-10 mb-1" src="https://bc.game/substation/bc/bonus/affiliate/usehead.png" alt="friends" />
              <p className="text-xs font-bold text-secondary text-center uppercase tracking-tight">Total Friends</p>
              <p className="text-xl font-black text-primary">{stats?.total_friends || 0}</p>
            </div>
          </div>

          <div className="flex-1 rounded-xl bg-layer4 p-6 border border-white/5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                 <svg className="w-5 h-5 fill-brand" viewBox="0 0 32 32"><path d="M20.8689 22.0015C20.7094 22.1267 20.547 22.2543 20.3783 22.3684C18.5385 23.6131 16.3071 24.0501 14.1309 23.5019C13.0236 23.2229 12.0204 22.7185 11.1213 21.9889C11.1188 21.9869 11.1156 21.9859 11.1124 21.9861C11.1092 21.9862 11.1061 21.9876 11.1039 21.9899L8.82562 24.2681C8.81241 24.2813 8.80967 24.2965 8.8174 24.3136C9.30322 25.3761 8.95179 26.5773 7.99853 27.2105C6.80358 28.0048 5.14118 27.5296 4.57899 26.1679C4.10526 25.0193 4.62056 23.6692 5.77394 23.164C6.40945 22.8856 7.04818 22.8914 7.69012 23.1814C7.70592 23.1889 7.72009 23.1863 7.73266 23.1737L10.0032 20.9027C10.0073 20.8987 10.0098 20.8932 10.0102 20.8875C10.0105 20.8818 10.0087 20.8762 10.0051 20.8718C8.64193 19.1963 8.04735 17.0607 8.34464 14.9154C8.50416 13.7617 8.92552 12.6737 9.60872 11.6515C9.66254 11.5706 9.7929 11.3956 9.99979 11.1265C10.0101 11.113 10.0093 11.1003 9.99737 11.0883L7.7375 8.82846C7.72235 8.81331 7.70495 8.81009 7.68529 8.81879C7.06235 9.09239 6.45521 9.10947 5.86386 8.87003C5.28314 8.63446 4.86226 8.22905 4.60123 7.65381C4.05934 6.45982 4.6573 5.02655 5.87497 4.56008C6.46053 4.33578 7.04334 4.34351 7.62342 4.58328C8.83336 5.08263 9.37137 6.51058 8.81402 7.69103C8.81159 7.69638 8.81085 7.70234 8.81188 7.70812C8.81292 7.71391 8.81569 7.71924 8.81982 7.72342L11.0903 9.99393C11.1029 10.0065 11.1161 10.0073 11.13 9.99634C14.0018 7.69828 18.0029 7.68184 20.8733 9.99731C20.8865 10.0079 20.8991 10.0073 20.911 9.99538L23.1825 7.7239C23.1864 7.71993 23.189 7.7148 23.19 7.70919C23.1909 7.70357 23.1902 7.69775 23.1878 7.69248C22.9716 7.22649 22.911 6.75485 23.006 6.27758C23.3618 4.48708 25.5356 3.77987 26.8713 5.0309C28.1266 6.20652 27.6901 8.32186 26.0688 8.8971C25.4749 9.10754 24.8908 9.08047 24.3165 8.81589C24.2988 8.80783 24.2832 8.81057 24.2696 8.82411L21.9982 11.0961C21.9953 11.0988 21.9937 11.1026 21.9935 11.1066C21.9933 11.1107 21.9946 11.1146 21.9972 11.1178C23.2598 12.7121 23.8333 14.5108 23.7176 16.514C23.6257 18.1005 22.9997 19.628 22.0011 20.8694C21.9968 20.8746 21.9946 20.8813 21.995 20.8881C21.9953 20.8949 21.9982 20.9013 22.003 20.9061L24.2653 23.1689C24.2791 23.1824 24.2948 23.1856 24.3122 23.1785C24.3682 23.1553 24.424 23.1333 24.4794 23.1123C25.5719 22.6961 26.7722 23.1694 27.3218 24.1845C27.9995 25.435 27.389 27.0283 26.0074 27.4813C24.0864 28.1116 22.3278 26.1471 23.1878 24.3044C23.1933 24.2931 23.1915 24.2828 23.1825 24.2734L20.9134 22.0039C20.8992 21.99 20.8844 21.9892 20.8689 22.0015ZM18.3185 12.9045C18.3185 12.2898 18.0744 11.7004 17.6398 11.2658C17.2052 10.8312 16.6158 10.5871 16.0011 10.5871C15.3865 10.5871 14.7971 10.8312 14.3625 11.2658C13.9279 11.7004 13.6837 12.2898 13.6837 12.9045C13.6837 13.5191 13.9279 14.1085 14.3625 14.5431C14.7971 14.9777 15.3865 15.2219 16.0011 15.2219C16.6158 15.2219 17.2052 14.9777 17.6398 14.5431C18.0744 14.1085 18.3185 13.5191 18.3185 12.9045ZM16.0355 16.0011C14.405 15.9692 12.964 17.2932 12.9147 18.9406C12.9047 19.2671 12.9021 19.6096 12.9069 19.9683C12.9111 20.2944 13.0421 20.5324 13.2999 20.6823C14.971 21.6539 17.0491 21.6549 18.7164 20.6741C18.862 20.5887 18.9697 20.4625 19.0393 20.2956C19.0786 20.2008 19.0975 20.0489 19.0958 19.8397C19.0939 19.59 19.0912 19.3368 19.0876 19.0803C19.0757 18.2266 18.7803 17.5073 18.2016 16.9224C17.6102 16.325 16.8882 16.0178 16.0355 16.0011Z"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider">Referral Reward</p>
                <p className="text-xl font-black text-primary">₩{(stats?.referral_reward || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                 <svg className="w-5 h-5 fill-secondary" viewBox="0 0 32 32"><path d="M18.2873 4H18.7041C21.0488 4.0839 23.1616 5.2733 24.4515 7.204C26.49 10.2554 25.9253 14.3658 23.156 16.7432C22.2272 17.5404 21.1738 18.0653 19.9958 18.318C15.4148 19.3008 11.1827 15.6773 11.3173 11.0322C11.3851 8.68338 12.5634 6.55168 14.4978 5.2272C15.6147 4.46285 16.8779 4.05378 18.2873 4ZM20.6531 7.85617C20.7233 7.68936 20.7242 7.50152 20.6559 7.33398C20.5875 7.16644 20.4554 7.03292 20.2886 6.96279L20.2733 6.95636C20.1064 6.88624 19.9186 6.88526 19.7511 6.95363C19.5835 7.022 19.45 7.15413 19.3799 7.32094L16.3429 14.5457C16.2727 14.7125 16.2718 14.9004 16.3401 15.0679C16.4085 15.2354 16.5406 15.369 16.7074 15.4391L16.7227 15.4455C16.8896 15.5156 17.0774 15.5166 17.2449 15.4483C17.4125 15.3799 17.546 15.2478 17.6161 15.0809L20.6531 7.85617ZM17.2888 9.25595C17.2888 9.0212 17.1955 8.79606 17.0295 8.63006C16.8635 8.46407 16.6384 8.37081 16.4036 8.37081C16.1689 8.37081 15.9437 8.46407 15.7778 8.63006C15.6118 8.79606 15.5185 9.0212 15.5185 9.25595C15.5185 9.4907 15.6118 9.71584 15.7778 9.88183C15.9437 10.0478 16.1689 10.1411 16.4036 10.1411C16.6384 10.1411 16.8635 10.0478 17.0295 9.88183C17.1955 9.71584 17.2888 9.4907 17.2888 9.25595ZM21.3784 13.3008C21.3784 13.0662 21.2852 12.8412 21.1193 12.6753C20.9533 12.5094 20.7283 12.4162 20.4937 12.4162C20.2591 12.4162 20.034 12.5094 19.8681 12.6753C19.7022 12.8412 19.609 13.0662 19.609 13.3008C19.609 13.5355 19.7022 13.7605 19.8681 13.9264C20.034 14.0923 20.2591 14.1855 20.4937 14.1855C20.7283 14.1855 20.9533 14.0923 21.1193 13.9264C21.2852 13.7605 21.3784 13.5355 21.3784 13.3008Z"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider">Commission Reward</p>
                <p className="text-xl font-black text-primary">₩{(stats?.commission_reward || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-layer4 px-6 py-8 border border-white/5 mt-4">
        <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-extrabold text-primary">Reward Activities</h2>
           <div className="flex bg-layer3 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab("activities")}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === "activities" ? "bg-layer5 text-primary" : "text-secondary hover:text-primary"}`}
              >
                Recent
              </button>
              <button 
                onClick={() => setActiveTab("top")}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === "top" ? "bg-layer5 text-primary" : "text-secondary hover:text-primary"}`}
              >
                Top Earners
              </button>
           </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-secondary">Loading activities...</div>
        ) : activities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-secondary border-b border-white/5">
                  <th className="pb-4">Username</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Reward</th>
                  <th className="pb-4">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {activities.map((act) => (
                  <tr key={act.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-primary">{act.username}</td>
                    <td className="py-4 text-secondary capitalize">{act.type}</td>
                    <td className="py-4 text-brand font-bold">{act.currency} {act.reward_amount.toLocaleString()}</td>
                    <td className="py-4 text-secondary">{new Date(act.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <img className="w-32 h-32 mx-auto opacity-30" src="https://bc.game/substation/bc/common/empty_w.png" alt="Empty" />
            <p className="text-secondary mt-4 font-medium">No info yet. Invite friends to join you now!</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-layer4 p-6 md:flex-row md:items-center md:gap-10 border border-white/5 mt-4">
        <div className="flex flex-none flex-col gap-2 sm:w-96">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <p className="font-extrabold text-primary">Live Rewards</p>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-layer5 p-4 border border-white/5">
            <p className="text-sm text-secondary font-semibold">Total Sent To-Date</p>
            <div className="text-xl font-black text-brand">₩36,041,309K</div>
          </div>
        </div>
        <div className="flex-1 h-12 overflow-hidden relative">
          <div className="animate-scroll-y flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-1 text-sm">
                <span className="text-secondary font-medium">User_{Math.random().toString(36).substr(2, 6)}</span>
                <span className="text-brand font-bold">+₩{(Math.random() * 1000).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

