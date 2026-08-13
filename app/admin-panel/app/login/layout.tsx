import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Admin Login | 샘플1 Admin",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Page loader - hidden immediately on login page; app.min.js may be slow on first cold start */}
      <div id="loader" className="app-loader" style={{ display: "none" }}>
        <span className="spinner"></span>
      </div>
      
      {children}

      <Script src="/assets/js/vendor.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/app.min.js" strategy="afterInteractive" />
    </>
  );
}

