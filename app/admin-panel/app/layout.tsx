import type { Metadata } from "next";
import Script from "next/script";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "샘플1 Admin",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Using link tags for legacy CSS to avoid bundling errors with missing internal assets */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/assets/css/vendor.min.css" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/assets/css/app.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="/assets/plugins/gritter/css/jquery.gritter.css"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="/assets/plugins/flatpickr/flatpickr.min.css"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="/assets/plugins/select2/dist/css/select2.min.css"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/assets/css/common.css" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {children}

        <Script id="pace-config" strategy="beforeInteractive">
          {`window.paceOptions = { 
            ajax: false, 
            document: true, 
            eventLag: false,
            elements: {
              selectors: ['#app']
            }
          };`}
        </Script>
        <Script id="sidebar-var">{`var sidebar_open = false;`}</Script>
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/assets/js/vendor.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/app.min.js" strategy="beforeInteractive" />
        <Script
          src="/assets/plugins/gritter/js/jquery.gritter.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/plugins/jquery-animateNumber/jquery.animateNumber.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/plugins/flatpickr/flatpickr.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/plugins/flatpickr/ko.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/plugins/socket.io/socket.io.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/plugins/select2/dist/js/select2.min.js"
          strategy="afterInteractive"
        />
  <Script src="/assets/js/common.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
