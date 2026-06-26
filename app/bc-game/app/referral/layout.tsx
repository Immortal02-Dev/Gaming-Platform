import ReferralNavtab from "@/components/modules/referral/ReferralNavtab";

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <h2 className="pb-4 text-lg font-extrabold leading-8">Referral</h2>
      <ReferralNavtab />
      <div className="tabs-content mb-4 mt-4! flex-1 bg-transparent">
        {children}
      </div>
    </div>
  );
}
