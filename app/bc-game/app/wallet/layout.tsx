import WalletSidebar from "@/components/modules/wallet/WalletSidebar";

export default function WalletLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="page-main flex flex-wrap gap-x-4">
        <div
          className="sticky text-lg w-full font-extrabold leading-8 pb-4"
          style={{ ["--offsetTop" as any]: "72px" } as React.CSSProperties}
        >
          WALLET
        </div>

        <WalletSidebar />

        <div className="page-container w-96 min-h-96 flex-1 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
